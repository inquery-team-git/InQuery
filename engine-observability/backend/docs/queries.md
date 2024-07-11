## Cluster Overview

### Up time
```sql
SELECT uptime FROM cluster_metrics ORDER BY timestamp DESC LIMIT 1;
```

### Average workers
```sql
```

### Max Pod CPU
```sql
SELECT max(system_cpu_load) 
FROM worker_metrics
WHERE insert_time = (SELECT MAX(insert_time) FROM worker_metrics);
```

---

## Cluster Capacity

### CPU Utilization
```sql
```

### Memory Utilization
```sql
```

### Running Nodes
```sql
```

---

## Cluster Usage by User

### CPU Time Usage
```sql
SELECT sessionuser, SUM(totalcputime) AS total_cpu_time_sum
FROM query_metrics
GROUP BY sessionuser
ORDER BY total_cpu_time_sum DESC;
```

### Total Queries
```sql
SELECT sessionuser, COUNT(*) AS sessionuser_count
FROM query_metrics
GROUP BY sessionuser
ORDER BY sessionuser_count DESC;
```

### GB Scanned
```sql
```

---

## Most Active Queries Table
```sql
SELECT queryId, sessionSource, sessionUser, cumulativeUserMemory, createTime
FROM query_metrics
WHERE inserted_at = (SELECT MAX(inserted_at) FROM query_metrics)
AND state != 'FINISHED'
ORDER BY createTime ASC
LIMIT 5;
```

---

## Most Active Workers Table
```sql
WITH LatestWorkerMetrics AS (
    SELECT 
        worker_id, 
        system_cpu_load, 
        (free_memory_bytes::FLOAT / heap_memory_available) AS mem_usage,
        insert_time
    FROM 
        worker_metrics
    WHERE 
        insert_time = (SELECT MAX(insert_time) FROM worker_metrics)
),
RankedMemoryUsage AS (
    SELECT
        query_id,
        used_memory,
        worker_id,
        ROW_NUMBER() OVER(PARTITION BY worker_id ORDER BY used_memory DESC) AS rn
    FROM query_worker_memory
    WHERE inserted_at = (SELECT MAX(inserted_at) FROM query_worker_memory)
),
MaxMemoryUsage AS (
    SELECT
        query_id,
        used_memory,
        worker_id
    FROM RankedMemoryUsage
    WHERE rn = 1
)
SELECT
    L.worker_id, 
    L.system_cpu_load, 
    L.mem_usage,
    M.query_id
FROM LatestWorkerMetrics AS L
JOIN MaxMemoryUsage AS M ON L.worker_id = M.worker_id
ORDER BY 
    L.mem_usage DESC;
```