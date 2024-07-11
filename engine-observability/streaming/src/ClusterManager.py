import pandas as pd
import asyncio
import nest_asyncio
import pytz
import time
import os
import multiprocessing
import psycopg2
import json
import redis.asyncio as aioredis
import mysql.connector as connector
from datetime import datetime
from database import Database
from trino import TrinoCluster
from logger import setup_logger

utc_timezone = pytz.timezone("UTC")


class ClusterManager:
    def __init__(self):
        self.current_tasks = {}
        self.redis_client = aioredis.Redis(
            host=os.environ["REDIS_HOST"], port=os.environ["REDIS_PORT"], db=0
        )
        self.loop = asyncio.get_event_loop()
        nest_asyncio.apply()

    async def start(self):
        await self.test_redis_connection()
        pubsub = self.redis_client.pubsub()
        channels = ['cluster_create', 'cluster_update', 'cluster_delete']
        await pubsub.subscribe(*channels)
        asyncio.create_task(self.listen_for_updates(pubsub))

        # Initial load of clusters
        await self.update_clusters()

    async def stop(self):
        # Cancel all running tasks
        tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
        [task.cancel() for task in tasks]
        await asyncio.gather(*tasks, return_exceptions=True)
        await self.redis_client.close()
        self.loop.stop()

    async def test_redis_connection(self):
        response = await self.redis_client.ping()
        print("Redis connection successful:", response)

    async def listen_for_updates(self, pubsub):
        async for message in pubsub.listen():
            if message["type"] == "message":
                event_type = message["channel"].decode("utf-8")
                data_string = message["data"].decode("utf-8")
                data_dict = json.loads(data_string)
                data = data_dict['data']
                pattern = data_dict["pattern"]
                print(f"Received {event_type} {pattern} message: {data}")
                await self.update_clusters(pattern, data)

    async def update_clusters(self, event_type=None, data=None):
        db_conn = Database()
        clusters = db_conn.get_clusters()
        new_tasks = [(cluster, "task_seeding") for cluster in clusters] + [
            (cluster, "cluster_seeding") for cluster in clusters
        ]

        new_task_keys = set(new_tasks)
        current_task_keys = set(self.current_tasks.keys())

        # Stop tasks for removed clusters or updated clusters
        to_stop = current_task_keys - new_task_keys
        for key in to_stop:
            self.current_tasks[key].terminate()
            self.current_tasks[key].join()
            del self.current_tasks[key]

        # Start tasks for new clusters or updated clusters
        to_start = new_task_keys - current_task_keys
        print("to_start >>>>>>>>>>", to_start)
        for key in to_start:
            cluster_id, task_type = key
            cluster = next((c for c in clusters if c[0] == cluster_id[0]), None)
            if cluster is None:
                print(f"Cluster with id {cluster_id[0]} not found.")
                continue
            print("Starting process for", cluster)
            process = multiprocessing.Process(
                target=self.cluster_seeding, args=(cluster, task_type)
            )
            self.current_tasks[key] = process
            process.start()

    def cluster_seeding(self, cluster, worker_type):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        if worker_type == "task_seeding":
            loop.run_until_complete(self.run_cluster_task_seeding(cluster))
        elif worker_type == "cluster_seeding":
            loop.run_until_complete(self.run_cluster_metrics_seeding(cluster))
        loop.close()

    async def start_cluster_task_seeding(self, cluster):
        log = setup_logger(cluster_id=cluster[0])
        try:
            loop = asyncio.get_event_loop()
            async with TrinoCluster(cluster[3], cluster[4]) as trino:
                while True:
                    try:
                        all_stages = {}
                        start_time = time.time()
                        print("Fetching all stages....\n")
                        if loop.is_running():
                            # Schedule the coroutine to be run and wait for its result
                            await trino.get_progs(all_stages)
                        else:
                            # Run the coroutine as usual (not typically needed in an interactive environment)
                            loop.run_until_complete(trino.get_progs(all_stages))
                        end_time = time.time()
                        print(f"Execution time: {end_time - start_time} seconds\n")
                        db_conn = Database()
                        if len(all_stages.values()) != 0:
                            combined_df = pd.concat(list(all_stages.values()))
                            combined_df.columns = [
                                "task_names",
                                "elapsed",
                                "queued",
                                "start",
                                "end_time",
                                "node",
                                "drivers",
                                "total_scheduled_time",
                                "total_cpu_time",
                                "total_blocked_time",
                                "processed_input_data_size",
                                "processed_input_positions",
                                "time_difference_seconds",
                                "total_time_stage",
                                "max_child_end",
                            ]
                            # Add all datetime columns here
                            datetime_columns = ["start", "end_time", "max_child_end"]

                            # Replace NaT with None in all datetime columns
                            for column in datetime_columns:
                                combined_df[column] = combined_df[column].astype(object)
                                combined_df[column] = combined_df[column].where(
                                    combined_df[column].notna(), None
                                )
                            current_timestamp = datetime.now(utc_timezone)
                            combined_df["inserted_at"] = current_timestamp

                            combined_df.fillna(0, inplace=True)
                            print("Inserting Task Performance Metrics data in DB....\n")
                            db_conn.upsert_task_performance_metrics(
                                [tuple(x) for x in combined_df.to_numpy()]
                            )

                        print("Sleeping....")
                        await asyncio.sleep(1)
                    except (connector.Error, psycopg2.Error) as err:
                        log.error(f"[Task_Seeding] Database Error: {err}\n")
                        # Re-establish the database connection on error
                        db_conn.reconnect()
                    except Exception as err:
                        log.error(f"[Task_Seeding] Something went wrong: {err}\n")
        except ConnectionError as err:
            log.error(f"[Task_Seeding] Connection Error: {err}")
        except ValueError as err:
            log.error(f"[Task_Seeding] Value Error: {err}")

    async def start_cluster_seeding(self, cluster):
        log = setup_logger(cluster_id=cluster[0])
        try:
            async with TrinoCluster(cluster[3], cluster[4]) as trino:
                while True:
                    try:
                        print(
                            f"Starting new batch for {trino.host}:{trino.port} >>>>>>>>>>>>>>>>>>>\n"
                        )
                        print("Fetching Workers List from Trino....\n")
                        worker_ids = await trino.get_workers()

                        current_timestamp = datetime.now(utc_timezone)
                        used_cpu, total_cpu, total_memory, used_memory = 0, 0, 0, 0
                        all_worker_values = []
                        all_query_mem = []
                        all_tasks = []

                        worker_tasks = []
                        for worker in worker_ids:
                            worker_tasks.append(
                                trino.get_and_process_worker_data(
                                    worker, current_timestamp
                                )
                            )

                        worker_results = await asyncio.gather(
                            *worker_tasks, return_exceptions=True
                        )
                        for result, worker in zip(worker_results, worker_ids):
                            if isinstance(result, Exception):
                                print(f"Error processing worker {worker}: {result}")
                                continue

                            values, query_mem, list_of_tasks, tasks_length = result
                            all_worker_values.append(
                                values + [worker, tasks_length, cluster[0]]
                            )
                            used_cpu += values[1] * values[2]
                            total_cpu += values[2]
                            total_memory += values[4]
                            used_memory += values[4] - values[5]
                            all_query_mem.extend(query_mem)
                            all_tasks.extend(list_of_tasks)

                        db_conn = Database()
                        print("Inserting Query Worker Memory data in DB....\n")
                        db_conn.insert_query_worker_memory(all_query_mem)

                        print("Inserting Query Task Memory data in DB....\n")
                        db_conn.insert_task_worker_memory(all_tasks)

                        print("Inserting Cluster Metrics data in DB....\n")
                        db_conn.insert_cluster_metrics(
                            [
                                used_cpu,
                                total_cpu,
                                used_memory,
                                total_memory,
                                len(worker_ids),
                                await trino.get_uptime(),
                                cluster[0],
                            ]
                        )

                        print("Fetching Queries data from Trino....\n")
                        cur_quers = await trino.get_queries()

                        print("Inserting Query Metrics data in DB....\n")
                        db_conn.insert_query_metrics(
                            [i + [current_timestamp, cluster[0]] for i in cur_quers]
                        )

                        print("Inserting Worker Metrics data in DB....\n")
                        db_conn.insert_worker_metrics(all_worker_values)

                        print("Sleeping....\n")
                        await asyncio.sleep(1)
                    except (connector.Error, psycopg2.Error) as err:
                        log.error(f"[Task_Seeding] Database Error: {err}\n")
                        # Re-establish the database connection on error
                        db_conn.reconnect()
                    except Exception as err:
                        log.error(f"[Cluster_Seeding] Something went wrong: {err}\n")
        except ConnectionError as err:
            log.error(f"[Cluster_Seeding] Connection Error: {err}")
        except ValueError as err:
            log.error(f"[Cluster_Seeding] Value Error: {err}")

    async def run_cluster_metrics_seeding(self, cluster):
        print("run_cluster_metrics_seeding", cluster[0])
        await self.start_cluster_seeding(cluster)

    async def run_cluster_task_seeding(self, cluster):
        print("run_cluster_task_seeding", cluster[0])
        await self.start_cluster_task_seeding(cluster)
