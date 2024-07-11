import pandas as pd
import asyncio
import pytz
import time
import multiprocessing
import psycopg2
import mysql.connector as connector
from datetime import datetime
from database import Database
from trino import TrinoCluster
from logger import setup_logger

utc_timezone = pytz.timezone("UTC")


async def start_cluster_task_seeding(cluster):
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


async def start_cluster_seeding(cluster):
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
                            trino.get_and_process_worker_data(worker, current_timestamp)
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


def run_cluster_metrics_seeding(cluster):
    asyncio.run(start_cluster_seeding(cluster))


def run_cluster_task_seeding(cluster):
    asyncio.run(start_cluster_task_seeding(cluster))


def cluster_seeding(cluster, worker_type):
    if worker_type == "task_seeding":
        asyncio.run(run_cluster_task_seeding(cluster))
    elif worker_type == "cluster_seeding":
        asyncio.run(run_cluster_metrics_seeding(cluster))


async def main():
    try:
        db_conn = Database()
        clusters = db_conn.get_clusters()
        tasks = [(cluster, "task_seeding") for cluster in clusters] + [
            (cluster, "cluster_seeding") for cluster in clusters
        ]
        with multiprocessing.Pool(processes=len(tasks)) as pool:
            pool.starmap(cluster_seeding, tasks)
    except KeyboardInterrupt:
        print("Script interrupted by user.")


if __name__ == "__main__":
    asyncio.run(main())
