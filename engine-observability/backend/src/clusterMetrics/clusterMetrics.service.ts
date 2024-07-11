import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import _ from 'lodash';
import { AllConfigType } from 'src/config/config.type';
import { AppDataSource } from 'src/database/data-source';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ClusterMetrics } from './domain/clusterMetrics';
import { FailureMetrics } from './domain/failureMetrics';
import {
  FilterClusterMetricsDto,
  SortClusterMetricsDto,
} from './dto/query-clusterMetrics.dto';
import { ClusterMetricsRepository } from './infrastructure/persistence/clusterMetrics.repository';
import { LatencyMetrics } from './domain/latencyMetrics';

@Injectable()
export class ClusterMetricsService {
  constructor(
    private readonly clusterMetricsRepository: ClusterMetricsRepository,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClusterMetricsDto | null;
    sortOptions?: SortClusterMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<ClusterMetrics[]> {
    return this.clusterMetricsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  getClusterUpTime(cluster_id: string): Promise<Record<string, any>[]> {
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cluster-up-time.sql`,
      )
      .toString();
    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${cluster_id}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
    }
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  getClusterCapacityMetrics(
    cluster_id: string,
    timestamps: any[],
  ): Promise<ClusterMetrics[]> {
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cluster-capacity.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${timestamps[0]}"`);
      sql = _.replace(sql, /\$2/g, `"${timestamps[timestamps.length - 1]}"`);
      sql = _.replace(sql, /\$3/g, `"${cluster_id}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${timestamps[0]}'`);
      sql = _.replace(sql, /\$2/g, `'${timestamps[timestamps.length - 1]}'`);
      sql = _.replace(sql, /\$3/g, `'${cluster_id}'`);
    }
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  getClusterFailureRates(
    cluster_id: string,
    timestamps: any[],
  ): Promise<FailureMetrics[]> {
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-failure-rate.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${cluster_id}"`);
      sql = _.replace(sql, /\$2/g, `"${timestamps[0]}"`);
      sql = _.replace(sql, /\$3/g, `"${timestamps[timestamps.length - 1]}"`);
      sql = _.replace(sql, /\$4/g, `10`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
      sql = _.replace(sql, /\$2/g, `'${timestamps[0]}'`);
      sql = _.replace(sql, /\$3/g, `'${timestamps[timestamps.length - 1]}'`);
      sql = _.replace(sql, /\$4/g, `10`);
    }
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  getClusterFailureTypes(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-failure-types.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${cluster_id}"`);
      sql = _.replace(sql, /\$2/g, `"${timestamps[0]}"`);
      sql = _.replace(sql, /\$3/g, `"${timestamps[timestamps.length - 1]}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
      sql = _.replace(sql, /\$2/g, `'${timestamps[0]}'`);
      sql = _.replace(sql, /\$3/g, `'${timestamps[timestamps.length - 1]}'`);
    }
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  getClusterLatency(
    cluster_id: string,
    timestamps: any[],
  ): Promise<LatencyMetrics[]> {
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-latency.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${cluster_id}"`);
      sql = _.replace(sql, /\$2/g, `"${timestamps[0]}"`);
      sql = _.replace(sql, /\$3/g, `"${timestamps[timestamps.length - 1]}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
      sql = _.replace(sql, /\$2/g, `'${timestamps[0]}'`);
      sql = _.replace(sql, /\$3/g, `'${timestamps[timestamps.length - 1]}'`);
    }
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  getClusterLatencyBars(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-latency-bars.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${cluster_id}"`);
      sql = _.replace(sql, /\$2/g, `"${timestamps[0]}"`);
      sql = _.replace(sql, /\$3/g, `"${timestamps[timestamps.length - 1]}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
      sql = _.replace(sql, /\$2/g, `'${timestamps[0]}'`);
      sql = _.replace(sql, /\$3/g, `'${timestamps[timestamps.length - 1]}'`);
    }
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  async deleteByCluster(clusterId: ClusterMetrics['cluster']): Promise<void> {
    return this.clusterMetricsRepository.hardDeleteByCluster(clusterId);
  }
}
