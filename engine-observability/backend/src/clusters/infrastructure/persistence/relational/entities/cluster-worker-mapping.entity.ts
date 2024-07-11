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
import { ClusterWorkerMapping } from '../../../../domain/cluster-worker-mapping';
import { ClustersEntity } from './clusters.entity';

@Entity({
  name: 'cluster_worker_mappings',
})
@Index(['cluster', 'worker'], { unique: true })
export class ClusterWorkerMappingEntity
  extends EntityRelationalHelper
  implements ClusterWorkerMapping
{
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => ClustersEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'cluster', referencedColumnName: 'id' })
  cluster: ClustersEntity;

  @Index()
  @Column({ nullable: false, name: 'worker', type: 'varchar' })
  worker: string;

  @CreateDateColumn({
    name: 'timestamp',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  timestamp: Date;
}
