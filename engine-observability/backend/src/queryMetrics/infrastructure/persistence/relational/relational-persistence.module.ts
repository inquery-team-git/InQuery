import { Module } from '@nestjs/common';
import { QueryMetricsRepository } from '../queryMetrics.repository';
import { QueryMetricsRelationalRepository } from './repositories/queryMetrics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryMetricsEntity } from './entities/queryMetrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueryMetricsEntity])],
  providers: [
    {
      provide: QueryMetricsRepository,
      useClass: QueryMetricsRelationalRepository,
    },
  ],
  exports: [QueryMetricsRepository],
})
export class RelationalQueryMetricsPersistenceModule {}
