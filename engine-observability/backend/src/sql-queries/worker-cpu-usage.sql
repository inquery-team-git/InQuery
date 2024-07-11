SELECT
    process_cpu_load * 100
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