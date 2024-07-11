import { Transform } from 'class-transformer';
import Decimal from 'decimal.js';
import { Cluster } from 'src/clusters/domain/clusters';

export class ClusterMetrics {
  id: number;

  cluster: Cluster;

  used_cpu: Decimal;

  total_cpu: Decimal;

  @Transform((val) => BigInt(val.value))
  used_memory: bigint;

  @Transform((val) => BigInt(val.value))
  total_memory: bigint;

  worker_count: number;

  @Transform((val) => BigInt(val.value))
  uptime: bigint;

  timestamp: Date;
}
