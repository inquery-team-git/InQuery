SELECT
  MAX(system_cpu_load) * 100 AS max
FROM
  worker_metrics
WHERE
  cluster = $1
  AND insert_time = (
    SELECT
      MAX(insert_time)
    FROM
      worker_metrics AS latest_metrics
    WHERE
      cluster = $1
  );