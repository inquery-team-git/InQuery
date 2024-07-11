import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClusterMetricsEntity } from '../entities/clusterMetrics.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterClusterMetricsDto,
  SortClusterMetricsDto,
} from '../../../../dto/query-clusterMetrics.dto';
import { ClusterMetrics } from '../../../../domain/clusterMetrics';
import { ClusterMetricsRepository } from '../../clusterMetrics.repository';
import { ClusterMetricsMapper } from '../mappers/clusterMetrics.mapper';

@Injectable()
export class ClusterMetricsRelationalRepository
  implements ClusterMetricsRepository
{
  constructor(
    @InjectRepository(ClusterMetricsEntity)
    private readonly clusterMetricsRepository: Repository<ClusterMetricsEntity>,
  ) {}

  async create(data: ClusterMetrics): Promise<ClusterMetrics> {
    const persistenceModel = ClusterMetricsMapper.toPersistence(data);
    const newEntity = await this.clusterMetricsRepository.save(
      this.clusterMetricsRepository.create(persistenceModel),
    );
    return ClusterMetricsMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClusterMetricsDto | null;
    sortOptions?: SortClusterMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<ClusterMetrics[]> {
    const where: FindOptionsWhere<ClusterMetricsEntity> = {};
    const entities = await this.clusterMetricsRepository.find({
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

    return entities.map((clusterMetrics) =>
      ClusterMetricsMapper.toDomain(clusterMetrics),
    );
  }

  async findOne(
    fields: EntityCondition<ClusterMetrics>,
  ): Promise<NullableType<ClusterMetrics>> {
    const entity = await this.clusterMetricsRepository.findOne({
      where: fields as FindOptionsWhere<ClusterMetricsEntity>,
    });

    return entity ? ClusterMetricsMapper.toDomain(entity) : null;
  }

  async update(
    id: ClusterMetrics['id'],
    payload: Partial<ClusterMetrics>,
  ): Promise<ClusterMetrics> {
    const entity = await this.clusterMetricsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('ClusterMetrics not found');
    }

    const updatedEntity = await this.clusterMetricsRepository.save(
      this.clusterMetricsRepository.create(
        ClusterMetricsMapper.toPersistence({
          ...ClusterMetricsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ClusterMetricsMapper.toDomain(updatedEntity);
  }

  async softDelete(id: ClusterMetrics['id']): Promise<void> {
    await this.clusterMetricsRepository.softDelete(id);
  }
}
