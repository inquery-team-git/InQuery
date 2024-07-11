import { Module } from '@nestjs/common';
import { WorkerMetricsRepository } from '../workerMetrics.repository';
import { WorkerMetricsRelationalRepository } from './repositories/workerMetrics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerMetricsEntity } from './entities/workerMetrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerMetricsEntity])],
  providers: [
    {
      provide: WorkerMetricsRepository,
      useClass: WorkerMetricsRelationalRepository,
    },
  ],
  exports: [WorkerMetricsRepository],
})
export class RelationalWorkerMetricsPersistenceModule {}
