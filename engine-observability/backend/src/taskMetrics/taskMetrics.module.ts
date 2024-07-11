import { Module } from '@nestjs/common';

import { TaskMetricsController } from './taskMetrics.controller';
import { FilesModule } from 'src/files/files.module';
import { TaskMetricsService } from './taskMetrics.service';
import { RelationalTaskMetricsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalTaskMetricsPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [TaskMetricsController],
  providers: [TaskMetricsService],
  exports: [TaskMetricsService, infrastructurePersistenceModule],
})
export class TaskMetricsModule {}
