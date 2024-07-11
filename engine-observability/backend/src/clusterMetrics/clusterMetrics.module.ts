import { Module } from '@nestjs/common';

import { ClusterMetricsController } from './clusterMetrics.controller';
import { FilesModule } from 'src/files/files.module';
import { ClusterMetricsService } from './clusterMetrics.service';
import { WorkerMetricsModule } from '../workerMetrics/workerMetrics.module';
import { RelationalClusterMetricsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule =
  RelationalClusterMetricsPersistenceModule;

@Module({
  imports: [WorkerMetricsModule, infrastructurePersistenceModule, FilesModule],
  controllers: [ClusterMetricsController],
  providers: [ClusterMetricsService],
  exports: [ClusterMetricsService, infrastructurePersistenceModule],
})
export class ClusterMetricsModule {}
