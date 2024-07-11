import { find, isObject, map } from 'lodash/fp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import MuiChart from '@/components/MuiChart';
import { timePeriodFilters } from '@/constants';
import { getClusterCapacityMetrics } from '@/data/cluster.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

interface ClusterCapacityMetricsProps {
  cluster: ICluster;
  filter: TimestampFilter;
}

const ClusterCapacityMetrics = (props: ClusterCapacityMetricsProps) => {
  const clusterId = props.cluster.id;
  const [clusterCapacityMetrics, setClusterCapacityMetrics] = useState<any[]>(
    []
  );
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

  const onFetchClusterCapcityMetricsSuccess = (data: any) => {
    let chartData: React.SetStateAction<any[]> = [];
    if (data.charts && data.charts.length) {
      chartData = map((chart) => {
        return {
          id: chart.id,
          title: chart.label,
          chart: 'line',
          showNoData: !chart.metrics || chart.metrics.length === 0,
          xAxis: [
            {
              data: chart.xAxis,
              valueFormatter: (val: number) =>
                formatChartValue(val, chart.xAxisType),
              scaleType: 'point',
            },
          ],
          series: [
            {
              id: chart.id,
              data: chart.metrics,
              area: true,
              curve: chart.chart,
              valueFormatter: (val: number) => formatChartValue(val, chart.id),
              color: chart.color,
            },
          ],
        };
      }, data.charts);
    }
    setClusterCapacityMetrics(chartData);
    setLoading(false);
  };

  const handleFetchClusterCapcityMetrics = () => {
    if (loading || !clusterId) return false;
    setLoading(true);
    return getClusterCapacityMetrics({
      clusterId,
      timeperiod: props.filter,
    }).then(onFetchClusterCapcityMetricsSuccess, onError);
  };

  useEffect(() => {
    handleFetchClusterCapcityMetrics();
    const filterConfig = find({ value: props.filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchClusterCapcityMetrics,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [props.filter, clusterId]);

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!clusterCapacityMetrics.length && (
        <MuiChart items={clusterCapacityMetrics} title="Cluster Capacity" />
      )}
    </div>
  );
};

export default ClusterCapacityMetrics;
