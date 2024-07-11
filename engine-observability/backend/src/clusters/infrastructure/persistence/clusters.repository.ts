import { Cluster } from '../../domain/clusters';
import { NullableType } from 'src/utils/types/nullable.type';
import {
  FilterClustersDto,
  SortClustersDto,
} from '../../dto/query-clusters.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

export abstract class ClustersRepository {
  abstract create(
    data: Omit<Cluster, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Cluster>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClustersDto | null;
    sortOptions?: SortClustersDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Cluster[]>;

  abstract findOne(
    fields: EntityCondition<Cluster>,
  ): Promise<NullableType<Cluster>>;

  abstract update(
    id: Cluster['id'],
    payload: DeepPartial<Cluster>,
  ): Promise<Cluster | null>;

  abstract softDelete(
    id: Cluster['id'],
    client_id: Cluster['client_id'],
  ): Promise<void>;

  abstract hardDelete(
    id: Cluster['id'],
    client_id: Cluster['client_id'],
  ): Promise<void>;
}
