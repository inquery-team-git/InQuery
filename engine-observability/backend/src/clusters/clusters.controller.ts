import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import _ from 'lodash/fp';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { QueryClustersDto } from './dto/query-clusters.dto';
import { Cluster } from './domain/clusters';
import { ClustersService } from './clusters.service';
import { CreateClustersDto } from './dto/create-clusters.dto';
import { CreateClusterWorkerMappingDto } from './dto/create-cluster-worker-mapping.dto';
import { ClusterWorkerMapping } from './domain/cluster-worker-mapping';
import { QueryClusterWorkersDto } from './dto/query-cluster-worker.dto';
import { UpdateClustersDto } from './dto/update-clusters.dto';
import { ConnectionService } from 'src/utils/connection.service';
import { TestClusterConnectionDto } from './dto/test-cluster.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { WorkerMetrics } from 'src/workerMetrics/domain/workerMetrics';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { ClusterMetricsService } from 'src/clusterMetrics/clusterMetrics.service';
import { QueryMetricsService } from 'src/queryMetrics/queryMetrics.service';
import { WorkerMetricsService } from 'src/workerMetrics/workerMetrics.service';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Cluster')
@Controller({
  path: 'clusters',
  version: '1',
})
export class ClustersController {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly connectionService: ConnectionService,
    private readonly clustersService: ClustersService,
    private readonly clusterMetricsService: ClusterMetricsService,
    private readonly queryMetricsService: QueryMetricsService,
    private readonly workerMetricsService: WorkerMetricsService,
  ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCluster(@Body() data: CreateClustersDto): Promise<Cluster> {
    try {
      const isConnected = await this.connectionService.testConnection(
        data.host,
        data.port,
      );
      if (!isConnected) {
        throw new HttpException(
          `Failed to establish the connection for ${data.host}:${data.port}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Failed to establish the connection for ${data.host}:${data.port}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.clustersService.createCluster(data);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('/test-connection')
  @HttpCode(HttpStatus.OK)
  async testClusterConnection(
    @Body() data: TestClusterConnectionDto,
  ): Promise<{ connected: boolean }> {
    try {
      const isConnected = await this.connectionService.testConnection(
        data.host,
        data.port,
      );
      if (!isConnected) {
        throw new HttpException(
          `Failed to establish the connection for ${data.host}:${data.port}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return { connected: true };
    } catch (error) {
      throw new HttpException(
        `Failed to establish the connection for ${data.host}:${data.port}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put('/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async updateCluster(
    @Param('id') id: Cluster['id'],
    @Body() data: UpdateClustersDto,
  ): Promise<Cluster | null> {
    if (data.host && data.port) {
      try {
        const isConnected = await this.connectionService.testConnection(
          data.host,
          data.port,
        );
        if (!isConnected) {
          throw new HttpException(
            `Failed to establish the connection for ${data.host}:${data.port}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      } catch (error) {
        throw new HttpException(
          `Failed to establish the connection for ${data.host}:${data.port}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return this.clustersService.updateCluster(id, data);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async deleteCluster(@Param('id') id: Cluster['id']): Promise<void> {
    const clientId = this.configService.getOrThrow('app.clientId', {
      infer: true,
    });
    const clusterObj = await this.clustersService.getCluster({
      id,
      client_id: clientId,
    });
    if (!clusterObj) {
      throw new HttpException(
        'Cluster Not Found.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.clusterMetricsService.deleteByCluster(id as unknown as Cluster);
    await this.queryMetricsService.deleteByCluster(id as unknown as Cluster);
    await this.workerMetricsService.deleteByCluster(id as unknown as Cluster);
    return this.clustersService.deleteCluster(id);
  }

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
  findOne(@Param('id') id: Cluster['id']): Promise<NullableType<Cluster>> {
    return this.clustersService.getCluster({ id, deleted: false });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllClusters(
    @Query() query: QueryClustersDto,
  ): Promise<InfinityPaginationResultType<Cluster>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.clustersService.getClusters({
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
  @Get('/worker/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  getWorkerClusterDetails(
    @Param('id') worker_id: WorkerMetrics['worker_id'],
  ): Promise<NullableType<Cluster>> {
    return this.clustersService.getWorkerClusterDetails(worker_id);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('/worker')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createClusterWorkerDto: CreateClusterWorkerMappingDto,
  ): Promise<ClusterWorkerMapping> {
    return this.clustersService.addClusterWorkerMapping(createClusterWorkerDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/:cluster/workers')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async findAllWorkers(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryClusterWorkersDto,
  ): Promise<InfinityPaginationResultType<ClusterWorkerMapping>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    if (_.isEmpty(query.filters)) {
      query.filters = {
        cluster,
      };
    } else {
      query.filters = {
        ...query.filters,
        cluster,
      };
    }
    return infinityPagination(
      await this.clustersService.getClusterWorkers({
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
}
