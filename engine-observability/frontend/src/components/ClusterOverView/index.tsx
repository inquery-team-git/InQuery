import { find, isObject } from 'lodash/fp';
import React, { useEffect, useState } from 'react';

import { timePeriodFilters } from '@/constants';
import { getClusterOverview } from '@/data/cluster.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

import ClusterOverViewComponent from './component';

interface IClusterOverview {
  title: string;
  total: string;
  increment: string;
}

interface ClusterOverViewProps {
  cluster: ICluster;
  filter: TimestampFilter;
  error: string;
  connected: boolean;
  handleFilterChange?: (value: TimestampFilter) => void;
}

const ClusterOverView = (props: ClusterOverViewProps) => {
  const { cluster, filter, connected, handleFilterChange } = props;
  const clusterId = cluster.id;
  const [clusterOverviews, setClusterOverviews] = useState<IClusterOverview[]>(
    []
  );
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchClusterOverviewSuccess = (data: any) => {
    setClusterOverviews(data);
    setLoading(false);
  };

  const handleFetchClusterOverview = () => {
    if (loading || !clusterId) return false;
    setLoading(true);
    return getClusterOverview(clusterId).then(
      onFetchClusterOverviewSuccess,
      onError
    );
  };

  useEffect(() => {
    setClusterOverviews([]);
    handleFetchClusterOverview();
    const filterConfig = find({ value: filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchClusterOverview,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [clusterId]);

  return (
    <ClusterOverViewComponent
      title={cluster.name}
      url={`http://${cluster.host}:${cluster.port}`}
      items={clusterOverviews}
      handleFilterChange={handleFilterChange}
      connected={connected}
    />
  );
};

export default ClusterOverView;
