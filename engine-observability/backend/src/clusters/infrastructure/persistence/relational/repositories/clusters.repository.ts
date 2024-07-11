import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClustersEntity } from '../entities/clusters.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterClustersDto,
  SortClustersDto,
} from '../../../../dto/query-clusters.dto';
import { Cluster } from '../../../../domain/clusters';
import { ClustersRepository } from '../../clusters.repository';
import { ClustersMapper } from '../mappers/clusters.mapper';

@Injectable()
export class ClustersRelationalRepository implements ClustersRepository {
  constructor(
    @InjectRepository(ClustersEntity)
    private readonly clustersRepository: Repository<ClustersEntity>,
  ) {}

  async create(data: Cluster): Promise<Cluster> {
    const persistenceModel = ClustersMapper.toPersistence(data);
    const newEntity = await this.clustersRepository.save(
      this.clustersRepository.create(persistenceModel),
    );
    return ClustersMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterClustersDto | null;
    sortOptions?: SortClustersDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Cluster[]> {
    const where: FindOptionsWhere<ClustersEntity> = {};
    if (filterOptions?.enabled) {
      where.enabled = filterOptions.enabled;
    }

    if (filterOptions?.deleted === true) {
      where.deleted = filterOptions.deleted;
    } else {
      where.deleted = false;
    }

    if (filterOptions?.client_id) {
      where.client_id = filterOptions.client_id;
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

    return entities.map((clusters) => ClustersMapper.toDomain(clusters));
  }

  async findOne(
    fields: EntityCondition<Cluster>,
  ): Promise<NullableType<Cluster>> {
    const entity = await this.clustersRepository.findOne({
      where: fields as FindOptionsWhere<ClustersEntity>,
    });

    return entity ? ClustersMapper.toDomain(entity) : null;
  }

  async update(id: Cluster['id'], payload: Partial<Cluster>): Promise<Cluster> {
    const entity = await this.clustersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Cluster not found');
    }

    const updatedEntity = await this.clustersRepository.save(
      this.clustersRepository.create(
        ClustersMapper.toPersistence({
          ...ClustersMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ClustersMapper.toDomain(updatedEntity);
  }

  async softDelete(
    id: Cluster['id'],
    client_id: Cluster['client_id'],
  ): Promise<void> {
    await this.clustersRepository.softDelete({ id, client_id });
  }

  async hardDelete(
    id: Cluster['id'],
    client_id: Cluster['client_id'],
  ): Promise<void> {
    await this.clustersRepository.delete({ id, client_id });
  }
}
