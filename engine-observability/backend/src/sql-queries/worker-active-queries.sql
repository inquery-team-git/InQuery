SELECT
    qwm.query_id,
    qwm.used_memory,
    qm.createtime,
    qm.state,
    qm.sessionuser,
    qm.sessionsource
FROM
    query_worker_memory AS qwm
    INNER JOIN query_metrics AS qm ON qwm.query_id = qm.queryid
WHERE
    qwm.inserted_at = (
        SELECT
            MAX(inserted_at)
        FROM
            query_worker_memory
        WHERE
            worker_id = $1
    )
    AND qwm.worker_id = $1
ORDER BY
    $2 $3
LIMIT
    5