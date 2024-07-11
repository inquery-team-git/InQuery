/* eslint-disable no-promise-executor-return */
import mostActiveWorkersMockData from 'src/mock-data/most-active-workers.json';
import workerCapacitysMockData from 'src/mock-data/worker-capacity-metrics.json';
import workerMostActiveQueries from 'src/mock-data/worker-most-active-queries.json';
import workerMostActiveTasks from 'src/mock-data/worker-most-active-tasks.json';

import type { OrderTypes } from '@/components/MuiTable';
import type { ICluster, TimestampFilter } from '@/types';
import { get } from '@/utils/fetch.util';

export const getMostActiveWorkers = async (data: {
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
      return resolve(mostActiveWorkersMockData);
    });
  }
  return get({
    url: `/api/v1/worker/most-active/${data.clusterId}?sort=${JSON.stringify(
      sort
    )}`,
  }).then((resp) => resp);
};

export const getWorkerCapacityMetrics = async (data: {
  workerId: string;
  timeperiod?: TimestampFilter;
}) => {
  const filters: Record<string, any> = {};
  filters.workerId = data.workerId;
  if (data.timeperiod) filters.timeperiod = data.timeperiod;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(workerCapacitysMockData);
    });
  }
  return get({
    url: `/api/v1/worker/capacity-metrics?filters=${JSON.stringify(filters)}`,
  }).then((resp) => resp);
};

export const getMostActiveQueriesInWorker = async (data: {
  workerId: string;
  orderBy: string;
  order: OrderTypes;
}) => {
  const sort: Record<string, any> = {
    order: 'DESC',
    orderBy: 'used_memory',
  };
  const filters: Record<string, any> = {};
  filters.workerId = data.workerId;
  if (data.orderBy) sort.orderBy = data.orderBy;
  if (data.order) sort.order = data.order;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(workerMostActiveQueries);
    });
  }
  return get({
    url: `/api/v1/worker/most-active-queries?filters=${JSON.stringify(
      filters
    )}&sort=${JSON.stringify(sort)}`,
  }).then((resp) => resp);
};

export const getMostActiveTasksInWorker = async (data: {
  workerId: string;
  orderBy: string;
  order: OrderTypes;
}) => {
  const sort: Record<string, any> = {
    order: 'DESC',
    orderBy: 'used_memory',
  };
  const filters: Record<string, any> = {};
  filters.workerId = data.workerId;
  if (data.orderBy) sort.orderBy = data.orderBy;
  if (data.order) sort.order = data.order;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(workerMostActiveTasks);
    });
  }
  return get({
    url: `/api/v1/worker/most-active-tasks?filters=${JSON.stringify(
      filters
    )}&sort=${JSON.stringify(sort)}`,
  }).then((resp) => resp);
};
