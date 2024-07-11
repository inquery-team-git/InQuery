import { Module } from '@nestjs/common';

import { WorkerMetricsController } from './workerMetrics.controller';
import { FilesModule } from 'src/files/files.module';
import { WorkerMetricsService } from './workerMetrics.service';
import { RelationalWorkerMetricsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule =
  RelationalWorkerMetricsPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [WorkerMetricsController],
  providers: [WorkerMetricsService],
  exports: [WorkerMetricsService, infrastructurePersistenceModule],
})
export class WorkerMetricsModule {}
