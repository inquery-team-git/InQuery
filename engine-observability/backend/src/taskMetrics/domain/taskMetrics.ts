import Decimal from 'decimal.js';

export class TaskMetrics {
  task_names: string;
  elapsed: string;
  queued: string;
  start: Date;
  end_time: Date;
  node: string;
  drivers: number;
  total_scheduled_time: string;
  total_cpu_time: string;
  total_blocked_time: string;
  processed_input_data_size: string;
  processed_input_positions: number;
  time_difference_seconds: Decimal;
  total_time_stage: Decimal;
  max_child_end: Date;
  inserted_at: Date;
}
