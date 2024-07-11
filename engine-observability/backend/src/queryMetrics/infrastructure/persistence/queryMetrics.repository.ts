import { QueryMetrics } from '../../domain/queryMetrics';
import {
  FilterQueryMetricsDto,
  SortQueryMetricsDto,
} from '../../dto/query-queryMetrics.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export abstract class QueryMetricsRepository {
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQueryMetricsDto | null;
    sortOptions?: SortQueryMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<QueryMetrics[]>;

  abstract hardDeleteByCluster(
    ckusterId: QueryMetrics['cluster'],
  ): Promise<void>;
}
