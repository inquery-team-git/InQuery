import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryMetricsEntity } from '../entities/queryMetrics.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterQueryMetricsDto,
  SortQueryMetricsDto,
} from '../../../../dto/query-queryMetrics.dto';
import { QueryMetrics } from '../../../../domain/queryMetrics';
import { QueryMetricsRepository } from '../../queryMetrics.repository';
import { QueryMetricsMapper } from '../mappers/queryMetrics.mapper';

@Injectable()
export class QueryMetricsRelationalRepository
  implements QueryMetricsRepository
{
  constructor(
    @InjectRepository(QueryMetricsEntity)
    private readonly queryMetricsRepository: Repository<QueryMetricsEntity>,
  ) {}

  async create(data: QueryMetrics): Promise<QueryMetrics> {
    const persistenceModel = QueryMetricsMapper.toPersistence(data);
    const newEntity = await this.queryMetricsRepository.save(
      this.queryMetricsRepository.create(persistenceModel),
    );
    return QueryMetricsMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQueryMetricsDto | null;
    sortOptions?: SortQueryMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<QueryMetrics[]> {
    const where: FindOptionsWhere<QueryMetricsEntity> = {};
    const entities = await this.queryMetricsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((queryMetrics) =>
      QueryMetricsMapper.toDomain(queryMetrics),
    );
  }

  async findOne(
    fields: EntityCondition<QueryMetrics>,
  ): Promise<NullableType<QueryMetrics>> {
    const entity = await this.queryMetricsRepository.findOne({
      where: fields as FindOptionsWhere<QueryMetricsEntity>,
    });

    return entity ? QueryMetricsMapper.toDomain(entity) : null;
  }
}
