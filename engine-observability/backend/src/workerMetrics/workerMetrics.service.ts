import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { AllConfigType } from 'src/config/config.type';
import { AppDataSource } from 'src/database/data-source';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { WorkerMetrics } from './domain/workerMetrics';
import {
  FilterWorkerMetricsDto,
  SortWorkerMetricsDto,
} from './dto/query-workerMetrics.dto';
import { WorkerMetricsRepository } from './infrastructure/persistence/workerMetrics.repository';

@Injectable()
export class WorkerMetricsService {
  constructor(
    private readonly workerMetricsRepository: WorkerMetricsRepository,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterWorkerMetricsDto | null;
    sortOptions?: SortWorkerMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<WorkerMetrics[]> {
    return this.workerMetricsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async getMaxPodCPU(cluster_id: string): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cluster-max-pod-cpu.sql`,
      )
      .toString();
    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  async getMostActiveWorkers({
    cluster_id,
    orderBy,
    order,
  }: {
    cluster_id: string;
    orderBy: string;
    order: 'DESC' | 'ASC';
  }): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/most-active-workers.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${cluster_id}"`);
    sql = sql.replaceAll('$2', `L.${orderBy}`);
    sql = sql.replaceAll('$3', order);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  getWorkerCpuAndMemoryUsage(
    workerId: string,
    timestamps: any[],
  ): Promise<
    {
      cpu_usage: number;
      mem_usage: string;
    }[]
  > {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-cpu-memory-usage.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${workerId}"`);
    sql = sql.replaceAll('$2', `"${timestamps[0]}"`);
    sql = sql.replaceAll('$3', `"${timestamps[timestamps.length - 1]}"`);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  async getMostActiveQueriesInWorker({
    workerId,
    orderBy,
    order,
  }: {
    workerId: string;
    orderBy: string;
    order: 'DESC' | 'ASC';
  }): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-active-queries.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${workerId}"`);
    sql = sql.replaceAll('$2', `qwm.${orderBy}`);
    sql = sql.replaceAll('$3', order);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);

    return queryBuilder;
  }

  async getMostActiveTasksInWorker({
    workerId,
    orderBy,
    order,
  }: {
    workerId: string;
    orderBy: string;
    order: 'DESC' | 'ASC';
  }): Promise<Record<string, any>[]> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-active-tasks.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${workerId}"`);
    sql = sql.replaceAll('$2', orderBy);
    sql = sql.replaceAll('$3', order);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }
}
