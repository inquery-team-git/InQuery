import { Transform } from 'class-transformer';
import Decimal from 'decimal.js';
import { Cluster } from 'src/clusters/domain/clusters';

export class WorkerMetrics {
  id: number;

  cluster: Cluster;

  process_cpu_load: Decimal;

  system_cpu_load: Decimal;

  processor_count: number;

  @Transform((val) => BigInt(val.value))
  heap_memory_used: bigint;

  @Transform((val) => BigInt(val.value))
  heap_memory_available: bigint;

  @Transform((val) => BigInt(val.value))
  free_memory_bytes: bigint;

  system_uptime: Decimal;

  worker_id: string;

  insert_time: Date;

  @Transform((val) => BigInt(val.value))
  num_tasks: bigint;
}
