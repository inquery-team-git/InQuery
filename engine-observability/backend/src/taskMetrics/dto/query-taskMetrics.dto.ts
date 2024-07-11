import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { TaskMetrics } from '../domain/taskMetrics';

export class FilterTaskMetricsDto {
  @IsNotEmpty()
  @IsInt()
  timeperiod?: number;
}

export class SortTaskMetricsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof TaskMetrics;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTaskMetricsDto {
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
      ? plainToInstance(FilterTaskMetricsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterTaskMetricsDto)
  filters?: FilterTaskMetricsDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortTaskMetricsDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTaskMetricsDto)
  sort?: SortTaskMetricsDto[] | null;
}
