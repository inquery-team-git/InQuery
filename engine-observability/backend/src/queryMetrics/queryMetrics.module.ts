import { Module } from '@nestjs/common';

import { QueryMetricsController } from './queryMetrics.controller';
import { FilesModule } from 'src/files/files.module';
import { QueryMetricsService } from './queryMetrics.service';
import { RelationalQueryMetricsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalQueryMetricsPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [QueryMetricsController],
  providers: [QueryMetricsService],
  exports: [QueryMetricsService, infrastructurePersistenceModule],
})
export class QueryMetricsModule {}
