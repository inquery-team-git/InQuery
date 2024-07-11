import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import _ from 'lodash';
import { AppDataSource } from 'src/database/data-source';
import { AllConfigType } from 'src/config/config.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  getExecutionDetails,
  getQueryOverView,
  getStageNodesAndEdges,
  parseDateFromQueryId,
} from 'src/utils/queries';
import { CacheService } from 'src/cache/cache.service';
import { generateStagesExecutionMetrics } from 'src/utils/stages';
import { Query } from './domain/queries';
import { QueryOptimizationFlags } from './domain/query-optimizations';
import { FilterQueriesDto, SortQueriesDto } from './dto/query-queries.dto';
import { QueryOptimizer } from './helpers/queries.optimize';
import { QueriesRepository } from './infrastructure/persistence/queries.repository';

@Injectable()
export class QueriesService {
  constructor(
    private readonly queriesRepository: QueriesRepository,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly queryOptimizer: QueryOptimizer,
    private readonly cacheService: CacheService,
  ) {}

  getQueries({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQueriesDto | null;
    sortOptions?: SortQueriesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Query[]> {
    // const clientId = this.configService.getOrThrow('app.clientId', {
    //   infer: true,
    // });
    return this.queriesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async getQuery(fields: EntityCondition<Query>): Promise<NullableType<Query>> {
    // Cache Key
    const cacheKey = `query_data_${fields.query_id}`;
    // Check for Cache
    const cachedData = await this.cacheService.get<Query>(cacheKey);
    if (cachedData) return cachedData;
    const dbData = await this.queriesRepository.findOne(fields, false);

    // Set cache
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.cacheService.set(cacheKey, dbData);
    return dbData;
  }

  async getQueryOptimizationById(
    fields: EntityCondition<Query>,
  ): Promise<NullableType<QueryOptimizationFlags>> {
    // Cache Key
    const cacheKey = `query_optimizations_${fields.query_id}`;
    // Check for Cache
    const cachedData =
      await this.cacheService.get<QueryOptimizationFlags>(cacheKey);
    if (cachedData) return cachedData;

    const query = await this.queriesRepository.findOne(fields, true);

    if (query) {
      if (query.query_state == 'FAILED') {
        console.log(
          'InQuery cannot provide optimization support for failed queries.',
        );
        return null;
      } else {
        const optimizations = await this.queryOptimizer.optimizeQuery(query);

        if (!_.isEmpty(optimizations)) {
          // Set cache
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this.cacheService.set(cacheKey, optimizations);
        }
        return optimizations;
      }
    }
    console.log('Query not found');
    return null;
  }

  async getQueryDetails(
    fields: EntityCondition<Query>,
  ): Promise<Record<string, any>> {
    // Cache Key
    const cacheKey = `query_details_${fields.query_id}`;
    // Check for Cache
    const cachedData = await this.cacheService.get<Query>(cacheKey);
    if (cachedData) return cachedData;

    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/query-details.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${fields.query_id}"`);
    const queryBuilder = AppDataSource.createEntityManager()
      .query(sql)
      .then((res) => {
        const data = res[0];
        if (data) {
          const stage_info = JSON.parse(data.stage_info_json);
          data.submission_time = parseDateFromQueryId(
            data.query_id,
          )?.toISOString();
          data.overview = getQueryOverView(data);
          data.execution = getExecutionDetails(data);
          data.stage_info = stage_info ? getStageNodesAndEdges(stage_info) : {};
          data.execution_metrics = stage_info
            ? generateStagesExecutionMetrics(stage_info)
            : [];
        }
        return _.pick(data, [
          'query_id',
          'query',
          'query_state',
          'wall_time_millis',
          'plan',
          'overview',
          'execution',
          'stage_info',
          'execution_metrics',
          'submission_time',
        ]);
      });
    const dbData = await queryBuilder;
    // Set cache
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.cacheService.set(cacheKey, dbData);
    return dbData;
  }
}
