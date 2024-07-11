SELECT
    error_type,
    COUNT(*) AS error_type_count
FROM (
  SELECT error_type
  FROM trino_queries tq
  INNER JOIN query_metrics qm ON tq.query_id = qm.queryid
  WHERE cluster = $1
    AND createtime >= $2
    AND createtime <= $3
    AND error_type IS NOT NULL
) AS filtered_errors
GROUP BY error_type
ORDER BY error_type_count DESC
LIMIT 10;