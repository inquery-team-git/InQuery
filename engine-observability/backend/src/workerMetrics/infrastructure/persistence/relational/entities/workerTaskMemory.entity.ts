import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { WorkerTaskMemory } from '../../../../domain/workerTaskMemory';

@Entity({
  name: 'task_worker_memory',
})
export class WorkerMetricsEntity
  extends EntityRelationalHelper
  implements WorkerTaskMemory
{
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: true, name: 'task', type: 'varchar' })
  task: string;

  @Column({ nullable: true, name: 'used_memory', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  used_memory: bigint;

  @Index()
  @Column({ nullable: true, name: 'worker_id', type: 'varchar' })
  worker_id: string;

  @CreateDateColumn({
    name: 'inserted_at',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  inserted_at: Date;
}
