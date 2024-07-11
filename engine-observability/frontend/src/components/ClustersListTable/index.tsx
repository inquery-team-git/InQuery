import { find, isObject, map } from 'lodash/fp';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import type { Column } from '@/components/MuiTable';
import MuiTable, { OrderTypes } from '@/components/MuiTable';
import { getClusterList } from '@/data/cluster.data';
import type { ErrorProps } from '@/types';
import { ClusterStatusMapping } from '@/utils/helper';

import DeleteClusterButtonWrapper from '../DeleteClusterButton';
import UpdateClusterButtonWrapper from '../UpdateClusterButton';
import NoClusterComponent from './Empty';

interface ClusterData {
  id: string;
  enabled: boolean;
  name: string;
  host: string;
  port: number;
  host_port: string;
  description: string;
  system_cpu_load: number;
  mem_usage: number;
  timestamp: Date;
}

function createClusterData(
  id: string,
  enabled: boolean,
  name: string,
  host: string,
  port: number,
  description: string,
  system_cpu_load: number,
  mem_usage: number,
  timestamp: Date
): ClusterData {
  return {
    id,
    enabled,
    name,
    host,
    port,
    host_port: `${host}:${port}`,
    description,
    system_cpu_load,
    mem_usage,
    timestamp,
  };
}

interface ClusterListTableProps {
  handleLoading?: (value: boolean) => void;
}

const ClusterListTable = (props: ClusterListTableProps) => {
  const { handleLoading } = props;
  const sortingOrder = OrderTypes.DESC;
  const [clusterList, setClusterList] = useState<any[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>('enabled');

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
    if (handleLoading) {
      handleLoading(false);
    }
  };

  const onFetchClusterListSuccess = (res: any) => {
    const clusters = res.data;
    let tableData: React.SetStateAction<any[]> = [];
    if (clusters && clusters.length) {
      tableData = map((cluster) => {
        return createClusterData(
          cluster.id,
          cluster.enabled,
          cluster.name,
          cluster.host,
          cluster.port,
          cluster.description,
          cluster.system_cpu_load,
          cluster.mem_usage,
          cluster.timestamp
        );
      }, clusters);
    }
    setClusterList(tableData);
    setLoading(false);
    if (handleLoading) {
      handleLoading(false);
    }
  };

  const handleFetchClusterList = () => {
    if (loading) return false;
    setLoading(true);
    if (handleLoading) {
      handleLoading(true);
    }
    return getClusterList({
      orderBy,
      order: sortingOrder,
    }).then(onFetchClusterListSuccess, onError);
  };

  const handleSortingOrderBy = (value: string) => {
    setOrderBy(value);
  };

  const handleSorting = (value: string) => {
    handleSortingOrderBy(value);
  };

  const getClusterDetails = (clusterId: string) => {
    return find({ id: clusterId }, clusterList);
  };

  useEffect(() => {
    handleFetchClusterList();
    // const interval = setInterval(handleFetchClusterList, 3 * 1000);
    // return () => clearInterval(interval);
  }, [orderBy]);

  const clusterColumns: Column[] = [
    {
      id: 'id',
      label: 'Cluster\u00a0Id',
      minWidth: 170,
      format: (value: string) => (
        <Link href={`/admin/cluster/${value}`} style={{ cursor: 'pointer' }}>
          {value}
        </Link>
      ),
    },
    {
      id: 'enabled',
      label: 'Status',
      minWidth: 120,
      format: (value: boolean) => {
        const status = value ? 'active' : 'inactive';
        const statusConfig = ClusterStatusMapping[status];
        if (!statusConfig) return value;
        return (
          <span style={{ color: statusConfig.color }}>
            {statusConfig.title}
          </span>
        );
      },
      sorting: true,
      order: sortingOrder,
      orderBy: 'status',
      sorted: orderBy === 'status',
      handleSorting: () => handleSorting('status'),
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 170,
    },
    {
      id: 'host_port',
      label: 'Host:Port',
      minWidth: 170,
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    // {
    //   id: "system_cpu_load",
    //   label: "CPU\u00a0Utilization",
    //   minWidth: 170,
    //   format: (value: number) => (value ? `${(value * 100).toFixed(2)}%` : ""),
    //   sorting: true,
    //   order: sortingOrder,
    //   orderBy: "system_cpu_load",
    //   sorted: orderBy === "system_cpu_load",
    //   handleSorting: () => handleSorting("system_cpu_load"),
    // },
    // {
    //   id: "mem_usage",
    //   label: "Memory\u00a0Usage",
    //   minWidth: 170,
    //   align: "right",
    //   format: (value: number) => {
    //     const num = Number(value);
    //     if (!isNaN(num)) {
    //       return `${num.toFixed(2)}%`;
    //     }
    //     return "";
    //   },
    //   sorting: true,
    //   order: sortingOrder,
    //   orderBy: "mem_usage",
    //   sorted: orderBy === "mem_usage",
    //   handleSorting: () => handleSorting("mem_usage"),
    // },
    {
      id: 'timestamp',
      label: 'Created\u00a0At',
      minWidth: 170,
      align: 'center',
      format: (value: string) => {
        return moment(value).format('DD-MM-YYYY HH:MM:SS');
      },
      sorting: true,
      order: sortingOrder,
      orderBy: 'timestamp',
      sorted: orderBy === 'timestamp',
      handleSorting: () => handleSorting('timestamp'),
    },
    {
      id: 'id',
      label: '',
      minWidth: 30,
      format: (value: string) => {
        return (
          <DeleteClusterButtonWrapper
            hideLabel
            clusterId={value}
            cluster={getClusterDetails(value)}
            onDeleteSuccess={handleFetchClusterList}
          />
        );
      },
    },
    {
      id: 'id',
      label: '',
      minWidth: 30,
      format: (value: string) => {
        return (
          <UpdateClusterButtonWrapper
            hideLabel
            clusterId={value}
            cluster={getClusterDetails(value)}
            onUpdateSuccess={handleFetchClusterList}
          />
        );
      },
    },
  ];

  if (loading) return null;

  return clusterList.length > 0 ? (
    <div className="mt-2 mr-2">
      <MuiTable
        rows={clusterList}
        columns={clusterColumns}
        title="All Clusters"
        loading={loading}
      />
    </div>
  ) : (
    <NoClusterComponent />
  );
};

export default ClusterListTable;
