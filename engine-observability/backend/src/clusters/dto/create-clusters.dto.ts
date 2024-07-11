import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateClustersDto {
  @ApiProperty({ example: 'Staging Adhoc' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '127.0.0.1' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^((\d{1,3}\.){3}\d{1,3}|trino)$/) // Validate IPv4 format
  host: string;

  @ApiProperty({ example: '8080' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(65535)
  port: number;

  @ApiProperty({ example: 'Trino cluster for staging Adhoc analysis' })
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: true })
  @IsOptional()
  enabled: boolean;
}
