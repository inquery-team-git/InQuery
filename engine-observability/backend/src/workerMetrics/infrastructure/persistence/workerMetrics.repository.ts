import { WorkerMetrics } from '../../domain/workerMetrics';
import { NullableType } from 'src/utils/types/nullable.type';
import {
  FilterWorkerMetricsDto,
  SortWorkerMetricsDto,
} from '../../dto/query-workerMetrics.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

export abstract class WorkerMetricsRepository {
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterWorkerMetricsDto | null;
    sortOptions?: SortWorkerMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<WorkerMetrics[]>;
}
