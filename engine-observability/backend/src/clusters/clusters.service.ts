import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fs from 'fs';
import { AppDataSource } from 'src/database/data-source';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { RedisService } from 'src/pubsub/redis';
import { FilterClustersDto, SortClustersDto } from './dto/query-clusters.dto';
import { ClustersRepository } from './infrastructure/persistence/clusters.repository';
import { ClusterWorkerMappingRepository } from './infrastructure/persistence/cluster-worker-mapping.repository';
import { Cluster } from './domain/clusters';
import { ClusterWorkerMapping } from './domain/cluster-worker-mapping';
import { CreateClustersDto } from './dto/create-clusters.dto';
import { CreateClusterWorkerMappingDto } from './dto/create-cluster-worker-mapping.dto';
import { DeepPartial } from 'typeorm';
import {
  FilterClusterWorkersDto,
  SortClusterWorkersDto,
} from './dto/query-cluster-worker.dto';
import { UpdateClustersDto } from './dto/update-clusters.dto';
import { WorkerMetrics } from 'src/workerMetrics/domain/workerMetrics';

@Injectable()
export class ClustersService {
  constructor(
    private readonly clustersRepository: ClustersRepository,
    private readonly clusterWorkerMappingRepository: ClusterWorkerMappingRepository,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly redisService: RedisService,
  ) {}

  getClusters({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClustersDto | null;
    sortOptions?: SortClustersDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Cluster[]> {
    const clientId = this.configService.getOrThrow('app.clientId', {
      infer: true,
    });
    filterOptions = {
      ...filterOptions,
      client_id: clientId,
      deleted: false,
    };
    return this.clustersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  getCluster(fields: EntityCondition<Cluster>): Promise<NullableType<Cluster>> {
    return this.clustersRepository.findOne(fields);
  }

  async getWorkerClusterDetails(
    worker_id: WorkerMetrics['worker_id'],
  ): Promise<NullableType<Cluster>> {
    let sql = fs
      .readFileSync(
        `${this.configService.getOrThrow('app.sqlQueriesDir', { infer: true })}/worker-cluster-details.sql`,
      )
      .toString();

    sql = sql.replaceAll('$1', `"${worker_id}"`);
    const [cluster] = await AppDataSource.createEntityManager().query(sql);

    return cluster;
  }

  async createCluster(createClusterDto: CreateClustersDto): Promise<Cluster> {
    const clientId = this.configService.getOrThrow('app.clientId', {
      infer: true,
    });
    const clusterObj = await this.clustersRepository.findOne({
      client_id: clientId,
      host: createClusterDto.host,
      port: createClusterDto.port.toString(),
      deleted: false,
    });
    if (clusterObj) {
      throw new HttpException(
        'Cluster Already Exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const clonedPayload = {
      ...createClusterDto,
      port: createClusterDto.port.toString(),
      enabled: true,
      deleted: false,
      client_id: clientId,
      timestamp: new Date(),
    };

    return this.clustersRepository.create(clonedPayload).then(async (data) => {
      await this.redisService.publish('cluster_create', data);
      return data;
    });
  }

  async updateCluster(
    id: Cluster['id'],
    payload: DeepPartial<UpdateClustersDto>,
  ): Promise<Cluster | null> {
    const clientId = this.configService.getOrThrow('app.clientId', {
      infer: true,
    });
    if (payload.host && payload.port) {
      const clusterObj = await this.clustersRepository.findOne({
        deleted: false,
        client_id: clientId,
        host: payload.host,
        port: payload.port.toString(),
      });
      if (clusterObj) {
        throw new HttpException(
          'Cluster Already Exists',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const clonedPayload = { ...payload, port: payload?.port?.toString() };

    return this.clustersRepository
      .update(id, clonedPayload)
      .then(async (data) => {
        await this.redisService.publish('cluster_update', data);
        return data;
      });
  }

  async deleteCluster(id: Cluster['id']): Promise<Cluster | null> {
    const clientId = this.configService.getOrThrow('app.clientId', {
      infer: true,
    });
    const clusterObj = await this.clustersRepository.findOne({
      id,
      deleted: false,
      client_id: clientId,
    });
    if (!clusterObj) {
      throw new HttpException(
        'Cluster Not Found.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const clonedPayload = { deleted: true, enabled: false };
    return this.clustersRepository
      .update(id, clonedPayload)
      .then(async (data) => {
        await this.redisService.publish('cluster_delete', data);
        return data;
      });
    // return this.clustersRepository
    //   .hardDelete(id, clientId)
    //   .then(async (data) => {
    //     await this.redisService.publish('cluster_delete', data);
    //     return data;
    //   });
  }

  async addClusterWorkerMapping(
    createDto: CreateClusterWorkerMappingDto,
  ): Promise<ClusterWorkerMapping> {
    const clusterObj = await this.clustersRepository.findOne({
      id: createDto.cluster,
    });
    if (!clusterObj) {
      throw new HttpException(
        'Cluster not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const clonedPayload = {
      ...createDto,
      cluster: clusterObj,
      timestamp: new Date(),
    };

    return this.clusterWorkerMappingRepository.create(clonedPayload);
  }

  getClusterWorkers({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClusterWorkersDto | null;
    sortOptions?: SortClusterWorkersDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<ClusterWorkerMapping[]> {
    return this.clusterWorkerMappingRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
