import { isObject, map } from 'lodash/fp';
import React, { useEffect, useState } from 'react';

import type { Column } from '@/components/MuiTable';
import MuiTable, { OrderTypes } from '@/components/MuiTable';
import { getMostActiveTasksInWorker } from '@/data/worker.data';
import type { ErrorProps } from '@/types';
import { convertTimeDifference, formatBytes } from '@/utils/helper';

interface TasksData {
  task: string;
  used_memory: bigint;
  start: Date;
  total_cpu_time: string;
  drivers: number;
  processed_input_data_size: string;
}

function createTasksData(
  task: string,
  used_memory: bigint,
  start: Date,
  total_cpu_time: string,
  drivers: number,
  processed_input_data_size: string
): TasksData {
  return {
    task,
    used_memory,
    start,
    total_cpu_time,
    drivers,
    processed_input_data_size,
  };
}

interface WorkerTasksTableProps {
  workerId: string;
}

const WorkerActiveTasksTable = (props: WorkerTasksTableProps) => {
  const sortingOrder = OrderTypes.ASC;
  const [activeTasks, setActiveTasks] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [orderBy, setOrderBy] = useState<string>('used_memory');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchWorkerTasksSuccess = (tasks: any) => {
    let tableData: React.SetStateAction<any[]> = [];
    if (tasks && tasks.length) {
      tableData = map((task) => {
        return createTasksData(
          task.task,
          task.used_memory,
          task.start,
          task.total_cpu_time,
          task.drivers,
          task.processed_input_data_size
        );
      }, tasks);
    }
    setActiveTasks(tableData);
    setLoading(false);
  };

  const handleFetchWorkerTasks = () => {
    if (loading) return false;
    let dynamicSortingOrder = sortingOrder;
    if (orderBy === 'used_memory') {
      dynamicSortingOrder = OrderTypes.DESC;
    }

    setLoading(true);
    return getMostActiveTasksInWorker({
      workerId: props.workerId,
      orderBy,
      order: dynamicSortingOrder,
    }).then(onFetchWorkerTasksSuccess, onError);
  };

  const handleSortingOrderBy = (value: string) => {
    setOrderBy(value);
  };

  const handleSorting = (value: string) => {
    handleSortingOrderBy(value);
  };

  useEffect(() => {
    handleFetchWorkerTasks();
    const interval = setInterval(handleFetchWorkerTasks, 5 * 1000);
    return () => clearInterval(interval);
  }, [orderBy, props.workerId]);

  const qeriesColumns: Column[] = [
    {
      id: 'task',
      label: 'Task\u00a0Id',
      minWidth: 170,
    },
    {
      id: 'processed_input_data_size',
      label: 'Input Data size',
      minWidth: 100,
    },
    {
      id: 'drivers',
      label: 'Drivers',
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
      id: 'start',
      label: 'Started At',
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
      rows={activeTasks}
      columns={qeriesColumns}
      title="Active Tasks"
      loading={loading}
    />
  );
};

export default WorkerActiveTasksTable;
