SELECT
  cluster AS cluster_id,
  bucket,
  SUM(total_queries) AS total_queries,
  SUM(failed_queries) AS failed_queries,
  (SUM(failed_queries) / SUM(total_queries)) * 100 AS failure_rate,
  MIN(createtime) AS start_time,
  MAX(createtime) AS end_time
FROM (
  SELECT
    cluster,
    COUNT(*) AS total_queries,
    SUM(CASE WHEN query_state = 'FAILED' THEN 1 ELSE 0 END) AS failed_queries,
    createtime,
    NTILE($4) OVER (PARTITION BY cluster ORDER BY createtime) AS bucket
  FROM
    trino_queries tq
    JOIN query_metrics qm ON tq.query_id = qm.queryid
  WHERE
    qm.cluster = $1
    AND createtime BETWEEN $2 AND $3
  GROUP BY
    cluster, createtime
) AS time_buckets
GROUP BY
  cluster_id, bucket
ORDER BY
  bucket;
