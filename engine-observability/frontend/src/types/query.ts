export type QueryOverViewItem = {
  title: string;
  total: string;
  increment?: string;
  decrement?: string;
};

export type QueryExecution = {
  text: string;
  value: string;
};

export interface StageMetricsDict {
  stage: string;
  startTime: Date;
  realStartTime: Date;
  endTime: Date;
}

export interface IQuery {
  query_id: string;
  query: string;
  query_state: string;
  plan: string;
  stage_info_json: Record<string, any>;
  stage_info: Record<string, any>;
  execution_metrics: StageMetricsDict[];
  user: string;
  source: string | null;
  catalog: string | null;
  schema: string | null;
  cpu_time_millis: bigint;
  peak_memory_bytes: string;
  total_bytes: string;
  total_rows: string;
  output_bytes: string;
  output_rows: string;
  cumulative_memory: number;
  execution_time_millis: string;
  error_code: string;
  error_type: string;
  failure_message: string;
  overview: QueryOverViewItem[];
  execution: QueryExecution[];
  submission_time: string;
}

export interface QueryRecommendation {
  flag: string;
  recommendation: string;
}
