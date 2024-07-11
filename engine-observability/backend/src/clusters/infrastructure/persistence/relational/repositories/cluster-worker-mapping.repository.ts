import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ClusterWorkerMapping } from '../../../../domain/cluster-worker-mapping';
import { ClustersWorkerMappingMapper } from '../mappers/clusters-worker-mapping.mapper';
import { ClusterWorkerMappingEntity } from '../entities/cluster-worker-mapping.entity';
import { ClusterWorkerMappingRepository } from '../../cluster-worker-mapping.repository';
import {
  FilterClusterWorkersDto,
  SortClusterWorkersDto,
} from 'src/clusters/dto/query-cluster-worker.dto';

@Injectable()
export class ClusterWorkerMappingRelationalRepository
  implements ClusterWorkerMappingRepository
{
  constructor(
    @InjectRepository(ClusterWorkerMappingEntity)
    private readonly clustersRepository: Repository<ClusterWorkerMappingEntity>,
  ) {}

  async create(data: ClusterWorkerMapping): Promise<ClusterWorkerMapping> {
    const persistenceModel = ClustersWorkerMappingMapper.toPersistence(data);
    const newEntity = await this.clustersRepository.save(
      this.clustersRepository.create(persistenceModel),
    );
    return ClustersWorkerMappingMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClusterWorkersDto | null;
    sortOptions?: SortClusterWorkersDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<ClusterWorkerMapping[]> {
    const where: FindOptionsWhere<ClusterWorkerMappingEntity> = {};
    if (filterOptions?.cluster) {
      where.cluster = [{ id: filterOptions.cluster }];
    }

    const entities = await this.clustersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((clusters) =>
      ClustersWorkerMappingMapper.toDomain(clusters),
    );
  }

  async findOne(
    fields: EntityCondition<ClusterWorkerMapping>,
  ): Promise<NullableType<ClusterWorkerMapping>> {
    const entity = await this.clustersRepository.findOne({
      where: fields as FindOptionsWhere<ClusterWorkerMappingEntity>,
    });

    return entity ? ClustersWorkerMappingMapper.toDomain(entity) : null;
  }

  async update(
    id: ClusterWorkerMapping['id'],
    payload: Partial<ClusterWorkerMapping>,
  ): Promise<ClusterWorkerMapping> {
    const entity = await this.clustersRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('ClusterWorkerMapping not found');
    }

    const updatedEntity = await this.clustersRepository.save(
      this.clustersRepository.create(
        ClustersWorkerMappingMapper.toPersistence({
          ...ClustersWorkerMappingMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ClustersWorkerMappingMapper.toDomain(updatedEntity);
  }

  async softDelete(id: ClusterWorkerMapping['id']): Promise<void> {
    await this.clustersRepository.softDelete(id);
  }
}
