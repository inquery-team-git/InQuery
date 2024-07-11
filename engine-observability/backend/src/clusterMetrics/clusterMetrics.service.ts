import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
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
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cluster-up-time.sql`,
      )
      .toString();
    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  getClusterCapacityMetrics(
    cluster_id: string,
    timestamps: any[],
  ): Promise<ClusterMetrics[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cluster-capacity.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$2', `"${timestamps[timestamps.length - 1]}"`);
    sql = sql.replaceAll('$3', `"${cluster_id}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  getClusterFailureRates(
    cluster_id: string,
    timestamps: any[],
  ): Promise<FailureMetrics[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-failure-rate.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    sql = sql.replaceAll('$2', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$3', `"${timestamps[timestamps.length - 1]}"`);
    sql = sql.replaceAll('$4', `10`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  getClusterFailureTypes(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-failure-types.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    sql = sql.replaceAll('$2', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$3', `"${timestamps[timestamps.length - 1]}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  getClusterLatency(
    cluster_id: string,
    timestamps: any[],
  ): Promise<LatencyMetrics[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-latency.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    sql = sql.replaceAll('$2', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$3', `"${timestamps[timestamps.length - 1]}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }

  getClusterLatencyBars(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-latency-bars.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    sql = sql.replaceAll('$2', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$3', `"${timestamps[timestamps.length - 1]}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }
}
