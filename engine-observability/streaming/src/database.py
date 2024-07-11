import os
import psycopg2
import psycopg2.extras
import mysql.connector as connector

print("[Cluster_Streaming] Database connecting....\n")
print("[Cluster_Streaming] Client ID..." + os.environ["APP_CLIENT_ID"])
print("[Cluster_Streaming] Database Type..." + os.environ["DATABASE_TYPE"])
print("[Cluster_Streaming] Database Name..." + os.environ["DATABASE_NAME"])
print("[Cluster_Streaming] Database Host..." + os.environ["DATABASE_HOST"])
print("[Cluster_Streaming] Database Port..." + os.environ["DATABASE_PORT"])

db_type = os.environ["DATABASE_TYPE"]


class Database:
    def __init__(self):
        self.client_id = os.environ["APP_CLIENT_ID"]
        self.db_type = os.environ["DATABASE_TYPE"]
        self.database = os.environ["DATABASE_NAME"]
        self.user = os.environ["DATABASE_USERNAME"]
        self.password = os.environ["DATABASE_PASSWORD"]
        self.host = os.environ["DATABASE_HOST"]
        self.port = int(os.environ["DATABASE_PORT"])
        self.connection = None
        self.cursor = None
        self.setup_db_connection()

    async def __aenter__(self):
        return self

    async def __aexit__(self, *err):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

    def setup_db_connection(self):
        try:
            if self.db_type == "mysql":
                self.connection = connector.connect(
                    database=self.database,
                    user=self.user,
                    password=self.password,
                    host=self.host,
                    port=self.port,
                    autocommit=True,
                )
                if self.connection.is_connected():
                    print("Connected to MySQL Server successfully\n")
            else:
                self.connection = psycopg2.connect(
                    dbname=self.database,
                    user=self.user,
                    password=self.password,
                    host=self.host,
                    port=self.port,
                )
                print("Connected to PgSQL Server successfully\n")
            self.cursor = self.connection.cursor()
        except Exception as e:
            print(f"Unable to connect to the database: {e}")

    def reconnect(self):
        if self.connection:
            self.connection.close()
        self.setup_db_connection()

    def execute_query(self, query, params=None):
        try:
            self.cursor.execute(query, params)
        except (connector.Error, psycopg2.Error) as e:
            print(f"Database error occurred: {e}")
            self.reconnect()
            self.cursor.execute(query, params)

    def get_clusters(self):
        query = """
            SELECT *
            FROM clusters
            WHERE enabled = %s
            AND client_id = %s;
        """
        self.execute_query(query, (True, self.client_id))
        return self.cursor.fetchall()

    def insert_task_worker_memory(self, rows):
        insert_query = """
        INSERT INTO task_worker_memory (task, used_memory, worker_id, inserted_at)
        VALUES (%s, %s, %s, %s);
        """
        self.execute_batch(insert_query, rows)

    def insert_query_worker_memory(self, rows):
        insert_query = """
        INSERT INTO query_worker_memory (query_id, used_memory, worker_id, inserted_at)
        VALUES (%s, %s, %s, %s);
        """
        self.execute_batch(insert_query, rows)

    def insert_cluster_metrics(self, data):
        insert_query = """
        INSERT INTO cluster_metrics (used_cpu, total_cpu, used_memory, total_memory, worker_count, uptime, cluster)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
        self.execute_query(insert_query, data)

    def insert_query_metrics(self, rows):
        if self.db_type == "mysql":
            insert_query = """
                INSERT INTO query_metrics (queryId, createTime, totalCpuTime, cumulativeUserMemory, state, sessionUser, sessionSource, inserted_at, cluster)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                createTime = VALUES(createTime),
                totalCpuTime = VALUES(totalCpuTime),
                cumulativeUserMemory = VALUES(cumulativeUserMemory),
                state = VALUES(state),
                sessionUser = VALUES(sessionUser),
                sessionSource = VALUES(sessionSource),
                inserted_at = VALUES(inserted_at);
            """
        else:
            insert_query = """
                INSERT INTO query_metrics (queryId, createTime, totalCpuTime, cumulativeUserMemory, state, sessionUser, sessionSource, inserted_at, cluster)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (queryId) DO UPDATE SET
                createTime = EXCLUDED.createTime,
                totalCpuTime = EXCLUDED.totalCpuTime,
                cumulativeUserMemory = EXCLUDED.cumulativeUserMemory,
                state = EXCLUDED.state,
                sessionUser = EXCLUDED.sessionUser,
                sessionSource = EXCLUDED.sessionSource,
                inserted_at = EXCLUDED.inserted_at;
            """
        self.execute_batch(insert_query, rows)

    def insert_worker_metrics(self, rows):
        insert_query = """
        INSERT INTO worker_metrics (process_cpu_load, system_cpu_load, processor_count, heap_memory_used, heap_memory_available, free_memory_bytes, system_uptime, worker_id, num_tasks, cluster)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """
        self.execute_batch(insert_query, rows)

    def upsert_task_performance_metrics(self, rows):
        if self.db_type == "mysql":
            upsert_query = """
                INSERT INTO task_performance_metrics (
                    task_names, elapsed, queued, start, end_time, node, 
                    drivers, total_scheduled_time, total_cpu_time, total_blocked_time, 
                    processed_input_data_size, processed_input_positions, 
                    time_difference_seconds, total_time_stage, max_child_end, inserted_at
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    elapsed = VALUES(elapsed),
                    queued = VALUES(queued),
                    start = VALUES(start),
                    end_time = VALUES(end_time),
                    node = VALUES(node),
                    drivers = VALUES(drivers),
                    total_scheduled_time = VALUES(total_scheduled_time),
                    total_cpu_time = VALUES(total_cpu_time),
                    total_blocked_time = VALUES(total_blocked_time),
                    processed_input_data_size = VALUES(processed_input_data_size),
                    processed_input_positions = VALUES(processed_input_positions),
                    time_difference_seconds = VALUES(time_difference_seconds),
                    total_time_stage = VALUES(total_time_stage),
                    max_child_end = VALUES(max_child_end),
                    inserted_at = VALUES(inserted_at);
            """
        else:
            upsert_query = """
                INSERT INTO task_performance_metrics (
                    task_names, elapsed, queued, start, end_time, node, 
                    drivers, total_scheduled_time, total_cpu_time, total_blocked_time, 
                    processed_input_data_size, processed_input_positions, 
                    time_difference_seconds, total_time_stage, max_child_end, inserted_at
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (task_names) DO UPDATE SET
                    elapsed = EXCLUDED.elapsed,
                    queued = EXCLUDED.queued,
                    start = EXCLUDED.start,
                    end_time = EXCLUDED.end_time,
                    node = EXCLUDED.node,
                    drivers = EXCLUDED.drivers,
                    total_scheduled_time = EXCLUDED.total_scheduled_time,
                    total_cpu_time = EXCLUDED.total_cpu_time,
                    total_blocked_time = EXCLUDED.total_blocked_time,
                    processed_input_data_size = EXCLUDED.processed_input_data_size,
                    processed_input_positions = EXCLUDED.processed_input_positions,
                    time_difference_seconds = EXCLUDED.time_difference_seconds,
                    total_time_stage = EXCLUDED.total_time_stage,
                    max_child_end = EXCLUDED.max_child_end,
                    inserted_at = EXCLUDED.inserted_at;
            """
        self.execute_batch(upsert_query, rows)

    def execute_batch(self, query, data):
        try:
            if self.db_type == "mysql":
                self.cursor.executemany(query, data)
            else:
                psycopg2.extras.execute_batch(self.cursor, query, data)
            self.connection.commit()
        except (connector.Error, psycopg2.Error) as e:
            print(f"Batch execution error: {e}")
            self.reconnect()
            if self.db_type == "mysql":
                self.cursor.executemany(query, data)
            else:
                psycopg2.extras.execute_batch(self.cursor, query, data)
            self.connection.commit()

    def clear_cluster_metrics_table(self):
        print('Clearing cluster_metrics table...')
        delete_query = """
            DELETE FROM cluster_metrics
            WHERE timestamp < CURRENT_TIMESTAMP - INTERVAL 1 DAY
            LIMIT 100000;
        """
        self.execute_query(delete_query)
        self.connection.commit()

    def clear_worker_metrics_table(self):
        print('Clearing worker_metrics table...')
        delete_query = """
            DELETE FROM worker_metrics
            WHERE insert_time < CURRENT_TIMESTAMP - INTERVAL 1 DAY
            LIMIT 100000;
        """
        self.execute_query(delete_query)
        self.connection.commit()

    def clear_query_metrics_table(self):
        print('Clearing query_metrics table...')
        delete_query = """
            DELETE FROM query_metrics
            WHERE inserted_at < CURRENT_TIMESTAMP - INTERVAL 1 DAY
            LIMIT 100000;
        """
        self.execute_query(delete_query)
        self.connection.commit()

    def clear_query_worker_memory_table(self):
        print('Clearing query_worker_memory table...')
        delete_query = """
            DELETE FROM query_worker_memory
            WHERE inserted_at < CURRENT_TIMESTAMP - INTERVAL 1 DAY
            LIMIT 100000;
        """
        self.execute_query(delete_query)
        self.connection.commit()

    def clear_query_task_memory_table(self):
        print('Clearing task_worker_memory table...')
        delete_query = """
            DELETE FROM task_worker_memory
            WHERE inserted_at < CURRENT_TIMESTAMP - INTERVAL 1 DAY
            LIMIT 100000;
        """
        self.execute_query(delete_query)
        self.connection.commit()

    def clear_task_metrics_table(self):
        print('Clearing task_performance_metrics table...')
        delete_query = """
            DELETE FROM task_performance_metrics
            WHERE inserted_at < CURRENT_TIMESTAMP - INTERVAL 1 DAY
            LIMIT 100000;
        """
        self.execute_query(delete_query)
        self.connection.commit()
