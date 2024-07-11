import { WorkerMetrics } from '../../domain/workerMetrics';
import {
  FilterWorkerMetricsDto,
  SortWorkerMetricsDto,
} from '../../dto/query-workerMetrics.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

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

  abstract hardDeleteByCluster(
    ckusterId: WorkerMetrics['cluster'],
  ): Promise<void>;
}
