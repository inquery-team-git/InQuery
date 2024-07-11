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

export class FilterWorkerMetricsDto {
  @IsOptional()
  @IsEnum(TIMESTAMP_FILTER)
  timeperiod?: TIMESTAMP_FILTER;

  @IsOptional()
  workerId?: string;

  @IsOptional()
  cluster_id?: string;
}

export class SortWorkerMetricsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiProperty()
  @IsString()
  order: 'DESC' | 'ASC';
}

export class QueryWorkerMetricsDto {
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
      ? plainToInstance(FilterWorkerMetricsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterWorkerMetricsDto)
  filters?: FilterWorkerMetricsDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortWorkerMetricsDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortWorkerMetricsDto)
  sort?: SortWorkerMetricsDto | null;
}
