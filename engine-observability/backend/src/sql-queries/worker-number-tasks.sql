SELECT
    count(*)
from
    task_performance_metrics
where
    node = $1
    AND inserted_at = (
        SELECT
            MAX(inserted_at)
        FROM
            task_performance_metrics
    )
    AND (end_time IS NULL);