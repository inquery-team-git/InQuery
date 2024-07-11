import { TaskMetrics } from '../../domain/taskMetrics';
import {
  FilterTaskMetricsDto,
  SortTaskMetricsDto,
} from '../../dto/query-taskMetrics.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export abstract class TaskMetricsRepository {
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskMetricsDto | null;
    sortOptions?: SortTaskMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TaskMetrics[]>;
}
