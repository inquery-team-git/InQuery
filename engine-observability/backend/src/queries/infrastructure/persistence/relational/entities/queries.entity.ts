import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import Decimal from 'decimal.js';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { Query } from '../../../../domain/queries';
import { DecimalToString } from 'src/utils/transformers/decimal.transformer';

@Entity({
  name: 'trino_queries',
})
export class QueriesEntity extends EntityRelationalHelper implements Query {
  @Index()
  @PrimaryColumn({
    nullable: false,
    name: 'query_id',
    type: 'varchar',
    length: 255,
  })
  query_id: string;

  @Column({ nullable: false, name: 'query', type: 'text' })
  query: string;

  @Index()
  @Column({
    nullable: false,
    name: 'query_state',
    type: 'varchar',
    length: 255,
  })
  query_state: string;

  @Index()
  @Column({ nullable: false, name: 'user', type: 'varchar', length: 255 })
  user: string;

  @Index()
  @Column({
    nullable: true,
    name: 'source',
    type: 'varchar',
    length: 255,
  })
  source: string | null;

  @Index()
  @Column({
    nullable: true,
    name: 'catalog',
    type: 'varchar',
    length: 255,
  })
  catalog: string | null;

  @Column({
    nullable: true,
    name: 'schema',
    type: 'varchar',
    length: 255,
  })
  schema: string | null;

  @Column({
    name: 'cumulative_memory',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  cumulative_memory: Decimal;

  @Column({ nullable: true, name: 'cpu_time_millis', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  cpu_time_millis: bigint;

  @Column({ nullable: true, name: 'stage_info_json', type: 'text' })
  stage_info_json: string | null;
}
