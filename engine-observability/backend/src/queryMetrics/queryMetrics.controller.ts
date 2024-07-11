import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryQueryMetricsDto } from 'src/queryMetrics/dto/query-queryMetrics.dto';
import { TIMESTAMP_FILTER, generateTimestamps } from 'src/utils/helper';
import { QueryMetricsService } from './queryMetrics.service';
import { Cluster } from 'src/clusters/domain/clusters';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('QueryMetrics')
@Controller({
  path: 'query',
  version: '1',
})
export class QueryMetricsController {
  constructor(private readonly queryMetricsService: QueryMetricsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/usage-metrics/:cluster')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'cluster',
    type: String,
    required: true,
  })
  async usageMetricsByUser(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryQueryMetricsDto,
  ): Promise<any> {
    const timestamps: any[] = generateTimestamps(
      query.filters?.timeperiod || TIMESTAMP_FILTER.last_minute,
    );
    const queryMetrics = await this.queryMetricsService.getQueryMetricsByUser(
      cluster,
      timestamps,
    );

    const clusterUsageData: any = [];

    clusterUsageData.push({
      id: 'cpu_time',
      label: 'CPU Time',
      chart: 'bar',
      scaleType: 'band',
      color: 'orange',
      xAxis: queryMetrics.length
        ? queryMetrics.map((cu) => cu.sessionuser)
        : [],
      yAxis: queryMetrics.length
        ? queryMetrics.map((cu) =>
            parseFloat((cu.total_cpu_time_sum / (60 * 60)).toFixed(2)),
          )
        : [],
    });
    clusterUsageData.push({
      id: 'total_queries',
      label: 'Total Queries',
      chart: 'bar',
      scaleType: 'band',
      color: 'gray',
      xAxis: queryMetrics.length ? queryMetrics.map((q) => q.sessionuser) : [],
      yAxis: queryMetrics.length
        ? queryMetrics.map((q) => parseInt(q.sessionuser_count))
        : [],
    });
    clusterUsageData.push({
      id: 'gb_scanned',
      label: 'GB Scanned',
      chart: 'bar',
      scaleType: 'band',
      color: 'blue',
      xAxis: queryMetrics.length ? queryMetrics.map((q) => q.sessionuser) : [],
      yAxis: queryMetrics.length
        ? queryMetrics.map((q) => parseInt(q.sessionuser_count))
        : [],
    });
    return clusterUsageData;
  }

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
  async mostActiveQueries(
    @Param('cluster') cluster: Cluster['id'],
    @Query() query: QueryQueryMetricsDto,
  ): Promise<any> {
    const queries = await this.queryMetricsService.getMostActiveQueries({
      cluster_id: cluster,
      order: query.sort?.order || 'DESC',
      orderBy: query.sort?.orderBy || 'createtime',
    });
    return queries;
  }
}
