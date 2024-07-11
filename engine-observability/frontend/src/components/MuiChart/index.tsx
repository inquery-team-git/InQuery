'use client';

import { Grid } from '@mui/material';
import type { AxisConfig } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import type { MakeOptional } from '@mui/x-charts/models/helpers';
import React, { Fragment } from 'react';
import { CardTitle, Row } from 'reactstrap';

interface ChartProps {
  title: string;
  xAxis: MakeOptional<AxisConfig, 'id'>[] | undefined;
  series: Record<string, any>[];
  showNoData: boolean;
  yAxis?: MakeOptional<AxisConfig, 'id'>[] | undefined;
}

const MuiBarChart = (props: ChartProps) => {
  return (
    <Grid
      item
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        minWidth: '397px',
        overflowWrap: 'break-word',
        padding: '15px 20px',
        borderRadius: '15px',
        background: 'border-box rgb(255, 255, 255)',
        minHeight: '100px',
        marginRight: '10px',
        marginTop: '15px',
        position: 'relative',
      }}
      xs={12}
      md={5.5}
      lg={3.8}
    >
      <div style={{ height: '250px', width: '100%' }}>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {props.title}
            </CardTitle>
          </div>
        </Row>
        {!!props.xAxis?.length && !!props.xAxis[0]?.data?.length ? (
          <BarChart
            xAxis={props.xAxis}
            series={props.series}
            yAxis={props.yAxis}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '40%',
            }}
          >
            No Data
          </div>
        )}
      </div>
    </Grid>
  );
};

const MuiLinearChart = (props: ChartProps) => {
  return (
    <Grid
      item
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        minWidth: '397px',
        overflowWrap: 'break-word',
        padding: '15px 20px',
        borderRadius: '15px',
        background: 'border-box rgb(255, 255, 255)',
        minHeight: '100px',
        marginRight: '10px',
        marginTop: '15px',
        position: 'relative',
      }}
      xs={12}
      md={5.5}
      lg={3.8}
    >
      <div style={{ height: '250px', width: '100%' }}>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {props.title}
            </CardTitle>
          </div>
        </Row>
        {/* {props.showNoData && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '40%',
            }}
          >
            No Data
          </div>
        )} */}

        <LineChart
          xAxis={props.xAxis}
          series={props.series}
          yAxis={props.yAxis}
          sx={{
            '& .MuiAreaElement-series-cpu_utilization': {
              fill: "url('#cpuGradient')",
            },
            '& .MuiAreaElement-series-memory_utilization': {
              fill: "url('#memoryGradient')",
            },
            '& .MuiAreaElement-series-running_nodes': {
              fill: "url('#nodesGradient')",
            },
            '& .MuiAreaElement-series-running_tasks': {
              fill: "url('#nodesGradient')",
            },
          }}
          grid={{ vertical: true, horizontal: true }}
        >
          <defs>
            <linearGradient id="cpuGradient" gradientTransform="rotate(90)">
              <stop offset="2%" stopColor="orange" />
              <stop offset="98%" stopColor="white" />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="memoryGradient" gradientTransform="rotate(90)">
              <stop offset="2%" stopColor="red" />
              <stop offset="98%" stopColor="white" />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="nodesGradient" gradientTransform="rotate(90)">
              <stop offset="2%" stopColor="gray" />
              <stop offset="98%" stopColor="white" />
            </linearGradient>
          </defs>
        </LineChart>
      </div>
    </Grid>
  );
};

type ChartDataProps = {
  id: string;
  title: string;
  chart: string;
  xAxis: Record<string, any>[];
  series: Record<string, any>[];
  showNoData: boolean;
  yAxis?: Record<string, any>[];
};

interface ClusterProps {
  title?: string;
  items: ChartDataProps[];
}

function MuiChart(props: ClusterProps) {
  const { title, items = [] } = props;
  if (!items.length) return null;
  const modifyXAxisSettings = (xAxis: any[], chart: string) => {
    return xAxis.map((axis: any) => ({
      ...axis,
      // Add or modify xAxis settings here
      // Example: Adding a label rotation setting
      tickLabelStyle: {
        ...axis.tickLabelStyle,
        fontSize: chart === 'line' ? '8px' : '10px',
        transform:
          chart === 'line' ? 'translate(-10px, 10px) rotate(-50deg)' : 'none', // Rotate labels by -45 degrees
        // Include other style adjustments as needed
      },
      // Any other modifications you need
    }));
  };
  return (
    <Fragment>
      {title && <h2>{title}</h2>}
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          width: '100%',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        {items.map((item) => {
          const modifiedXAxis = modifyXAxisSettings(item.xAxis, item.chart);

          switch (item.chart) {
            case 'line':
              return (
                <MuiLinearChart
                  title={item.title}
                  xAxis={modifiedXAxis}
                  yAxis={item.yAxis}
                  series={item.series.map((seriesItem) => ({
                    ...seriesItem,
                    curve: 'monotoneX', // Ensure each series uses the "monotoneX" curve
                    showMark: () => false, // Hide all marks
                    connectNulls: true,
                  }))}
                  showNoData={item.showNoData}
                  key={item.id}
                />
              );
            case 'bar':
              return (
                <MuiBarChart
                  title={item.title}
                  xAxis={modifiedXAxis}
                  series={item.series}
                  key={item.id}
                  showNoData={item.showNoData}
                  yAxis={item.yAxis}
                />
              );
            default:
              return null;
          }
        })}
      </Grid>
    </Fragment>
  );
}

export default MuiChart;
