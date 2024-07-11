WITH
    RecentTasks AS (
        SELECT
            task,
            used_memory,
            inserted_at
        FROM
            task_worker_memory
        WHERE
            inserted_at = (
                SELECT
                    MAX(inserted_at)
                FROM
                    task_worker_memory
                WHERE
                    worker_id = $1
            )
            AND worker_id = $1
        ORDER BY
            $2 $3
        LIMIT
            5
    ),
    TaskDetails AS (
        SELECT
            rt.task,
            rt.used_memory,
            tpm.start,
            tpm.total_cpu_time,
            tpm.drivers,
            tpm.processed_input_data_size
        FROM
            RecentTasks rt
            JOIN task_performance_metrics tpm ON rt.task = tpm.task_names
    )
SELECT
    *
FROM
    TaskDetails;