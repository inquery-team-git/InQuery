import { Module } from '@nestjs/common';

import { QueriesController } from './queries.controller';
import { FilesModule } from 'src/files/files.module';
import { QueriesService } from './queries.service';
import { WorkerMetricsModule } from '../workerMetrics/workerMetrics.module';
import { RelationalQueriesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ConnectionService } from 'src/utils/connection.service';
import { QueryOptimizer } from './helpers/queries.optimize';
import { CacheModule } from 'src/cache/cache.module';

const infrastructurePersistenceModule = RelationalQueriesPersistenceModule;

@Module({
  imports: [
    WorkerMetricsModule,
    infrastructurePersistenceModule,
    FilesModule,
    CacheModule,
  ],
  controllers: [QueriesController],
  providers: [ConnectionService, QueriesService, QueryOptimizer],
  exports: [QueriesService, infrastructurePersistenceModule],
})
export class QueriesModule {}
