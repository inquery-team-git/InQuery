import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Transform } from 'class-transformer';
import { Cluster } from '../../../../domain/clusters';

@Entity({
  name: 'clusters',
})
@Index(['client_id', 'host', 'port'], { unique: true })
export class ClustersEntity extends EntityRelationalHelper implements Cluster {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'name', type: 'varchar', length: 2000 })
  @Transform((val) => val)
  name: string;

  @Index()
  @Column({ nullable: false, name: 'client_id', type: 'varchar' })
  @Transform((val) => val)
  client_id: string;

  @Column({ nullable: false, name: 'host', type: 'varchar' })
  @Transform((val) => val)
  host: string;

  @Column({ nullable: false, name: 'port', type: 'varchar' })
  @Transform((val) => val)
  port: string;

  @Column({
    nullable: true,
    name: 'description',
    type: 'varchar',
    length: 2000,
  })
  @Transform((val) => val)
  description: string | null;

  @Index()
  @Column({ name: 'enabled', type: 'boolean', default: true })
  @Transform((val) => val)
  enabled: boolean;

  @Index()
  @Column({ name: 'deleted', type: 'boolean', default: false })
  @Transform((val) => val)
  deleted: boolean;

  @CreateDateColumn({
    name: 'timestamp',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  timestamp: Date;
}
