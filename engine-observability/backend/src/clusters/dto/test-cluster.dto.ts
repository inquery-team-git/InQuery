import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { CreateClustersDto } from './create-clusters.dto';

export class TestClusterConnectionDto extends PartialType(CreateClustersDto) {
  @ApiPropertyOptional({ example: '127.0.0.1' })
  @IsOptional()
  @IsString()
  @Matches(/^((\d{1,3}\.){3}\d{1,3}|trino)$/) // Validate IPv4 format
  host: string;

  @ApiPropertyOptional({ example: '8080' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  port: number;
}
