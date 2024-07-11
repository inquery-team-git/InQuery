SELECT
    id,
    cluster,
    used_cpu,
    total_cpu,
    used_memory,
    total_memory,
    worker_count,
    timestamp,
    uptime
FROM cluster_metrics
WHERE
    cluster = $3
    AND timestamp BETWEEN $1 AND $2
ORDER BY timestamp DESC;