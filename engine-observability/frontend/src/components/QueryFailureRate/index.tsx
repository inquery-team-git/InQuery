// frontend/src/components/QueryFailureRate/index.tsx
import React, { useEffect, useState } from 'react';

import { getQueryFailureRate } from '@/data/cluster.data'; // Assume this function exists
import type { ICluster } from '@/types';

interface QueryFailureRateProps {
  cluster: ICluster;
}

const QueryFailureRate = ({ cluster }: QueryFailureRateProps) => {
  const [failureRate, setFailureRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cluster.id) return;

    setLoading(true);
    getQueryFailureRate(cluster.id)
      .then((rate: any) => {
        setFailureRate(rate);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message);
        setLoading(false);
      });
  }, [cluster.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Query Failure Rate</h3>
      <p>{failureRate !== null ? `${failureRate}%` : 'No data available'}</p>
    </div>
  );
};

export default QueryFailureRate;
