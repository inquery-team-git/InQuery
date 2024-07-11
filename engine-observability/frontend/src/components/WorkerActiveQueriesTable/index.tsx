import { isObject, map } from 'lodash/fp';
// import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import type { Column } from '@/components/MuiTable';
import MuiTable, { OrderTypes } from '@/components/MuiTable';
import { getMostActiveQueriesInWorker } from '@/data/worker.data';
import type { ErrorProps } from '@/types';
import { convertTimeDifference, formatBytes } from '@/utils/helper';

interface QueriesData {
  query_id: string;
  used_memory: string;
  createtime: Date;
  state: string;
  sessionuser: string;
  sessionsource: string;
}

function createQueriesData(
  query_id: string,
  used_memory: string,
  createtime: Date,
  state: string,
  sessionuser: string,
  sessionsource: string
): QueriesData {
  return {
    query_id,
    used_memory,
    createtime,
    state,
    sessionuser,
    sessionsource,
  };
}

interface WorkerQueriesTableProps {
  workerId: string;
}

const WorkerActiveQueriesTable = (props: WorkerQueriesTableProps) => {
  const sortingOrder = OrderTypes.ASC;
  const [activeQueries, setActiveQueries] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [orderBy, setOrderBy] = useState<string>('used_memory');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchWorkerQueriesSuccess = (queries: any) => {
    let tableData: React.SetStateAction<any[]> = [];
    if (queries && queries.length) {
      tableData = map((query) => {
        return createQueriesData(
          query.query_id,
          query.used_memory,
          query.createtime,
          query.state,
          query.sessionuser,
          query.sessionsource
        );
      }, queries);
    }
    setActiveQueries(tableData);
    setLoading(false);
  };

  const handleFetchWorkerQueries = () => {
    if (loading) return false;
    let dynamicSortingOrder = sortingOrder;
    if (orderBy === 'used_memory') {
      dynamicSortingOrder = OrderTypes.DESC;
    }

    setLoading(true);
    return getMostActiveQueriesInWorker({
      workerId: props.workerId,
      orderBy,
      order: dynamicSortingOrder,
    }).then(onFetchWorkerQueriesSuccess, onError);
  };

  const handleSortingOrderBy = (value: string) => {
    setOrderBy(value);
  };

  const handleSorting = (value: string) => {
    handleSortingOrderBy(value);
  };

  useEffect(() => {
    handleFetchWorkerQueries();
    const interval = setInterval(handleFetchWorkerQueries, 5 * 1000);
    return () => clearInterval(interval);
  }, [orderBy, props.workerId]);

  const qeriesColumns: Column[] = [
    {
      id: 'query_id',
      label: 'Query\u00a0Id',
      minWidth: 170,
      // format: (value: string) => {
      //   return <Link href={`/admin/query-history/#`}>{value}</Link>;
      // },
    },
    { id: 'sessionsource', label: 'Source', minWidth: 100 },
    {
      id: 'sessionuser',
      label: 'User',
      minWidth: 80,
      align: 'right',
    },
    {
      id: 'used_memory',
      label: 'Memory',
      minWidth: 80,
      align: 'right',
      format: (value: number) => formatBytes(value),
      sorting: true,
      order: OrderTypes.DESC,
      orderBy: 'used_memory',
      sorted: orderBy === 'used_memory',
      handleSorting: () => handleSorting('used_memory'),
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

export default WorkerActiveQueriesTable;
