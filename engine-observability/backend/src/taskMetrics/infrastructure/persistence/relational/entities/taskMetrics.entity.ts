import { Column, CreateDateColumn, Entity, Index } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { TaskMetrics } from '../../../../domain/taskMetrics';
import {
  DecimalTransformer,
  DecimalToString,
} from '../../../../../utils/transformers/decimal.transformer';
import Decimal from 'decimal.js';

@Entity({
  name: 'task_performance_metrics',
})
export class TaskMetricsEntity
  extends EntityRelationalHelper
  implements TaskMetrics
{
  @Index()
  @Column({
    nullable: false,
    name: 'task_names',
    type: 'varchar',
    length: 250,
    primary: true,
  })
  task_names: string;

  @Column({
    nullable: true,
    name: 'elapsed',
    type: 'varchar',
    length: 250,
  })
  elapsed: string;

  @Column({
    nullable: true,
    name: 'queued',
    type: 'varchar',
    length: 250,
  })
  queued: string;

  @CreateDateColumn({
    name: 'start',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  start: Date;

  @CreateDateColumn({
    name: 'end_time',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  end_time: Date;

  @Column({
    nullable: true,
    name: 'node',
    type: 'varchar',
    length: 250,
  })
  node: string;

  @Column({ nullable: true, name: 'drivers', type: 'integer' })
  drivers: number;

  @Column({
    nullable: true,
    name: 'total_scheduled_time',
    type: 'varchar',
    length: 250,
  })
  total_scheduled_time: string;

  @Column({
    nullable: true,
    name: 'total_cpu_time',
    type: 'varchar',
    length: 250,
  })
  total_cpu_time: string;

  @Column({
    nullable: true,
    name: 'total_blocked_time',
    type: 'varchar',
    length: 250,
  })
  total_blocked_time: string;

  @Column({
    nullable: true,
    name: 'processed_input_data_size',
    type: 'varchar',
    length: 250,
  })
  processed_input_data_size: string;

  @Column({
    nullable: true,
    name: 'processed_input_positions',
    type: 'integer',
  })
  processed_input_positions: number;

  @Column({
    name: 'time_difference_seconds',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  time_difference_seconds: Decimal;

  @Column({
    name: 'total_time_stage',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  total_time_stage: Decimal;

  @CreateDateColumn({
    name: 'max_child_end',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  max_child_end: Date;

  @CreateDateColumn({
    name: 'inserted_at',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  inserted_at: Date;
}
