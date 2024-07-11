import { ClusterWorkerMapping } from '../../domain/cluster-worker-mapping';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import {
  FilterClusterWorkersDto,
  SortClusterWorkersDto,
} from 'src/clusters/dto/query-cluster-worker.dto';

export abstract class ClusterWorkerMappingRepository {
  abstract create(
    data: Omit<
      ClusterWorkerMapping,
      'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
    >,
  ): Promise<ClusterWorkerMapping>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClusterWorkersDto | null;
    sortOptions?: SortClusterWorkersDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<ClusterWorkerMapping[]>;

  abstract findOne(
    fields: EntityCondition<ClusterWorkerMapping>,
  ): Promise<NullableType<ClusterWorkerMapping>>;

  abstract update(
    id: ClusterWorkerMapping['id'],
    payload: DeepPartial<ClusterWorkerMapping>,
  ): Promise<ClusterWorkerMapping | null>;

  abstract softDelete(id: ClusterWorkerMapping['id']): Promise<void>;
}
