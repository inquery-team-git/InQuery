import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { getTime } from 'date-fns';
import Decimal from 'decimal.js';
import _ from 'lodash/fp';
import { Cluster } from 'src/clusters/domain/clusters';
import {
  TIMESTAMP_FILTER,
  calculateAverageLatencyBetweenTimestamps,
  generateTimestamps,
  getClosetsItemByTimestamp,
} from 'src/utils/helper';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { WorkerMetricsService } from '../workerMetrics/workerMetrics.service';
import { ClusterMetricsService } from './clusterMetrics.service';
import { ClusterMetrics } from './domain/clusterMetrics';
import { FailureMetrics } from './domain/failureMetrics';
import { QueryClusterMetricsDto } from './dto/query-clusterMetrics.dto';
import { LatencyMetrics } from './domain/latencyMetrics';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('ClusterMetrics')
@Controller({
  path: 'cluster',
  version: '1',
})
export class ClusterMetricsController {
  constructor(
    private readonly clusterMetricsService: ClusterMetricsService,
    private readonly workerMetricsService: WorkerMetricsService,
  ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryClusterMetricsDto,
  ): Promise<InfinityPaginationResultType<ClusterMetrics>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.clusterMetricsService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/capacity-metrics/:cluster')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async clusterCapacity(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryClusterMetricsDto,
  ): Promise<any> {
    const timestamps: any[] = generateTimestamps(
      query.filters?.timeperiod || TIMESTAMP_FILTER.last_minute,
    );
    const results = await this.clusterMetricsService.getClusterCapacityMetrics(
      cluster,
      timestamps,
    );

    const cpuUsageMetrics: number[] = [];
    const memoryUsageMetrics: number[] = [];
    const runningNodesMetrics: number[] = [];
    const xAxisMetrics: number[] = [];

    const calculateCPUUsage = (usedCPU: any, totalCPU: any) => {
      return parseFloat(((usedCPU / totalCPU) * 100).toFixed(2));
    };

    if (results.length) {
      const finalResults: ClusterMetrics[] = _.map((timestamp) => {
        return getClosetsItemByTimestamp(timestamp, results);
      }, timestamps);

      _.forEach((r: ClusterMetrics) => {
        cpuUsageMetrics.push(calculateCPUUsage(r.used_cpu, r.total_cpu));
        memoryUsageMetrics.push(
          (Number(r.used_memory) * 100.0) / Number(r.total_memory),
        );
        runningNodesMetrics.push(r.worker_count);
      }, finalResults);
    }

    _.forEach((r) => {
      xAxisMetrics.push(Math.round(getTime(r)));
    }, timestamps);

    const data = {
      charts: [
        {
          xAxis: xAxisMetrics,
          xAxisLabel: 'Time',
          xAxisType: 'timestamp',
          title: 'Cluster Capacity',
          chart: 'line',
          id: 'cpu_utilization',
          label: 'CPU Utilization',
          color: 'orange',
          max: _.max(cpuUsageMetrics),
          min: _.min(cpuUsageMetrics),
          metrics: cpuUsageMetrics,
        },
        {
          xAxis: xAxisMetrics,
          xAxisLabel: 'Time',
          xAxisType: 'timestamp',
          title: 'Cluster Capacity',
          chart: 'line',
          id: 'memory_utilization',
          label: 'Memory Utilization',
          color: 'red',
          max: _.max(memoryUsageMetrics),
          min: _.min(memoryUsageMetrics),
          metrics: memoryUsageMetrics,
        },
        {
          xAxis: xAxisMetrics,
          xAxisLabel: 'Time',
          xAxisType: 'timestamp',
          title: 'Cluster Capacity',
          chart: 'line',
          id: 'running_nodes',
          label: 'Running Nodes',
          color: 'gray',
          max: _.max(runningNodesMetrics),
          min: _.min(runningNodesMetrics),
          metrics: runningNodesMetrics,
        },
      ],
    };
    return data;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/failure-metrics/:cluster')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async clusterFailureMetrics(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryClusterMetricsDto,
  ): Promise<any> {
    const timestamps: any[] = generateTimestamps(
      query.filters?.timeperiod || TIMESTAMP_FILTER.last_minute,
    );

    const failureMetrics =
      await this.clusterMetricsService.getClusterFailureRates(
        cluster,
        timestamps,
      ); // FailureMetrics[]

    const failureTypes =
      await this.clusterMetricsService.getClusterFailureTypes(
        cluster,
        timestamps,
      );

    const totalFailedQueries: number[] = [];
    const queryFailureRate: Decimal[] = [];
    const xAxisMetrics: number[] = [];

    if (failureMetrics.length) {
      _.forEach((f: FailureMetrics) => {
        totalFailedQueries.push(f.failed_queries);
        queryFailureRate.push(f.failure_rate);
        // xAxisMetrics.push(Math.round(getTime(f.start_time)));
      }, failureMetrics);
    }

    _.forEach((r) => {
      xAxisMetrics.push(Math.round(getTime(r)));
    }, timestamps);

    const clusterQueryFailureData: any = [];
    clusterQueryFailureData.push({
      chart: 'line',
      id: 'query_failure_rate',
      title: 'Cluster Failure Types',
      label: 'Query Failure Rate',
      color: 'orange',
      max: _.max(queryFailureRate),
      min: _.min(queryFailureRate),
      metrics: queryFailureRate,
      xAxis: xAxisMetrics,
      xAxisLabel: 'Time',
      xAxisType: 'timestamp',
    });

    clusterQueryFailureData.push({
      chart: 'line',
      id: 'total_failed_queries',
      label: 'Total Failed Queries',
      color: 'orange',
      max: _.max(totalFailedQueries),
      min: _.min(totalFailedQueries),
      metrics: totalFailedQueries,
      xAxis: xAxisMetrics,
      xAxisLabel: 'Time',
      xAxisType: 'timestamp',
    });

    clusterQueryFailureData.push({
      id: 'top_failure_types',
      label: 'Top Failure Types',
      chart: 'bar',
      scaleType: 'band',
      color: 'orange',
      xAxis: failureTypes.length ? failureTypes.map((ft) => ft.error_type) : [],
      yAxis: failureTypes.length
        ? failureTypes.map((ft) => parseInt(ft.error_type_count))
        : [],
    });
    return clusterQueryFailureData;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/latency-metrics/:cluster')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async clusterLatencyMetrics(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryClusterMetricsDto,
  ): Promise<any> {
    const timestamps: any[] = generateTimestamps(
      query.filters?.timeperiod || TIMESTAMP_FILTER.last_minute,
    );

    const queryLatencies: LatencyMetrics[] =
      await this.clusterMetricsService.getClusterLatency(cluster, timestamps);

    const [latencyBars] =
      await this.clusterMetricsService.getClusterLatencyBars(
        cluster,
        timestamps,
      );

    let latencyMetrics: number[] = [];
    const xAxisMetrics: any[] = [];

    if (queryLatencies.length) {
      latencyMetrics = calculateAverageLatencyBetweenTimestamps(
        queryLatencies,
        timestamps,
      );
    }

    _.forEach((r) => {
      xAxisMetrics.push(Math.round(getTime(r)));
    }, timestamps);

    const clusterLatencyData: any = [];
    clusterLatencyData.push({
      chart: 'line',
      id: 'cluster_latency_over_time',
      label: 'Cluster Latency Over Time',
      color: 'orange',
      max: _.max(latencyMetrics),
      min: _.min(latencyMetrics),
      metrics: latencyMetrics,
      xAxis: xAxisMetrics,
      xAxisLabel: 'Time',
      xAxisType: 'timestamp',
    });

    let totalQueries = 0;
    if (latencyBars) {
      totalQueries = latencyBars.total_queries || 0;
      delete latencyBars.total_queries;
    }
    clusterLatencyData.push({
      id: 'query_latency_metrics',
      label: `Query Latency Metrics (${totalQueries} queries)`,
      chart: 'bar',
      scaleType: 'band',
      color: 'orange',
      xAxis: _.isEmpty(latencyBars)
        ? []
        : Object.keys(latencyBars).map((v) => _.startCase(v)),
      yAxis: _.isEmpty(latencyBars)
        ? []
        : Object.values(latencyBars).map((v) => parseFloat(v)),
    });
    return clusterLatencyData;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/capacity-overview/:cluster')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async clusterOverview(
    @Param('cluster') cluster: Cluster['id'],
  ): Promise<any> {
    const [clusterUptime] =
      await this.clusterMetricsService.getClusterUpTime(cluster);
    const [maxPodCPU] = await this.workerMetricsService.getMaxPodCPU(cluster);

    return [
      {
        title: 'Uptime',
        total: clusterUptime
          ? `${(clusterUptime.uptime / (60 * 60)).toFixed(2)}h`
          : '0h',
      },
      // {
      //   title: 'Average Workers',
      //   total: '3',
      // },
      {
        title: 'Max Pod CPU',
        total:
          maxPodCPU && maxPodCPU.max ? `${maxPodCPU.max.toFixed(2)}%` : '0%',
      },
    ];
  }
}
