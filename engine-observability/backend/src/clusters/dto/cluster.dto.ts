import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClusterDto {
  @ApiProperty()
  @IsString()
  id: string;
}
