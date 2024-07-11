import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import _ from 'lodash';
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
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/cluster-max-pod-cpu.sql`,
      )
      .toString();
    sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
    if (dbType === 'mysql') {
    } else {
    }
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
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/most-active-workers.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${cluster_id}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${cluster_id}'`);
    }
    sql = _.replace(sql, /\$2/g, `L.${orderBy}`);
    sql = _.replace(sql, /\$3/g, order);
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
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-cpu-memory-usage.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${workerId}"`);
      sql = _.replace(sql, /\$2/g, `"${timestamps[0]}"`);
      sql = _.replace(sql, /\$3/g, `"${timestamps[timestamps.length - 1]}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${workerId}'`);
      sql = _.replace(sql, /\$2/g, `'${timestamps[0]}'`);
      sql = _.replace(sql, /\$3/g, `'${timestamps[timestamps.length - 1]}'`);
    }
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
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-active-queries.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${workerId}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${workerId}'`);
    }
    sql = _.replace(sql, /\$2/g, `qwm.${orderBy}`);
    sql = _.replace(sql, /\$3/g, order);
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
    const dbType = this.configService.getOrThrow('database.type', {
      infer: true,
    });
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-active-tasks.sql`,
      )
      .toString();

    if (dbType === 'mysql') {
      sql = _.replace(sql, /\$1/g, `"${workerId}"`);
    } else {
      sql = _.replace(sql, /\$1/g, `'${workerId}'`);
    }
    sql = _.replace(sql, /\$2/g, orderBy);
    sql = _.replace(sql, /\$3/g, order);
    const queryBuilder = AppDataSource.createEntityManager().query(sql);
    return queryBuilder;
  }
}
