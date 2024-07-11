SELECT
    uptime
FROM
    cluster_metrics
WHERE
    cluster = $1
ORDER BY
    timestamp DESC
LIMIT
    1;