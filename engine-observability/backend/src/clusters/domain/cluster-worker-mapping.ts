import { Cluster } from './clusters';

export class ClusterWorkerMapping {
  id: number;

  cluster: Cluster;

  worker: string;

  timestamp: Date;
}
