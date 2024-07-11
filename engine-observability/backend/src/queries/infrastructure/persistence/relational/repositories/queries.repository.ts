import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm'; // Import Like from typeorm
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Query } from '../../../../domain/queries';
import {
  FilterQueriesDto,
  SortQueriesDto,
} from '../../../../dto/query-queries.dto';
import { QueriesRepository } from '../../queries.repository';
import { QueriesEntity } from '../entities/queries.entity';
import { QueriesMapper } from '../mappers/queries.mapper';

@Injectable()
export class QueriesRelationalRepository implements QueriesRepository {
  constructor(
    @InjectRepository(QueriesEntity)
    private readonly queriesRepository: Repository<QueriesEntity>,
  ) {}

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQueriesDto | null;
    sortOptions?: SortQueriesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Query[]> {
    const where: FindOptionsWhere<QueriesEntity> = {};
    if (filterOptions?.query_id) {
      where.query_id = In(filterOptions.query_id.split(','));
    }
    if (filterOptions?.query_state) {
      where.query_state = In(filterOptions.query_state.split(','));
    }
    if (filterOptions?.source) {
      where.source = In(filterOptions.source.split(','));
    }
    if (filterOptions?.user) {
      where.user = In(filterOptions.user.split(','));
    }
    if (filterOptions?.catalog) {
      where.catalog = In(filterOptions.catalog.split(','));
    }
    const selectFields: Array<keyof QueriesEntity> = [
      'query_id',
      'query',
      'query_state',
      'user',
      'source',
      'catalog',
      'schema',
      'cumulative_memory',
      'cpu_time_millis',
    ];

    const entities = await this.queriesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      select: selectFields,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((queries) => QueriesMapper.toDomain(queries));
  }

  async findOne(
    fields: EntityCondition<Query>,
    includeStageInfoJson: boolean = false,
  ): Promise<NullableType<Query>> {
    // Optionally include the stage_info_json column for analysis
    const selectFields: Array<keyof QueriesEntity> = [
      'query_id',
      'query',
      'query_state',
      'user',
      'source',
      'catalog',
      'schema',
      'cumulative_memory',
      'cpu_time_millis',
    ];
    if (includeStageInfoJson) {
      selectFields.push('stage_info_json');
    }

    const entity = await this.queriesRepository.findOne({
      where: fields as FindOptionsWhere<QueriesEntity>,
      select: selectFields,
    });

    return entity ? QueriesMapper.toDomain(entity) : null;
  }

  // New method to count queries matching a subquery
  async countQueriesBySubquery(subquery: string): Promise<number> {
    const count = await this.queriesRepository.count({
      where: {
        query: Like(`%${subquery}%`),
      },
    });
    return count;
  }
}
