'use client';

/* eslint-disable no-param-reassign */
import type { BarChartProps } from '@mui/x-charts/BarChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';

import type { StageMetricsDict } from '@/types';

const chartSettingsH: Partial<BarChartProps> = {
  yAxis: [{ scaleType: 'band', dataKey: 'stageId' }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
  slotProps: {
    legend: {
      direction: 'row',
      position: { vertical: 'bottom', horizontal: 'middle' },
      padding: -5,
    },
  },
};

interface ExecutionMetricsProps {
  metrics: StageMetricsDict[];
}

export default function ExecutionMetrics(props: ExecutionMetricsProps) {
  const { metrics = [] } = props;

  const plotData = React.useMemo(() => {
    const minStartTime = moment.min(
      metrics.map((stage) => moment(stage.startTime))
    );

    const processedStages = metrics.map((stage) => ({
      stageId: stage.stage,
      startSecs: moment(stage.startTime).diff(minStartTime) / 1000,
      endSecs: moment(stage.endTime).diff(minStartTime) / 1000,
      realStartSecs: moment(stage.realStartTime).diff(minStartTime) / 1000,
      duration: moment(stage.endTime).diff(moment(stage.startTime)) / 1000,
      real_duration:
        moment(stage.endTime).diff(moment(stage.realStartTime)) / 1000,
    }));

    processedStages.sort((a, b) => a.realStartSecs - b.realStartSecs);

    const dataset = processedStages.map((pStage) => {
      let queuedTime = 0;
      if (pStage.startSecs === pStage.realStartSecs) {
        queuedTime = 0;
      } else if (pStage.startSecs + pStage.duration >= pStage.realStartSecs) {
        queuedTime =
          _.min([pStage.realStartSecs - pStage.startSecs, pStage.duration]) ||
          0;
      } else {
        queuedTime = pStage.duration;
      }
      return {
        queuedTime,
        blockTime: pStage.startSecs,
        elapsedTime: pStage.real_duration,
        stageId: pStage.stageId,
      };
    });
    return dataset;
  }, [metrics]);

  if (!metrics.length) return null;
  return (
    <BarChart
      series={[
        {
          dataKey: 'blockTime',
          label: 'Block Time',
          layout: 'horizontal',
          stack: 'stack',
          valueFormatter: (value) => `${value} sec`,
        },
        {
          dataKey: 'queuedTime',
          label: 'Queue Time',
          layout: 'horizontal',
          stack: 'stack',
          valueFormatter: (value) => `${value} sec`,
        },
        {
          dataKey: 'elapsedTime',
          label: 'Elapsed Time',
          layout: 'horizontal',
          stack: 'stack',
          valueFormatter: (value) => `${value} sec`,
        },
      ]}
      dataset={plotData}
      {...chartSettingsH}
    />
  );
}
