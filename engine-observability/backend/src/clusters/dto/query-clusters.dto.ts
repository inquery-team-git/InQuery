import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Cluster } from '../domain/clusters';

export class FilterClustersDto {
  @IsOptional()
  enabled?: boolean;

  @IsOptional()
  deleted?: boolean;

  @IsOptional()
  client_id?: string;
}

export class SortClustersDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Cluster;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryClustersDto {
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
    value ? plainToInstance(FilterClustersDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterClustersDto)
  filters?: FilterClustersDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortClustersDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortClustersDto)
  sort?: SortClustersDto[] | null;
}
