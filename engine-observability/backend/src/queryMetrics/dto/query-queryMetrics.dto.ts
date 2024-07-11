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
import { QueryMetrics } from '../domain/queryMetrics';

export class FilterQueryMetricsDto {
  @IsOptional()
  @IsEnum(TIMESTAMP_FILTER)
  timeperiod?: TIMESTAMP_FILTER;
}

export class SortQueryMetricsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof QueryMetrics;

  @ApiProperty()
  @IsString()
  order: 'DESC' | 'ASC';
}

export class QueryQueryMetricsDto {
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
      ? plainToInstance(FilterQueryMetricsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterQueryMetricsDto)
  filters?: FilterQueryMetricsDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortQueryMetricsDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortQueryMetricsDto)
  sort?: SortQueryMetricsDto | null;
}
