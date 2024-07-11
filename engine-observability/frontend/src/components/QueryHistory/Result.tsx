import _ from 'lodash';
import { isObject, map } from 'lodash/fp';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import type { Column } from '@/components/MuiTable';
import MuiTable, { OrderTypes } from '@/components/MuiTable';
import { getHistoricalQueries } from '@/data/query.data';
import type { ErrorProps } from '@/types';
import { formatBytes, QueryStatusMapping } from '@/utils/helper';

interface QueryData {
  query_id: string;
  query_state: string;
  user: string;
  source: string;
  cpu_time_millis: number;
  cumulative_memory: number;
  catalog: string;
  schema: string;
}

function createQueryData(
  query_id: string,
  query_state: string,
  user: string,
  source: string,
  cpu_time_millis: number,
  cumulative_memory: number,
  catalog: string,
  schema: string
): QueryData {
  return {
    query_id,
    query_state,
    user,
    source,
    cpu_time_millis,
    cumulative_memory,
    catalog,
    schema,
  };
}

interface QueryHistoryTableProps {
  appliedFilters: Record<string, any>;
  handleLoading?: (value: boolean) => void;
}

const QueryHistoryTable = (props: QueryHistoryTableProps) => {
  const { appliedFilters = {}, handleLoading } = props;
  const sortingOrder = OrderTypes.DESC;
  const [queriesList, setQueriesList] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>('cumulative_memory');

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
    if (handleLoading) {
      handleLoading(false);
    }
  };

  const onFetchClusterOverviewSuccess = (res: any) => {
    const queries = res.data;
    let tableData: React.SetStateAction<any[]> = [];
    if (queries && queries.length) {
      tableData = map((query) => {
        return createQueryData(
          query.query_id,
          query.query_state,
          query.user,
          query.source,
          query.cpu_time_millis,
          query.cumulative_memory,
          query.catalog,
          query.schema
        );
      }, queries);
    }
    setQueriesList(tableData);
    setLoading(false);
    if (handleLoading) {
      handleLoading(false);
    }
  };

  const handleFetchClusterOverview = (page = 1) => {
    if (loading) return false;
    setLoading(true);
    if (handleLoading) {
      handleLoading(true);
    }
    return getHistoricalQueries({
      page,
      orderBy,
      order: sortingOrder,
      filters: appliedFilters,
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
    // const interval = setInterval(handleFetchClusterOverview, 30 * 1000);
    // return () => clearInterval(interval);
  }, [orderBy, appliedFilters]);

  const queryColumns: Column[] = [
    {
      id: 'query_id',
      label: 'Query',
      minWidth: 170,
      format: (value: string) => {
        return <Link href={`/admin/query/${value}`}>{value}</Link>;
      },
    },
    {
      id: 'query_state',
      label: 'Status',
      minWidth: 80,
      format: (value: string) => {
        const statusConfig =
          QueryStatusMapping[
            _.lowerCase(value) as 'finished' | 'running' | 'failed' | 'paused'
          ];
        if (!statusConfig) return value;
        return (
          <span style={{ color: statusConfig.color }}>
            {statusConfig.title}
          </span>
        );
      },
    },
    {
      id: 'user',
      label: 'User',
      minWidth: 70,
    },
    {
      id: 'source',
      label: 'Source',
      minWidth: 70,
    },
    {
      id: 'catalog',
      label: 'Catalog',
      minWidth: 70,
    },
    {
      id: 'schema',
      label: 'Schema',
      minWidth: 70,
    },
    {
      id: 'cpu_time_millis',
      label: 'CPU Time',
      minWidth: 120,
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
      sorting: true,
      order: sortingOrder,
      orderBy: 'cpu_time_millis',
      sorted: orderBy === 'cpu_time_millis',
      handleSorting: () => handleSorting('cpu_time_millis'),
    },
    {
      id: 'cumulative_memory',
      label: 'Cumulative Memory',
      minWidth: 120,
      align: 'center',
      format: (value: number) => formatBytes(value),
      sorting: true,
      order: sortingOrder,
      orderBy: 'cumulative_memory',
      sorted: orderBy === 'cumulative_memory',
      handleSorting: () => handleSorting('cumulative_memory'),
    },
  ];

  return (
    <MuiTable
      pagination
      rows={queriesList}
      columns={queryColumns}
      loading={loading}
      handlePageChange={handleFetchClusterOverview}
    />
  );
};

export default QueryHistoryTable;
