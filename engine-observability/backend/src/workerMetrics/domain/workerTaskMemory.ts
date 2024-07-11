import { Transform } from 'class-transformer';

export class WorkerTaskMemory {
  id: number;

  task: string;

  @Transform((val) => BigInt(val.value))
  used_memory: bigint;

  worker_id: string;

  inserted_at: Date;
}
