import { Query } from '../../domain/queries';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterQueriesDto, SortQueriesDto } from '../../dto/query-queries.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

export abstract class QueriesRepository {
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQueriesDto | null;
    sortOptions?: SortQueriesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Query[]>;

  abstract findOne(
    fields: EntityCondition<Query>,
    includeStageInfoJson: boolean,
  ): Promise<NullableType<Query>>;

  abstract countQueriesBySubquery(subquery: string): Promise<number>;
}
