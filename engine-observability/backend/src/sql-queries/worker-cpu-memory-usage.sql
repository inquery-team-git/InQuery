SELECT
    (process_cpu_load * 100) AS cpu_usage,
    num_tasks,
    insert_time  as timestamp,
    (
        (heap_memory_available - free_memory_bytes) * 100.0 / heap_memory_available
    ) AS mem_usage
from
    worker_metrics
where
    worker_id = $1
    AND insert_time >= $2 AND insert_time <= $3;