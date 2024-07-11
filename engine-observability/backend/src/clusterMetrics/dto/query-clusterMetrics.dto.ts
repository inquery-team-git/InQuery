import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { TIMESTAMP_FILTER } from 'src/utils/helper';
import { ClusterMetrics } from '../domain/clusterMetrics';

export class FilterClusterMetricsDto {
  @IsOptional()
  @IsEnum(TIMESTAMP_FILTER)
  timeperiod?: TIMESTAMP_FILTER;
}

export class SortClusterMetricsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof ClusterMetrics;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryClusterMetricsDto {
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
      ? plainToInstance(FilterClusterMetricsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterClusterMetricsDto)
  filters?: FilterClusterMetricsDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortClusterMetricsDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortClusterMetricsDto)
  sort?: SortClusterMetricsDto[] | null;
}
