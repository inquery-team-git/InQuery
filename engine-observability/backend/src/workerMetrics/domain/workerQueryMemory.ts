import { Transform } from 'class-transformer';

export class WorkerQueryMemory {
  id: number;

  query_id: string;

  @Transform((val) => BigInt(val.value))
  used_memory: bigint;

  worker_id: string;

  inserted_at: Date;
}
