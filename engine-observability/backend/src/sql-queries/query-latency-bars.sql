WITH query_stats AS (
    SELECT
        qm.cluster AS cluster_id,
        tq.wall_time_millis,
        COUNT(*) OVER (PARTITION BY qm.cluster) AS total_queries,
        AVG(tq.wall_time_millis) OVER (PARTITION BY qm.cluster) AS mean_latency,
        STDDEV(tq.wall_time_millis) OVER (PARTITION BY qm.cluster) AS std_deviation,
        MAX(tq.wall_time_millis) OVER (PARTITION BY qm.cluster) AS max_latency,
        MIN(tq.wall_time_millis) OVER (PARTITION BY qm.cluster) AS min_latency,
        ROW_NUMBER() OVER (PARTITION BY qm.cluster ORDER BY tq.wall_time_millis) AS row_num,
        COUNT(*) OVER (PARTITION BY qm.cluster) AS total_count
    FROM
        trino_queries tq
        JOIN query_metrics qm ON tq.query_id = qm.queryid
    WHERE
        qm.cluster = $1
        AND createtime BETWEEN $2 AND $3
),
percentiles AS (
    SELECT
        cluster_id,
        MAX(total_queries) AS total_queries,
        MAX(mean_latency) AS mean,
        MAX(std_deviation) AS std_deviation,
        MAX(max_latency) AS max,
        MAX(min_latency) AS min,
        MAX(CASE WHEN row_num = FLOOR(0.5 * total_count) + 1 THEN wall_time_millis END) AS median,
        MAX(CASE WHEN row_num = FLOOR(0.90 * total_count) + 1 THEN wall_time_millis END) AS p90,
        MAX(CASE WHEN row_num = FLOOR(0.95 * total_count) + 1 THEN wall_time_millis END) AS p95,
        MAX(CASE WHEN row_num = FLOOR(0.99 * total_count) + 1 THEN wall_time_millis END) AS p99
    FROM
        query_stats
    GROUP BY
        cluster_id
)
SELECT
    total_queries,
    mean,
    median,
    p90,
    p95,
    p99,
    max,
    min
FROM
    percentiles
ORDER BY
    cluster_id;
