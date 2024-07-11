import { find, isObject, map } from 'lodash/fp';
import React, { useEffect, useState } from 'react';

import MuiChart from '@/components/MuiChart';
import { timePeriodFilters } from '@/constants';
import { getClusterFailureMetrics } from '@/data/cluster.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

interface ClusterFailureMetricsProps {
  cluster: ICluster;
  filter: TimestampFilter;
}

const ClusterFailureMetrics = (props: ClusterFailureMetricsProps) => {
  const clusterId = props.cluster.id;
  const [clusterFailureMetrics, setClusterFailureMetrics] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const formatChartValue = (value: number, id: string) => {
    if (id === 'query_failure_rate') {
      return value ? `${value}%` : '0.00%';
    }

    if (id === 'total_failed_queries' || id === 'top_failure_types') {
      return value ? `${value}` : '0';
    }

    // Convert timestamp to a readable date format
    if (id === 'timestamp') {
      const date = new Date(value);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    return value;
  };

  const onFetchClusterFailureMetricsSuccess = (data: any) => {
    let chartData: React.SetStateAction<any[]> = [];
    if (data && data.length) {
      chartData = map((chart) => {
        if (chart.chart === 'line') {
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
                valueFormatter: (val: number) =>
                  formatChartValue(val, chart.id),
                color: chart.color,
              },
            ],
          };
        }
        return {
          id: chart.id,
          title: chart.label,
          chart: 'bar',
          xAxis: [
            {
              data: chart.xAxis,
              valueFormatter: (val: number) =>
                formatChartValue(val, chart.scaleType),
              scaleType: 'band',
            },
          ],
          yAxis: [
            {
              scaleType: 'linear',
              labelFormatter: (val: number) => val.toString(),
              tickLabelStyle: {
                fontSize: '10px',
              },
            },
          ],
          series: [
            {
              id: chart.id,
              data: chart.yAxis,
              valueFormatter: (val: number) => formatChartValue(val, chart.id),
              color: chart.color,
              dataLabels: true,
            },
          ],
        };
      }, data);
    }
    setClusterFailureMetrics(chartData);
    setLoading(false);
  };

  const handleFetchClusterFailureMetrics = () => {
    if (loading || !clusterId) return false;
    setLoading(true);
    return getClusterFailureMetrics({
      clusterId,
      timeperiod: props.filter,
    }).then(onFetchClusterFailureMetricsSuccess, onError);
  };

  useEffect(() => {
    handleFetchClusterFailureMetrics();
    const filterConfig = find({ value: props.filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchClusterFailureMetrics,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [props.filter, clusterId]);

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!clusterFailureMetrics.length && (
        <MuiChart items={clusterFailureMetrics} title="Cluster Failure Rates" />
      )}
    </div>
  );
};

export default ClusterFailureMetrics;
