import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  HttpException,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import _ from 'lodash/fp';
import { getTime } from 'date-fns';
import { QueryWorkerMetricsDto } from './dto/query-workerMetrics.dto';
import { WorkerMetricsService } from './workerMetrics.service';
import {
  generateTimestamps,
  getClosetsItemByTimestamp,
  TIMESTAMP_FILTER,
} from 'src/utils/helper';
import { Cluster } from 'src/clusters/domain/clusters';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('WorkerMetrics')
@Controller({
  path: 'worker',
  version: '1',
})
export class WorkerMetricsController {
  constructor(private readonly workerMetricsService: WorkerMetricsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/most-active/:cluster')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async mostActiveWorkers(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryWorkerMetricsDto,
  ): Promise<any> {
    const workers = await this.workerMetricsService.getMostActiveWorkers({
      cluster_id: cluster,
      order: query.sort?.order || 'DESC',
      orderBy: query.sort?.orderBy || 'mem_usage',
    });

    return workers;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/capacity-metrics')
  @HttpCode(HttpStatus.OK)
  async clusterCapacity(@Query() query: QueryWorkerMetricsDto): Promise<any> {
    if (!query.filters?.workerId) {
      throw new HttpException('Worker Id is required', HttpStatus.BAD_REQUEST);
    }
    const timestamps = generateTimestamps(
      query.filters?.timeperiod || TIMESTAMP_FILTER.last_minute,
    );
    const results = await this.workerMetricsService.getWorkerCpuAndMemoryUsage(
      query.filters?.workerId,
      timestamps,
    );

    const cpuUsageMetrics: number[] = [];
    const memoryUsageMetrics: number[] = [];
    const runningTasks: number[] = [];
    const xAxisMetrics: number[] = [];

    if (results.length) {
      const finalResults: {
        cpu_usage: number;
        mem_usage: string;
        num_tasks: number;
      }[] = _.map((timestamp) => {
        return getClosetsItemByTimestamp(timestamp, results);
      }, timestamps);

      _.forEach(
        (r: { cpu_usage: number; mem_usage: string; num_tasks: number }) => {
          cpuUsageMetrics.push(parseFloat(r.cpu_usage.toFixed(2)));
          memoryUsageMetrics.push(
            parseFloat(parseFloat(r.mem_usage).toFixed(2)),
          );
          runningTasks.push(r.num_tasks);
        },
        finalResults,
      );
    }

    _.forEach((r) => {
      xAxisMetrics.push(Math.round(getTime(r)));
    }, timestamps);

    const data = {
      xAxis: xAxisMetrics,
      xAxisLabel: 'Time',
      xAxisType: 'timestamp',
      title: 'Cluster Capacity',
      charts: [
        {
          chart: 'line',
          id: 'cpu_utilization',
          label: 'CPU Utilization',
          color: 'orange',
          max: _.max(cpuUsageMetrics),
          min: _.min(cpuUsageMetrics),
          metrics: cpuUsageMetrics,
        },
        {
          chart: 'line',
          id: 'memory_utilization',
          label: 'Memory Utilization',
          color: 'red',
          max: _.max(memoryUsageMetrics),
          min: _.min(memoryUsageMetrics),
          metrics: memoryUsageMetrics,
        },
        {
          chart: 'line',
          id: 'running_tasks',
          label: 'Running Tasks',
          color: 'gray',
          max: _.max(runningTasks),
          min: _.min(runningTasks),
          metrics: runningTasks,
        },
      ],
    };
    return data;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/most-active-queries')
  @HttpCode(HttpStatus.OK)
  async mostActiveQueriesInWorker(
    @Query() query: QueryWorkerMetricsDto,
  ): Promise<any> {
    if (!query.filters?.workerId) {
      throw new HttpException('Worker Id is required', HttpStatus.BAD_REQUEST);
    }
    const workers =
      await this.workerMetricsService.getMostActiveQueriesInWorker({
        workerId: query.filters?.workerId,
        order: query.sort?.order || 'DESC',
        orderBy: query.sort?.orderBy || 'used_memory',
      });

    return workers;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/most-active-tasks')
  @HttpCode(HttpStatus.OK)
  async mostActiveTasksInWorker(
    @Query() query: QueryWorkerMetricsDto,
  ): Promise<any> {
    if (!query.filters?.workerId) {
      throw new HttpException('Worker Id is required', HttpStatus.BAD_REQUEST);
    }
    const workers = await this.workerMetricsService.getMostActiveTasksInWorker({
      workerId: query.filters?.workerId,
      order: query.sort?.order || 'DESC',
      orderBy: query.sort?.orderBy || 'used_memory',
    });

    return workers;
  }
}
