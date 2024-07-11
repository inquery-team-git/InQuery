import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import Decimal from 'decimal.js';
import { Transform } from 'class-transformer';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { DecimalToString } from 'src/utils/transformers/decimal.transformer';
import { Query } from '../../../../domain/queries';

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

  @Column({ nullable: false, name: 'plan', type: 'text' })
  plan: string;

  @Column({ nullable: true, name: 'wall_time_millis', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  wall_time_millis: bigint;

  @Column({ nullable: true, name: 'execution_time_millis', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  execution_time_millis: bigint;

  @Column({ nullable: true, name: 'queued_time_millis', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  queued_time_millis: bigint;

  @Column({ nullable: true, name: 'planning_time_millis', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  planning_time_millis: bigint;

  @Column({ nullable: true, name: 'analysis_time_millis', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  analysis_time_millis: bigint;

  @Column({ nullable: true, name: 'peak_memory_bytes', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  peak_memory_bytes: bigint;

  @Column({ nullable: true, name: 'total_bytes', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  total_bytes: bigint;

  @Column({ nullable: true, name: 'total_rows', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  total_rows: bigint;

  @Column({ nullable: true, name: 'output_bytes', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  output_bytes: bigint;

  @Column({ nullable: true, name: 'output_rows', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  output_rows: bigint;

  @Column({ nullable: false, name: 'error_code', type: 'varchar', length: 255 })
  error_code: string;

  @Column({ nullable: false, name: 'error_type', type: 'varchar', length: 255 })
  error_type: string;

  @Column({
    nullable: false,
    name: 'failure_type',
    type: 'varchar',
    length: 255,
  })
  failure_type: string;

  @Column({
    nullable: false,
    name: 'failure_message',
    type: 'varchar',
    length: 255,
  })
  failure_message: string;

  @Column({
    nullable: false,
    name: 'resource_group_id',
    type: 'varchar',
    length: 255,
  })
  resource_group_id: string;
}
