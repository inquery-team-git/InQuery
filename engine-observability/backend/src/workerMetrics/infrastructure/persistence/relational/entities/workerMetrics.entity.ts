import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { WorkerMetrics } from '../../../../domain/workerMetrics';
import {
  DecimalTransformer,
  DecimalToString,
} from '../../../../../utils/transformers/decimal.transformer';
import Decimal from 'decimal.js';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';

@Entity({
  name: 'worker_metrics',
})
export class WorkerMetricsEntity
  extends EntityRelationalHelper
  implements WorkerMetrics
{
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => ClustersEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'cluster', referencedColumnName: 'id' })
  cluster: ClustersEntity;

  @Column({
    name: 'process_cpu_load',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  process_cpu_load: Decimal;

  @Column({
    name: 'system_cpu_load',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  system_cpu_load: Decimal;

  @Column({ nullable: true, name: 'processor_count', type: 'integer' })
  processor_count: number;

  @Column({ nullable: true, name: 'heap_memory_used', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  heap_memory_used: bigint;

  @Column({ nullable: true, name: 'heap_memory_available', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  heap_memory_available: bigint;

  @Column({ nullable: true, name: 'free_memory_bytes', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  free_memory_bytes: bigint;

  @Column({
    name: 'system_uptime',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  system_uptime: Decimal;

  @Index()
  @Column({ nullable: true, name: 'worker_id', type: 'varchar' })
  worker_id: string;

  @CreateDateColumn({
    name: 'insert_time',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  insert_time: Date;

  @Column({ nullable: true, name: 'num_tasks', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  num_tasks: bigint;
}
