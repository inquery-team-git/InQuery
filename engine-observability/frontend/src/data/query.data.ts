/* eslint-disable no-promise-executor-return */
import { isEmpty } from 'lodash';
import clusterUsageMetricsMockData from 'src/mock-data/cluster-usage.metrics.json';
import historiclaQueriesMockData from 'src/mock-data/historical-queries.json';
import mostActiveQueriesMockData from 'src/mock-data/most-active-queries.json';
import queryDetailsMockData from 'src/mock-data/query-details.json';
import queryRecommendationsMockData from 'src/mock-data/query-recommendations.json';

import type { OrderTypes } from '@/components/MuiTable';
import type { ICluster, TimestampFilter } from '@/types';
import { get } from '@/utils/fetch.util';

export const getClusterUsageMetrics = async (data: {
  clusterId: ICluster['id'];
  timeperiod?: TimestampFilter;
}) => {
  const filters: Record<string, any> = {};
  if (data.timeperiod) filters.timeperiod = data.timeperiod;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterUsageMetricsMockData);
    });
  }
  return get({
    url: `/api/v1/query/usage-metrics/${data.clusterId}?filters=${JSON.stringify(
      filters
    )}`,
  }).then((resp) => resp);
};

export const getMostActiveQueries = async (data: {
  clusterId: ICluster['id'];
  orderBy: string;
  order: OrderTypes;
}) => {
  const sort: Record<string, any> = {
    order: 'ASC',
    orderBy: 'createtime',
  };
  if (data.orderBy) sort.orderBy = data.orderBy;
  if (data.order) sort.order = data.order;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(mostActiveQueriesMockData);
    });
  }
  return get({
    url: `/api/v1/query/most-active/${data.clusterId}?sort=${JSON.stringify(sort)}`,
  }).then((resp) => resp);
};

export const getHistoricalQueries = async (data: {
  page: number;
  orderBy: string;
  order: OrderTypes;
  filters?: Record<string, any>;
}) => {
  const sort: Record<string, any> = {
    order: 'DESC',
    orderBy: 'cumulative_memory',
  };
  const appliedFilters: Record<string, any> = {};
  if (data.orderBy) sort.orderBy = data.orderBy;
  if (data.order) sort.order = data.order;
  if (!isEmpty(data.filters)) {
    if (data.filters.source && data.filters.source.length) {
      appliedFilters.source = data.filters.source.join(',');
    }
    if (data.filters.status && data.filters.status.length) {
      appliedFilters.query_state = data.filters.status.join(',');
    }
    if (data.filters.user && data.filters.user.length) {
      appliedFilters.user = data.filters.user.join(',');
    }
  }

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(historiclaQueriesMockData);
    });
  }
  return get({
    url: `/api/v1/queries?limit=10&page=${data.page}&sort=${JSON.stringify([
      sort,
    ])}&filters=${JSON.stringify(appliedFilters)}`,
  }).then((resp) => resp);
};

export const getQueryDetails = async (queryId: string) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(queryDetailsMockData);
    });
  }
  return get({
    url: `/api/v1/queries/details/${queryId}`,
  }).then((resp) => resp);
};

export const getQueryRecommendations = async (queryId: string) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(queryRecommendationsMockData);
    });
  }
  return get({
    url: `/api/v1/queries/optimizations/${queryId}`,
  }).then((resp) => resp);
};
