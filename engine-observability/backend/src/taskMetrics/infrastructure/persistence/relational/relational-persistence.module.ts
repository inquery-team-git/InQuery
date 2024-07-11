import { Module } from '@nestjs/common';
import { TaskMetricsRepository } from '../taskMetrics.repository';
import { TaskMetricsRelationalRepository } from './repositories/taskMetrics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskMetricsEntity } from './entities/taskMetrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskMetricsEntity])],
  providers: [
    {
      provide: TaskMetricsRepository,
      useClass: TaskMetricsRelationalRepository,
    },
  ],
  exports: [TaskMetricsRepository],
})
export class RelationalTaskMetricsPersistenceModule {}
