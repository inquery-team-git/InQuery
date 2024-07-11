import _ from 'lodash';
import { ClusterMetrics } from '../../../../domain/clusterMetrics';
import { ClusterMetricsEntity } from '../entities/clusterMetrics.entity';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';

export class ClusterMetricsMapper {
  static toDomain(raw: ClusterMetricsEntity): ClusterMetrics {
    const clusterMetrics = new ClusterMetrics();
    clusterMetrics.id = raw.id;

    clusterMetrics.cluster = _.pick(raw.cluster, [
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
    clusterMetrics.used_cpu = raw.used_cpu;
    clusterMetrics.total_cpu = raw.total_cpu;
    clusterMetrics.used_memory = raw.used_memory;
    clusterMetrics.total_memory = raw.total_memory;
    clusterMetrics.worker_count = raw.worker_count;
    clusterMetrics.uptime = raw.uptime;
    clusterMetrics.timestamp = raw.timestamp;
    return clusterMetrics;
  }

  static toPersistence(clusterMetrics: ClusterMetrics): ClusterMetricsEntity {
    const clusterMetricsEntity = new ClusterMetricsEntity();
    if (clusterMetrics.id && typeof clusterMetrics.id === 'number') {
      clusterMetricsEntity.id = clusterMetrics.id;
    }
    const cluster = new ClustersEntity();
    cluster.id = clusterMetrics.cluster.id;
    clusterMetricsEntity.cluster = cluster;

    clusterMetricsEntity.used_cpu = clusterMetrics.used_cpu;
    clusterMetricsEntity.total_cpu = clusterMetrics.total_cpu;
    clusterMetricsEntity.used_memory = clusterMetrics.used_memory;
    clusterMetricsEntity.total_memory = clusterMetrics.total_memory;
    clusterMetricsEntity.worker_count = clusterMetrics.worker_count;
    clusterMetricsEntity.uptime = clusterMetrics.uptime;
    clusterMetricsEntity.timestamp = clusterMetrics.timestamp;
    return clusterMetricsEntity;
  }
}
