import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateClusterWorkerMappingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  cluster: string;

  @ApiProperty({ example: 'Staging Adhoc' })
  @IsNotEmpty()
  worker: string;
}
