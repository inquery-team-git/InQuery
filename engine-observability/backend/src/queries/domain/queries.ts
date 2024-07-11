import Decimal from 'decimal.js';

export class Query {
  query_id: string;

  query: string;

  query_state: string;

  user: string;

  source: string | null;

  catalog: string | null;

  schema: string | null;

  cumulative_memory: Decimal;

  cpu_time_millis: bigint;

  stage_info_json: string | null;
}
