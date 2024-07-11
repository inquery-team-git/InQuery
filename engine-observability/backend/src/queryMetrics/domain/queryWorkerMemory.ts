import { Transform } from 'class-transformer';

export class WorkerTaskMemory {
  task: string;

  @Transform((val) => BigInt(val.value))
  used_memory: bigint;

  worker_id: string;

  inserted_at: Date;
}
