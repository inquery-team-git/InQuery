import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { AllConfigType } from 'src/config/config.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { AppDataSource } from 'src/database/data-source';
import {
  FilterQueryMetricsDto,
  SortQueryMetricsDto,
} from './dto/query-queryMetrics.dto';
import { QueryMetricsRepository } from './infrastructure/persistence/queryMetrics.repository';
import { QueryMetrics } from './domain/queryMetrics';

@Injectable()
export class QueryMetricsService {
  constructor(
    private readonly queryMetricsRepository: QueryMetricsRepository,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQueryMetricsDto | null;
    sortOptions?: SortQueryMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<QueryMetrics[]> {
    return this.queryMetricsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async getQueriesByUserMetrics(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/queries-by-user.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$2', `"${timestamps[timestamps.length - 1]}"`);
    sql = sql.replaceAll('$3', `"${cluster_id}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  async getCPUUsageByUserMetrics(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cpu-usage-by-user.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$2', `"${timestamps[timestamps.length - 1]}"`);
    sql = sql.replaceAll('$3', `"${cluster_id}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  async getQueryMetricsByUser(
    cluster_id: string,
    timestamps: any[],
  ): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-metrics-by-user.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$2', `"${timestamps[timestamps.length - 1]}"`);
    sql = sql.replaceAll('$3', `"${cluster_id}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  async getMostActiveQueries({
    cluster_id,
    orderBy,
    order,
  }: {
    cluster_id: string;
    orderBy: keyof QueryMetrics;
    order: 'DESC' | 'ASC';
  }): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-metrics-most-active-queries.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    sql = sql.replaceAll('$2', orderBy);
    sql = sql.replaceAll('$3', order);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }
}
