import {
  Controller,
  Get,
  Query as ReqQuery,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { QueryQueriesDto } from './dto/query-queries.dto';
import { Query } from './domain/queries';
import { QueryOptimizationFlags } from './domain/query-optimizations';
import { QueriesService } from './queries.service';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Query')
@Controller({
  path: 'queries',
  version: '1',
})
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Query['query_id']): Promise<NullableType<Query>> {
    return this.queriesService.getQuery({ query_id: id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/details/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async getQueryDetails(
    @Param('id') id: Query['query_id'],
  ): Promise<NullableType<any>> {
    const data = await this.queriesService.getQueryDetails({ query_id: id });
    return data;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllQueries(
    @ReqQuery() query: QueryQueriesDto,
  ): Promise<InfinityPaginationResultType<Query>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.queriesService.getQueries({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/optimizations/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  getOptimization(
    @Param('id') id: Query['query_id'],
  ): Promise<NullableType<QueryOptimizationFlags>> {
    return this.queriesService.getQueryOptimizationById({ query_id: id });
  }
}
