import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { QueryMetrics } from '../../../../domain/queryMetrics';
import {
  DecimalTransformer,
  DecimalToString,
} from '../../../../../utils/transformers/decimal.transformer';
import Decimal from 'decimal.js';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';

@Entity({
  name: 'query_metrics',
})
export class QueryMetricsEntity
  extends EntityRelationalHelper
  implements QueryMetrics
{
  @Index()
  @Column({
    nullable: false,
    name: 'queryid',
    type: 'varchar',
    length: 250,
    primary: true,
  })
  queryid: string;

  @Index()
  @ManyToOne(() => ClustersEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'cluster', referencedColumnName: 'id' })
  cluster: ClustersEntity;

  @CreateDateColumn({
    name: 'createtime',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createtime: Date;

  @Column({
    name: 'totalcputime',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  totalcputime: Decimal;

  @Column({
    name: 'cumulativeusermemory',
    type: 'double precision',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  @Transform((val) => DecimalToString(val.value), { toPlainOnly: true })
  cumulativeusermemory: Decimal;

  @Column({
    nullable: true,
    name: 'state',
    type: 'varchar',
    length: 50,
  })
  state: string;

  @Column({
    nullable: true,
    name: 'sessionuser',
    type: 'varchar',
    length: 250,
  })
  sessionuser: string;

  @Column({
    nullable: true,
    name: 'sessionsource',
    type: 'varchar',
    length: 250,
  })
  sessionsource: string;

  @CreateDateColumn({
    name: 'inserted_at',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  inserted_at: Date;
}
