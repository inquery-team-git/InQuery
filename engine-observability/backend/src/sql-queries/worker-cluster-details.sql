SELECT clusters.*
FROM clusters
JOIN (
    SELECT cluster
    FROM worker_metrics
    WHERE worker_metrics.worker_id = $1
    ORDER BY insert_time DESC
    LIMIT 1
) AS first_worker_metric ON clusters.id = first_worker_metric.cluster;