WITH
    LatestWorkerMetrics AS (
        SELECT
            cluster,
            worker_id,
            system_uptime,
            system_cpu_load,
            (
                (heap_memory_available - free_memory_bytes) * 100.0 / heap_memory_available
            ) AS mem_usage,
            insert_time
        FROM
            worker_metrics
        WHERE
            cluster = $1
            AND insert_time = (
                SELECT
                    MAX(insert_time)
                FROM
                    worker_metrics
                WHERE
                    cluster = $1
            )
    ),
    RankedMemoryUsage AS (
        SELECT
            query_id,
            used_memory,
            worker_id,
            ROW_NUMBER() OVER (
                PARTITION BY
                    worker_id
                ORDER BY
                    used_memory DESC
            ) AS rn
        FROM
            query_worker_memory
        WHERE
            inserted_at = (
                SELECT
                    MAX(inserted_at)
                FROM
                    query_worker_memory
            )
    ),
    MaxMemoryUsage AS (
        SELECT
            query_id,
            used_memory,
            worker_id
        FROM
            RankedMemoryUsage
        WHERE
            rn = 1
    )
SELECT
    L.cluster,
    L.worker_id,
    L.system_cpu_load,
    L.mem_usage,
    L.system_uptime,
    M.query_id
FROM
    LatestWorkerMetrics AS L
    LEFT JOIN MaxMemoryUsage AS M ON L.worker_id = M.worker_id
ORDER BY
    $2 $3
LIMIT 5;
