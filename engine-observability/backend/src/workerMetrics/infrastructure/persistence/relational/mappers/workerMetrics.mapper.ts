import { WorkerMetrics } from '../../../../domain/workerMetrics';
import { WorkerMetricsEntity } from '../entities/workerMetrics.entity';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';
import _ from 'lodash';

export class WorkerMetricsMapper {
  static toDomain(raw: WorkerMetricsEntity): WorkerMetrics {
    const workerMetrics = new WorkerMetrics();
    workerMetrics.id = raw.id;

    workerMetrics.cluster = _.pick(raw.cluster, [
      'client_id',
      'id',
      'host',
      'port',
      'name',
      'description',
      'enabled',
      'deleted',
      'timestamp',
    ]);

    workerMetrics.process_cpu_load = raw.process_cpu_load;
    workerMetrics.system_cpu_load = raw.system_cpu_load;
    workerMetrics.processor_count = raw.processor_count;
    workerMetrics.heap_memory_used = raw.heap_memory_used;
    workerMetrics.heap_memory_available = raw.heap_memory_available;
    workerMetrics.free_memory_bytes = raw.free_memory_bytes;
    workerMetrics.system_uptime = raw.system_uptime;
    workerMetrics.worker_id = raw.worker_id;
    workerMetrics.insert_time = raw.insert_time;
    workerMetrics.num_tasks = raw.num_tasks;

    return workerMetrics;
  }

  static toPersistence(workerMetrics: WorkerMetrics): WorkerMetricsEntity {
    const workerMetricsEntity = new WorkerMetricsEntity();

    workerMetricsEntity.id = workerMetrics.id;

    const cluster = new ClustersEntity();
    cluster.id = workerMetrics.cluster.id;
    workerMetricsEntity.cluster = cluster;

    workerMetricsEntity.process_cpu_load = workerMetrics.process_cpu_load;
    workerMetricsEntity.system_cpu_load = workerMetrics.system_cpu_load;
    workerMetricsEntity.processor_count = workerMetrics.processor_count;
    workerMetricsEntity.heap_memory_used = workerMetrics.heap_memory_used;
    workerMetricsEntity.heap_memory_available =
      workerMetrics.heap_memory_available;
    workerMetricsEntity.free_memory_bytes = workerMetrics.free_memory_bytes;
    workerMetricsEntity.system_uptime = workerMetrics.system_uptime;
    workerMetricsEntity.worker_id = workerMetrics.worker_id;
    workerMetricsEntity.insert_time = workerMetrics.insert_time;
    workerMetricsEntity.num_tasks = workerMetrics.num_tasks;
    return workerMetricsEntity;
  }
}
