SELECT
    sessionuser,
    SUM(totalcputime) AS total_cpu_time_sum,
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
    total_cpu_time_sum DESC
LIMIT 14;