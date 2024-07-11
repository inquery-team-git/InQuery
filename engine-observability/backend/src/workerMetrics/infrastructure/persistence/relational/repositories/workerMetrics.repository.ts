import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WorkerMetricsEntity } from '../entities/workerMetrics.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterWorkerMetricsDto,
  SortWorkerMetricsDto,
} from '../../../../dto/query-workerMetrics.dto';
import { WorkerMetrics } from '../../../../domain/workerMetrics';
import { WorkerMetricsRepository } from '../../workerMetrics.repository';
import { WorkerMetricsMapper } from '../mappers/workerMetrics.mapper';
import { ClustersEntity } from 'src/clusters/infrastructure/persistence/relational/entities/clusters.entity';

@Injectable()
export class WorkerMetricsRelationalRepository
  implements WorkerMetricsRepository
{
  constructor(
    @InjectRepository(WorkerMetricsEntity)
    private readonly workerMetricsRepository: Repository<WorkerMetricsEntity>,
  ) {}

  async create(data: WorkerMetrics): Promise<WorkerMetrics> {
    const persistenceModel = WorkerMetricsMapper.toPersistence(data);
    const newEntity = await this.workerMetricsRepository.save(
      this.workerMetricsRepository.create(persistenceModel),
    );
    return WorkerMetricsMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterWorkerMetricsDto | null;
    sortOptions?: SortWorkerMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<WorkerMetrics[]> {
    const where: FindOptionsWhere<WorkerMetricsEntity> = {};
    const entities = await this.workerMetricsRepository.find({
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

    return entities.map((workerMetrics) =>
      WorkerMetricsMapper.toDomain(workerMetrics),
    );
  }

  async findOne(
    fields: EntityCondition<WorkerMetrics>,
  ): Promise<NullableType<WorkerMetrics>> {
    const entity = await this.workerMetricsRepository.findOne({
      where: fields as FindOptionsWhere<WorkerMetricsEntity>,
    });

    return entity ? WorkerMetricsMapper.toDomain(entity) : null;
  }

  async hardDeleteByCluster(
    clusterId: WorkerMetrics['cluster'],
  ): Promise<void> {
    await this.workerMetricsRepository.delete({
      cluster: clusterId as unknown as ClustersEntity,
    });
  }
}
