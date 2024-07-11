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
import { ClusterMetrics } from '../../../../domain/clusterMetrics';
import {
  DecimalTransformer,
  DecimalToString,
} from '../../../../../utils/transformers/decimal.transformer';
import Decimal from 'decimal.js';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';

@Entity({
  name: 'cluster_metrics',
})
@Index(['cluster', 'timestamp'])
export class ClusterMetricsEntity
  extends EntityRelationalHelper
  implements ClusterMetrics
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
    name: 'used_cpu',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  used_cpu: Decimal;

  @Column({
    name: 'total_cpu',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  total_cpu: Decimal;

  @Column({ nullable: true, name: 'used_memory', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  used_memory: bigint;

  @Column({ nullable: true, name: 'total_memory', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  total_memory: bigint;

  @Column({ nullable: true, name: 'worker_count', type: 'integer' })
  worker_count: number;

  @Column({ nullable: true, name: 'uptime', type: 'bigint' })
  @Transform((val) => BigInt(val.value))
  uptime: bigint;

  @Index()
  @CreateDateColumn({
    name: 'timestamp',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  timestamp: Date;
}
