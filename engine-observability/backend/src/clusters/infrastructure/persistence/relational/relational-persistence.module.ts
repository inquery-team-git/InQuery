import { Module } from '@nestjs/common';
import { ClustersRepository } from '../clusters.repository';
import { ClustersRelationalRepository } from './repositories/clusters.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClustersEntity } from './entities/clusters.entity';
import { ClusterWorkerMappingRepository } from '../cluster-worker-mapping.repository';
import { ClusterWorkerMappingRelationalRepository } from './repositories/cluster-worker-mapping.repository';
import { ClusterWorkerMappingEntity } from './entities/cluster-worker-mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClusterWorkerMappingEntity]),
    TypeOrmModule.forFeature([ClustersEntity]),
  ],
  providers: [
    {
      provide: ClusterWorkerMappingRepository,
      useClass: ClusterWorkerMappingRelationalRepository,
    },
    {
      provide: ClustersRepository,
      useClass: ClustersRelationalRepository,
    },
  ],
  exports: [ClusterWorkerMappingRepository, ClustersRepository],
})
export class RelationalClustersPersistenceModule {}
