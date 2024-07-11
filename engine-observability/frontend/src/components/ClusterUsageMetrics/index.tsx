import { find, isObject, map } from 'lodash/fp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import MuiChart from '@/components/MuiChart';
import { timePeriodFilters } from '@/constants';
import { getClusterUsageMetrics } from '@/data/query.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

interface ClusterUsageMetricsProps {
  cluster: ICluster;
  filter: TimestampFilter;
}

const ClusterUsageMetrics = (props: ClusterUsageMetricsProps) => {
  const clusterId = props.cluster.id;
  const [clusterUsageMetrics, setClusterUsageMetrics] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const formatChartValue = (value: number, id: string) => {
    if (id === 'cpu_utilization') {
      return value ? `${value}%` : '0.00%';
    }
    if (id === 'memory_utilization') {
      return value ? `${value.toFixed(2)}%` : '0.00%';
    }
    if (id === 'timestamp') {
      return value ? moment(value).format('LT') : '';
    }
    if (id === 'cpu_time') {
      return value ? `${value}h` : '0h';
    }
    if (id === 'gb_scanned') {
      return value ? `${value}gb` : '0gb';
    }
    return value;
  };

  const onFetchClusterUsageMetricsSuccess = (charts: any) => {
    let chartData: React.SetStateAction<any[]> = [];
    if (charts && charts.length) {
      chartData = map((chart) => {
        return {
          id: chart.id,
          title: chart.label,
          chart: chart.chart,
          xAxis: [
            {
              data: chart.xAxis,
              scaleType: chart.scaleType,
            },
          ],
          series: [
            {
              data: chart.yAxis,
              valueFormatter: (val: number) => formatChartValue(val, chart.id),
              color: chart.color,
            },
          ],
        };
      }, charts);
    }
    setClusterUsageMetrics(chartData);
    setLoading(false);
  };

  const handleFetchClusterUsageMetrics = () => {
    if (loading || !clusterId) return false;
    setLoading(true);
    return getClusterUsageMetrics({
      clusterId,
      timeperiod: props.filter,
    }).then(onFetchClusterUsageMetricsSuccess, onError);
  };

  useEffect(() => {
    handleFetchClusterUsageMetrics();
    const filterConfig = find({ value: props.filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchClusterUsageMetrics,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [props.filter, clusterId]);

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!clusterUsageMetrics.length && (
        <MuiChart items={clusterUsageMetrics} title="Cluster Usage" />
      )}
    </div>
  );
};

export default ClusterUsageMetrics;
