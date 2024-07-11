import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { ClusterWorkerMapping } from '../domain/cluster-worker-mapping';

export class FilterClusterWorkersDto {
  @IsOptional()
  cluster?: string;
}

export class SortClusterWorkersDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof ClusterWorkerMapping;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryClusterWorkersDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(FilterClusterWorkersDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterClusterWorkersDto)
  filters?: FilterClusterWorkersDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortClusterWorkersDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortClusterWorkersDto)
  sort?: SortClusterWorkersDto[] | null;
}
