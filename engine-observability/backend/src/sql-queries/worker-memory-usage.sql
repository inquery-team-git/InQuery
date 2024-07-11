SELECT
    (
        (heap_memory_available - free_memory_bytes) * 100.0 / heap_memory_available
    ) AS mem_usage
from
    worker_metrics
where
    worker_id = 'trino-coordinator-587c77cd9d-mb9fh'
    AND insert_time = (
        SELECT
            MAX(insert_time)
        FROM
            worker_metrics
    );