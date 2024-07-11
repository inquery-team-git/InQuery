import { Module } from '@nestjs/common';

import { ClustersController } from './clusters.controller';
import { FilesModule } from 'src/files/files.module';
import { ClustersService } from './clusters.service';
import { WorkerMetricsModule } from '../workerMetrics/workerMetrics.module';
import { RelationalClustersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ConnectionService } from 'src/utils/connection.service';
import { RedisService } from 'src/pubsub/redis';
import { ClusterMetricsModule } from 'src/clusterMetrics/clusterMetrics.module';
import { QueryMetricsModule } from 'src/queryMetrics/queryMetrics.module';

const infrastructurePersistenceModule = RelationalClustersPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    FilesModule,
    WorkerMetricsModule,
    ClusterMetricsModule,
    QueryMetricsModule,
  ],
  controllers: [ClustersController],
  providers: [ConnectionService, ClustersService, RedisService],
  exports: [ClustersService, infrastructurePersistenceModule],
})
export class ClustersModule {}
