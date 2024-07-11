import { IsUUID } from 'class-validator';

export class Cluster {
  @IsUUID()
  id: string;

  client_id: string;

  name: string;

  host: string;

  port: string;

  description: string | null;

  enabled: boolean;

  deleted: boolean;

  timestamp: Date;
}
