import { find, isObject, map } from 'lodash/fp';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import type { Column } from '@/components/MuiTable';
import MuiTable, { OrderTypes } from '@/components/MuiTable';
import { timePeriodFilters } from '@/constants';
import { getMostActiveWorkers } from '@/data/worker.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

interface WorkersData {
  id: string;
  system_cpu_load: number;
  mem_usage: number;
  system_uptime: number;
  createTime: Date;
  top_query: string;
}

function createWorkersData(
  id: string,
  system_cpu_load: number,
  mem_usage: number,
  system_uptime: number,
  createTime: Date,
  top_query: string
): WorkersData {
  return {
    id,
    system_uptime,
    system_cpu_load,
    mem_usage,
    createTime,
    top_query,
  };
}
interface ActiveWorkersTableProps {
  cluster: ICluster;
  filter: TimestampFilter;
}

const ActiveWorkersTable = (props: ActiveWorkersTableProps) => {
  const clusterId = props.cluster.id;
  const sortingOrder = OrderTypes.DESC;
  const [activeWorkers, setActiveWorkers] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>('mem_usage');

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchClusterOverviewSuccess = (queries: any) => {
    let tableData: React.SetStateAction<any[]> = [];
    if (queries && queries.length) {
      tableData = map((query) => {
        return createWorkersData(
          query.worker_id,
          query.system_cpu_load,
          query.mem_usage,
          query.system_uptime,
          query.createTime,
          query.query_id
        );
      }, queries);
    }
    setActiveWorkers(tableData);
    setLoading(false);
  };

  const handleFetchClusterOverview = () => {
    if (loading || !clusterId) return false;
    setLoading(true);
    return getMostActiveWorkers({
      clusterId,
      orderBy,
      order: sortingOrder,
    }).then(onFetchClusterOverviewSuccess, onError);
  };

  const handleSortingOrderBy = (value: string) => {
    setOrderBy(value);
  };

  const handleSorting = (value: string) => {
    handleSortingOrderBy(value);
  };

  useEffect(() => {
    handleFetchClusterOverview();
    const filterConfig = find({ value: props.filter }, timePeriodFilters);
    const interval = setInterval(
      handleFetchClusterOverview,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [orderBy, clusterId]);

  const workerColumns: Column[] = [
    {
      id: 'id',
      label: 'Worker\u00a0Id',
      minWidth: 170,
      format: (value: string) => (
        <Link href={`/admin/worker/${value}`}>{value}</Link>
      ),
    },
    {
      id: 'system_cpu_load',
      label: 'CPU\u00a0Utilization',
      minWidth: 80,
      format: (value: number) =>
        value ? `${(value * 100).toFixed(2)}%` : '0.00%',
      sorting: true,
      order: sortingOrder,
      orderBy: 'system_cpu_load',
      sorted: orderBy === 'system_cpu_load',
      handleSorting: () => handleSorting('system_cpu_load'),
    },
    {
      id: 'mem_usage',
      label: 'Memory\u00a0Usage',
      minWidth: 80,
      align: 'right',
      format: (value: number) => {
        const num = Number(value);
        if (!Number.isNaN(num)) {
          return `${num.toFixed(2)}%`;
        }
        return '0.00%';
      },
      sorting: true,
      order: sortingOrder,
      orderBy: 'mem_usage',
      sorted: orderBy === 'mem_usage',
      handleSorting: () => handleSorting('mem_usage'),
    },
    {
      id: 'system_uptime',
      label: 'Age',
      minWidth: 80,
      align: 'right',
      format: (value: number) => {
        const seconds = Number(value);
        if (!Number.isNaN(seconds)) {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          // const remainingSeconds = seconds % 60;
          return `${hours}h ${minutes}m `;
          // Or, if you prefer just hours and minutes (especially for larger values):
          // return `${hours}h ${minutes}m`;
        }
        return '';
      },
    },
    {
      id: 'top_query',
      label: 'Top\u00a0Query',
      minWidth: 170,
      align: 'center',
      format: (value: string) => {
        return <Link href={`/admin/query-history/#`}>{value}</Link>;
      },
    },
  ];

  return (
    <MuiTable
      rows={activeWorkers}
      columns={workerColumns}
      title="Active Workers"
      loading={loading}
    />
  );
};

export default ActiveWorkersTable;
