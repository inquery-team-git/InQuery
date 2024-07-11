import Decimal from 'decimal.js';
import { Cluster } from 'src/clusters/domain/clusters';

export class QueryMetrics {
  queryid: string;

  cluster: Cluster;

  createtime: Date;
  totalcputime: Decimal;
  cumulativeusermemory: Decimal;
  state: string;
  sessionuser: string;
  sessionsource: string;
  inserted_at: Date;
}
