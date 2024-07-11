export interface ICluster {
  id: string;
  client_id: string;
  name: string;
  host: string;
  port: number;
  description: string | null;
  enabled: boolean;
  timestamp: Date;
}
