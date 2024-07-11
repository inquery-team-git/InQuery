import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TaskMetricsEntity } from '../entities/taskMetrics.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterTaskMetricsDto,
  SortTaskMetricsDto,
} from '../../../../dto/query-taskMetrics.dto';
import { TaskMetrics } from '../../../../domain/taskMetrics';
import { TaskMetricsRepository } from '../../taskMetrics.repository';
import { TaskMetricsMapper } from '../mappers/taskMetrics.mapper';

@Injectable()
export class TaskMetricsRelationalRepository implements TaskMetricsRepository {
  constructor(
    @InjectRepository(TaskMetricsEntity)
    private readonly taskMetricsRepository: Repository<TaskMetricsEntity>,
  ) {}

  async create(data: TaskMetrics): Promise<TaskMetrics> {
    const persistenceModel = TaskMetricsMapper.toPersistence(data);
    const newEntity = await this.taskMetricsRepository.save(
      this.taskMetricsRepository.create(persistenceModel),
    );
    return TaskMetricsMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskMetricsDto | null;
    sortOptions?: SortTaskMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TaskMetrics[]> {
    const where: FindOptionsWhere<TaskMetricsEntity> = {};
    const entities = await this.taskMetricsRepository.find({
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

    return entities.map((taskMetrics) =>
      TaskMetricsMapper.toDomain(taskMetrics),
    );
  }

  async findOne(
    fields: EntityCondition<TaskMetrics>,
  ): Promise<NullableType<TaskMetrics>> {
    const entity = await this.taskMetricsRepository.findOne({
      where: fields as FindOptionsWhere<TaskMetricsEntity>,
    });

    return entity ? TaskMetricsMapper.toDomain(entity) : null;
  }
}
