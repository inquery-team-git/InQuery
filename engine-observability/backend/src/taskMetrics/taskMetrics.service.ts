import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FilterTaskMetricsDto,
  SortTaskMetricsDto,
} from './dto/query-taskMetrics.dto';
import { TaskMetricsRepository } from './infrastructure/persistence/taskMetrics.repository';
import { TaskMetrics } from './domain/taskMetrics';

@Injectable()
export class TaskMetricsService {
  constructor(private readonly taskMetricsRepository: TaskMetricsRepository) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskMetricsDto | null;
    sortOptions?: SortTaskMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TaskMetrics[]> {
    return this.taskMetricsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
