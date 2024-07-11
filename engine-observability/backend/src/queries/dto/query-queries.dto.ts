import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Query } from '../domain/queries';

export class FilterQueriesDto {
  @IsOptional()
  query_id?: string;

  @IsOptional()
  query_state?: string;

  @IsOptional()
  source?: string;

  @IsOptional()
  user?: string;

  @IsOptional()
  catalog?: string;
}

export class SortQueriesDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Query;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryQueriesDto {
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
    value ? plainToInstance(FilterQueriesDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterQueriesDto)
  filters?: FilterQueriesDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortQueriesDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortQueriesDto)
  sort?: SortQueriesDto[] | null;
}
