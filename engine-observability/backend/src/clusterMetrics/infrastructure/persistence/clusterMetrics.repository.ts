import { ClusterMetrics } from '../../domain/clusterMetrics';
import {
  FilterClusterMetricsDto,
  SortClusterMetricsDto,
} from '../../dto/query-clusterMetrics.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export abstract class ClusterMetricsRepository {
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClusterMetricsDto | null;
    sortOptions?: SortClusterMetricsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<ClusterMetrics[]>;

  abstract hardDeleteByCluster(
    ckusterId: ClusterMetrics['cluster'],
  ): Promise<void>;
}
