WITH filtered_query_metrics AS (
    SELECT
        queryId,
        sessionSource,
        sessionUser,
        cumulativeUserMemory,
        createtime,
        state,
        inserted_at
    FROM
        query_metrics
    WHERE
        cluster = $1
)
SELECT
    queryId,
    sessionSource,
    sessionUser,
    cumulativeUserMemory,
    createtime,
    state
FROM
    filtered_query_metrics
WHERE
    inserted_at = (
         SELECT
             MAX(inserted_at)
         FROM
             filtered_query_metrics
     )
    AND state != 'FINISHED'
    AND state != 'FAILED'
ORDER BY
    $2 $3
LIMIT
    5;
