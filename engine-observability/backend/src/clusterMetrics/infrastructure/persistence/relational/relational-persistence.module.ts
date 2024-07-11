import { Module } from '@nestjs/common';
import { ClusterMetricsRepository } from '../clusterMetrics.repository';
import { ClusterMetricsRelationalRepository } from './repositories/clusterMetrics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClusterMetricsEntity } from './entities/clusterMetrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClusterMetricsEntity])],
  providers: [
    {
      provide: ClusterMetricsRepository,
      useClass: ClusterMetricsRelationalRepository,
    },
  ],
  exports: [ClusterMetricsRepository],
})
export class RelationalClusterMetricsPersistenceModule {}
