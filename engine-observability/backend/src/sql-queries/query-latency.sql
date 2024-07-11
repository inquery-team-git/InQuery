SELECT
    query_id,
    wall_time_millis AS latency,
    createtime AS start_time
FROM
    trino_queries tq
    JOIN query_metrics qm ON tq.query_id = qm.queryid
WHERE
    qm.cluster = $1
    AND createtime BETWEEN $2 AND $3
ORDER BY
    createtime ASC;