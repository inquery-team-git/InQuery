import { Module } from '@nestjs/common';
import { QueriesRepository } from '../queries.repository';
import { QueriesRelationalRepository } from './repositories/queries.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesEntity } from './entities/queries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueriesEntity])],
  providers: [
    {
      provide: QueriesRepository,
      useClass: QueriesRelationalRepository,
    },
  ],
  exports: [QueriesRepository],
})
export class RelationalQueriesPersistenceModule {}
