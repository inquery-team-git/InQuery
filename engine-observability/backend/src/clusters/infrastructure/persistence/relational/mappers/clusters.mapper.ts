import { Cluster } from '../../../../domain/clusters';
import { ClustersEntity } from '../entities/clusters.entity';

export class ClustersMapper {
  static toDomain(raw: ClustersEntity): Cluster {
    const cluster = new Cluster();
    cluster.id = raw.id;
    cluster.name = raw.name;
    cluster.client_id = raw.client_id;
    cluster.host = raw.host;
    cluster.port = raw.port;
    cluster.description = raw.description;
    cluster.enabled = raw.enabled;
    cluster.deleted = raw.deleted;
    cluster.timestamp = raw.timestamp;
    return cluster;
  }

  static toPersistence(cluster: Cluster): ClustersEntity {
    const clustersEntity = new ClustersEntity();
    if (cluster.id && typeof cluster.id === 'string') {
      clustersEntity.id = cluster.id;
    }
    clustersEntity.name = cluster.name;
    clustersEntity.client_id = cluster.client_id;
    clustersEntity.host = cluster.host;
    clustersEntity.port = cluster.port;
    clustersEntity.description = cluster.description;
    clustersEntity.enabled = cluster.enabled;
    clustersEntity.deleted = cluster.deleted;
    clustersEntity.timestamp = cluster.timestamp;
    return clustersEntity;
  }
}
