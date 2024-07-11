import { find, isObject, map } from 'lodash/fp';
// import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import type { Column } from '@/components/MuiTable';
import MuiTable, { OrderTypes } from '@/components/MuiTable';
import { timePeriodFilters } from '@/constants';
import { getMostActiveQueries } from '@/data/query.data';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';
import { convertTimeDifference, formatBytes } from '@/utils/helper';
import { getQueryStateColor } from '@/utils/queries';

interface QueriesData {
  id: string;
  state: string;
  source: string;
  user: string;
  memory: number;
  createtime: Date;
}

function createQueriesData(
  id: string,
  state: string,
  source: string,
  user: string,
  memory: number,
  createtime: Date
): QueriesData {
  return { id, state, source, user, memory, createtime };
}

interface ActiveQueriesTableProps {
  cluster: ICluster;
  filter: TimestampFilter;
}

const ActiveQueriesTable = (props: ActiveQueriesTableProps) => {
  const clusterId = props.cluster.id;
  const sortingOrder = OrderTypes.ASC;
  const [activeQueries, setActiveQueries] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [orderBy, setOrderBy] = useState<string>('createtime');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchClusterOverviewSuccess = (queries: any) => {
    let tableData: React.SetStateAction<any[]> = [];
    if (queries && queries.length) {
      tableData = map((query) => {
        return createQueriesData(
          query.queryId,
          query.state,
          query.sessionSource,
          query.sessionUser,
          query.cumulativeUserMemory,
          query.createtime
        );
      }, queries);
    }
    setActiveQueries(tableData);
    setLoading(false);
  };

  const handleFetchClusterOverview = () => {
    if (loading || !clusterId) return false;
    let dynamicSortingOrder = sortingOrder;
    if (orderBy === 'createtime') {
      dynamicSortingOrder = OrderTypes.ASC; // Sort 'createtime' in ascending order
    } else if (orderBy === 'cumulativeusermemory') {
      dynamicSortingOrder = OrderTypes.DESC; // Sort 'memory' in descending order
    }

    setLoading(true);
    return getMostActiveQueries({
      clusterId,
      orderBy,
      order: dynamicSortingOrder,
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

  const qeriesColumns: Column[] = [
    {
      id: 'id',
      label: 'Query\u00a0Id',
      minWidth: 170,
      // format: (value: string) => {
      //   return <Link href={`/admin/query-history/#`}>{value}</Link>;
      // },
    },
    {
      id: 'state',
      label: 'State',
      minWidth: 100,
      format: (value: string) => {
        return (
          <span style={{ color: getQueryStateColor(value, {}, false) }}>
            {value}
          </span>
        );
      },
    },
    { id: 'source', label: 'Source', minWidth: 100 },
    {
      id: 'user',
      label: 'User',
      minWidth: 80,
      align: 'right',
    },
    {
      id: 'memory',
      label: 'Memory',
      minWidth: 80,
      align: 'right',
      format: (value: number) => formatBytes(value),
      sorting: true,
      order: OrderTypes.DESC,
      orderBy: 'cumulativeusermemory',
      sorted: orderBy === 'cumulativeusermemory',
      handleSorting: () => handleSorting('cumulativeusermemory'),
    },
    {
      id: 'createtime',
      label: 'Age',
      minWidth: 170,
      align: 'center',
      format: (value: Date) => {
        if (!value) return '';

        return convertTimeDifference(value);
      },
      sorting: true,
      order: sortingOrder,
      orderBy: 'createtime',
      sorted: orderBy === 'createtime',
      handleSorting: () => handleSorting('createtime'),
    },
  ];

  return (
    <MuiTable
      rows={activeQueries}
      columns={qeriesColumns}
      title="Active Queries"
      loading={loading}
    />
  );
};

export default ActiveQueriesTable;
