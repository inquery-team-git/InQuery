import _ from 'lodash';
import { QueryMetrics } from '../../../../domain/queryMetrics';
import { QueryMetricsEntity } from '../entities/queryMetrics.entity';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';

export class QueryMetricsMapper {
  static toDomain(raw: QueryMetricsEntity): QueryMetrics {
    const queryMetrics = new QueryMetrics();
    queryMetrics.queryid = raw.queryid;

    queryMetrics.cluster = _.pick(raw.cluster, [
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
    queryMetrics.createtime = raw.createtime;
    queryMetrics.totalcputime = raw.totalcputime;
    queryMetrics.cumulativeusermemory = raw.cumulativeusermemory;
    queryMetrics.state = raw.state;
    queryMetrics.sessionuser = raw.sessionuser;
    queryMetrics.sessionsource = raw.sessionsource;
    queryMetrics.inserted_at = raw.inserted_at;

    return queryMetrics;
  }

  static toPersistence(queryMetrics: QueryMetrics): QueryMetricsEntity {
    const queryMetricsEntity = new QueryMetricsEntity();

    queryMetricsEntity.queryid = queryMetrics.queryid;

    const cluster = new ClustersEntity();
    cluster.id = queryMetrics.cluster.id;
    queryMetricsEntity.cluster = cluster;

    queryMetricsEntity.createtime = queryMetrics.createtime;
    queryMetricsEntity.totalcputime = queryMetrics.totalcputime;
    queryMetricsEntity.cumulativeusermemory = queryMetrics.cumulativeusermemory;
    queryMetricsEntity.state = queryMetrics.state;
    queryMetricsEntity.sessionuser = queryMetrics.sessionuser;
    queryMetricsEntity.sessionsource = queryMetrics.sessionsource;
    queryMetricsEntity.inserted_at = queryMetrics.inserted_at;
    return queryMetricsEntity;
  }
}
