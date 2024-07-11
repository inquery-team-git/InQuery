import _ from 'lodash';
import { ClusterWorkerMapping } from '../../../../domain/cluster-worker-mapping';
import { ClusterWorkerMappingEntity } from '../entities/cluster-worker-mapping.entity';
import { ClustersEntity } from '../entities/clusters.entity';

export class ClustersWorkerMappingMapper {
  static toDomain(raw: ClusterWorkerMappingEntity): ClusterWorkerMapping {
    const clusterWorker = new ClusterWorkerMapping();
    clusterWorker.id = raw.id;
    clusterWorker.cluster = _.pick(raw.cluster, [
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
    clusterWorker.worker = raw.worker;
    clusterWorker.timestamp = raw.timestamp;
    return clusterWorker;
  }

  static toPersistence(
    clusterWorker: ClusterWorkerMapping,
  ): ClusterWorkerMappingEntity {
    const clustersEntity = new ClusterWorkerMappingEntity();
    if (clusterWorker.id && typeof clusterWorker.id === 'number') {
      clustersEntity.id = clusterWorker.id;
    }

    const cluster = new ClustersEntity();
    cluster.id = clusterWorker.cluster.id;
    clustersEntity.cluster = cluster;
    clustersEntity.worker = clusterWorker.worker;
    clustersEntity.timestamp = clusterWorker.timestamp;
    return clustersEntity;
  }
}
