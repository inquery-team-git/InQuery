import { find, isNumber, isObject, map } from 'lodash/fp';
import React, { useEffect, useState } from 'react';

import MuiChart from '@/components/MuiChart';
import { timePeriodFilters } from '@/constants';
import { getClusterLatencyMetrics } from '@/data/cluster.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

interface ClusterLatencyMetricsProps {
  cluster: ICluster;
  filter: TimestampFilter;
}

const ClusterLatencyMetrics = (props: ClusterLatencyMetricsProps) => {
  const clusterId = props.cluster.id;
  const [clusterLatencyMetrics, setClusterLatencyMetrics] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const formatChartValue = (value: number, id: string) => {
    // Convert timestamp to a readable date format
    if (id === 'timestamp') {
      const date = new Date(value);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    return isNumber(value) ? value.toFixed(2) : value;
  };

  const onFetchClusterLatencyMetricsSuccess = (data: any) => {
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
            yAxis: [
              {
                scaleType: 'linear',
                labelFormatter: (val: number) => val.toString(),
                tickLabelStyle: {
                  fontSize: '9px',
                },
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
                fontSize: '9px',
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
    setClusterLatencyMetrics(chartData);
    setLoading(false);
  };

  const handleFetchClusterLatencyMetrics = () => {
    if (loading || !clusterId) return false;
    setLoading(true);
    return getClusterLatencyMetrics({
      clusterId,
      timeperiod: props.filter,
    }).then(onFetchClusterLatencyMetricsSuccess, onError);
  };

  useEffect(() => {
    handleFetchClusterLatencyMetrics();
    const filterConfig = find({ value: props.filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchClusterLatencyMetrics,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [props.filter, clusterId]);

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!clusterLatencyMetrics.length && (
        <MuiChart items={clusterLatencyMetrics} title="Latency Metrics" />
      )}
    </div>
  );
};

export default ClusterLatencyMetrics;
