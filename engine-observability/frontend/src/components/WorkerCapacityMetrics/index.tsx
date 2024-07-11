import { find, isObject, map } from 'lodash/fp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import MuiChart from '@/components/MuiChart';
import { timePeriodFilters } from '@/constants';
import { getWorkerCapacityMetrics } from '@/data/worker.data';
import type { ErrorProps, TimestampFilter } from '@/types';

interface WorkerCapacityMetricsProps {
  workerId: string;
  filter: TimestampFilter;
}

const WorkerCapacityMetrics = (props: WorkerCapacityMetricsProps) => {
  const [workerCapacityMetrics, setWorkerCapacityMetrics] = useState<any[]>([]);
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

  const onFetchWorkerCapcityMetricsSuccess = (data: any) => {
    let chartData: React.SetStateAction<any[]> = [];
    if (data.charts && data.charts.length) {
      chartData = map((chart) => {
        return {
          id: chart.id,
          title: chart.label,
          chart: 'line',
          xAxis: [
            {
              data: data.xAxis,
              valueFormatter: (val: number) =>
                formatChartValue(val, data.xAxisType),
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
    setWorkerCapacityMetrics(chartData);
    setLoading(false);
  };

  const handleFetchWorkerCapcityMetrics = () => {
    if (loading) return false;
    setLoading(true);
    return getWorkerCapacityMetrics({
      workerId: props.workerId,
      timeperiod: props.filter,
    }).then(onFetchWorkerCapcityMetricsSuccess, onError);
  };

  useEffect(() => {
    handleFetchWorkerCapcityMetrics();
    const filterConfig = find({ value: props.filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchWorkerCapcityMetrics,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [props.filter, props.workerId]);

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!workerCapacityMetrics.length && (
        <MuiChart items={workerCapacityMetrics} title="Worker Capacity" />
      )}
    </div>
  );
};

export default WorkerCapacityMetrics;
