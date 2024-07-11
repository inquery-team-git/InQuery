SELECT
    sessionuser,
    COUNT(*) AS sessionuser_count
FROM
    query_metrics
WHERE 
    cluster = $3
    AND createtime >= $1
    AND createtime <= $2
GROUP BY
    sessionuser
ORDER BY
    sessionuser_count DESC
LIMIT 7;