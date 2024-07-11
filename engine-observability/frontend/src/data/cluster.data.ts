/* eslint-disable no-promise-executor-return */
import clusterMetricsMockData from 'src/mock-data/cluster-capacity-metrics.json';
import clusterFailureData from 'src/mock-data/cluster-failure-metrics.json';
import clusterLatencyData from 'src/mock-data/cluster-latency.json';
import clusterListData from 'src/mock-data/cluster-list.json';
import clusterNewData from 'src/mock-data/cluster-new.json';
import clusterOverviewData from 'src/mock-data/cluster-overview.json';

import type { NewClusterFormParams } from '@/components/AddNewCluster/NewClusterForm';
import type { OrderTypes } from '@/components/MuiTable';
import type { UpdateClusterFormParams } from '@/components/UpdateCluster/UpdateClusterForm';
import type { ICluster, TimestampFilter } from '@/types';
import { get, post, put, remove } from '@/utils/fetch.util';

export const getClusterCapacityMetrics = async (data: {
  clusterId: ICluster['id'];
  timeperiod?: TimestampFilter;
}) => {
  const filters: Record<string, any> = {};
  if (data.timeperiod) filters.timeperiod = data.timeperiod;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterMetricsMockData);
    });
  }
  return get({
    url: `/api/v1/cluster/capacity-metrics/${
      data.clusterId
    }?filters=${JSON.stringify(filters)}`,
  }).then((resp) => resp);
};

export const getClusterFailureMetrics = async (data: {
  clusterId: ICluster['id'];
  timeperiod?: TimestampFilter;
}) => {
  const filters: Record<string, any> = {};
  if (data.timeperiod) filters.timeperiod = data.timeperiod;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterFailureData);
    });
  }
  const temper = get({
    url: `/api/v1/cluster/failure-metrics/${
      data.clusterId
    }?filters=${JSON.stringify(filters)}`,
  }).then((resp) => resp);
  return temper;
};

export const getClusterOverview = async (clusterId: ICluster['id']) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterOverviewData);
    });
  }
  return get({
    url: `/api/v1/cluster/capacity-overview/${clusterId}`,
  }).then((resp) => resp);
};

export const getClusterLatencyMetrics = async (data: {
  clusterId: ICluster['id'];
  timeperiod?: TimestampFilter;
}) => {
  const filters: Record<string, any> = {};
  if (data.timeperiod) filters.timeperiod = data.timeperiod;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterLatencyData);
    });
  }
  const temper = get({
    url: `/api/v1/cluster/latency-metrics/${
      data.clusterId
    }?filters=${JSON.stringify(filters)}`,
  }).then((resp) => resp);
  return temper;
};

export const getClusterList = async (data?: {
  orderBy: string;
  order: OrderTypes;
}) => {
  const sort: Record<string, any> = {
    order: 'ASC',
    orderBy: 'enabled',
  };
  if (data?.orderBy) sort.orderBy = data.orderBy;
  if (data?.order) sort.order = data.order;

  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterListData);
    });
  }
  return get({
    url: `/api/v1/clusters?sort=${JSON.stringify([sort])}`,
  }).then((resp) => resp);
};

export const addNewCluster = async (body: NewClusterFormParams) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterNewData);
    });
  }
  return post({
    url: '/api/v1/clusters',
    data: body,
  }).then((resp) => resp);
};

export const testClusterConnection = async (host: string, port: number) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(true);
    });
  }
  return post({
    url: '/api/v1/clusters/test-connection',
    data: { host, port },
  }).then((resp) => resp);
};

export const updateCluster = async (
  clusterId: string,
  body: UpdateClusterFormParams
) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterNewData);
    });
  }
  return put({
    url: `/api/v1/clusters/${clusterId}`,
    data: body,
  }).then((resp) => resp);
};

export const deleteCluster = async (clusterId: string) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterNewData);
    });
  }
  return remove({
    url: `/api/v1/clusters/${clusterId}`,
  }).then((resp) => resp);
};

export const getWorkerClusterDetails = async (workerId: string) => {
  if (process.env.MOCK_DATA_ENABLED) {
    return new Promise((resolve) => {
      return resolve(clusterNewData);
    });
  }

  return get({
    url: `/api/v1/clusters/worker/${workerId}`,
  }).then((resp) => resp);
};
