import { Query } from '../../../../domain/queries';
import { QueriesEntity } from '../entities/queries.entity';

export class QueriesMapper {
  static toDomain(raw: QueriesEntity): Query {
    const query = new Query();
    query.query_id = raw.query_id;
    query.query = raw.query;
    query.query_state = raw.query_state;
    query.user = raw.user;
    query.source = raw.source;
    query.catalog = raw.catalog;
    query.schema = raw.schema;
    query.cumulative_memory = raw.cumulative_memory;
    query.cpu_time_millis = raw.cpu_time_millis;
    query.stage_info_json = raw.stage_info_json;
    return query;
  }

  static toPersistence(query: Query): QueriesEntity {
    const queriesEntity = new QueriesEntity();
    queriesEntity.query_id = query.query_id;
    queriesEntity.query = query.query;
    queriesEntity.query_state = query.query_state;
    queriesEntity.user = query.user;
    queriesEntity.source = query.source;
    queriesEntity.catalog = query.catalog;
    queriesEntity.schema = query.schema;
    queriesEntity.cumulative_memory = query.cumulative_memory;
    queriesEntity.cpu_time_millis = query.cpu_time_millis;
    queriesEntity.stage_info_json = query.stage_info_json;
    return queriesEntity;
  }
}
