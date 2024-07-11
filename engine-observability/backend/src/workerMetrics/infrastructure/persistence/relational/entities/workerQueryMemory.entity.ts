import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { WorkerQueryMemory } from '../../../../domain/workerQueryMemory';

@Entity({
  name: 'query_worker_memory',
})
export class WorkerMetricsEntity
  extends EntityRelationalHelper
  implements WorkerQueryMemory
{
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: true, name: 'query_id', type: 'varchar' })
  query_id: string;

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
