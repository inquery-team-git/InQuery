import Decimal from 'decimal.js';

export class FailureMetrics {
  cluster_id: number;

  total_queries: number;

  failed_queries: number;

  failure_rate: Decimal;

  start_time: Date;

  end_time: Date;
}
