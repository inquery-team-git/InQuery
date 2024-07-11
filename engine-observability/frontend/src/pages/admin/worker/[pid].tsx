'use-client';

import HomeIcon from '@mui/icons-material/Home';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Divider } from '@mui/material';
import { isObject, map } from 'lodash/fp';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import CustomizedBreadcrumbs from '@/components/MuiBreadcrumbs';
import { OrderTypes } from '@/components/MuiTable';
import WorkerActiveQueriesTable from '@/components/WorkerActiveQueriesTable';
import WorkerActiveTasksTable from '@/components/WorkerActiveTasksTable';
import WorkerCapacityMetrics from '@/components/WorkerCapacityMetrics';
import WorkerOverview from '@/components/WorkerOverview';
import { DEFAULT_TIME_FILTER } from '@/constants';
import { getWorkerClusterDetails } from '@/data/cluster.data';
import { getMostActiveWorkers } from '@/data/worker.data';
import AdminLayout from '@/layouts/Admin';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

const ClusterPage = () => {
  const router = useRouter();
  const dataFetchedRef = useRef(false);
  const workerId = router.query.pid as string;
  const [filter, setFilter] = useState<TimestampFilter>(DEFAULT_TIME_FILTER);
  const [currentWorkerId, setCurrentWorkerId] = useState<string>('');
  const [activeWorkers, setActiveWorkers] = useState<any[]>([]);
  const [cluster, setCluster] = useState<ICluster | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');

  const handleWorkerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setCurrentWorkerId(event.target.value);
    router.push(`/admin/worker/${event.target.value}`);
  };

  const handleFilterChange = (value: TimestampFilter) => {
    setFilter(value);
  };

  const onError = (err: string | ErrorProps) => {
    setLoading(false);
    setError(isObject(err) ? err.message : err);
  };

  const onFetchActiveWorkersSuccess = (workers: any) => {
    setError('');
    setLoading(false);
    let tableData: React.SetStateAction<any[]> = [];
    if (workers && workers.length) {
      tableData = map((query) => {
        return {
          text: query.worker_id,
          value: query.worker_id,
        };
      }, workers);
    }
    setActiveWorkers(tableData);
  };

  const handleFetchActiveWorkers = () => {
    if (!cluster) return false;
    setError('');
    setLoading(true);
    return getMostActiveWorkers({
      orderBy: 'mem_usage',
      order: OrderTypes.DESC,
      clusterId: cluster?.id,
    }).then(onFetchActiveWorkersSuccess, onError);
  };

  const onFetchClusterDetailsSuccess = (res: any) => {
    setError('');
    setLoading(false);
    setCluster(res);
  };

  const handleFetchClusterDetails = () => {
    setError('');
    setLoading(true);
    return getWorkerClusterDetails(workerId).then(
      onFetchClusterDetailsSuccess,
      onError
    );
  };

  useEffect(() => {
    handleFetchActiveWorkers();
  }, [cluster?.id]);

  useEffect(() => {
    if (!workerId || dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setCurrentWorkerId(workerId);
    handleFetchClusterDetails();
  }, [workerId]);

  if (!currentWorkerId || !cluster) return null;

  const pageHeaderData = [
    {
      label: 'InQuery',
      disabled: true,
      href: '#',
      actions: [],
      startIcon: <HomeIcon fontSize="small" style={{ color: '#FFF' }} />,
    },
    {
      label: cluster.name,
      disabled: false,
      href: `/admin/cluster/${cluster.id}`,
      actions: [],
    },
    {
      label: `${currentWorkerId}`,
      disabled: false,
      href: '#',
      actions: ['select'],
      endIcon: <UnfoldMoreIcon fontSize="small" style={{ color: '#FFF' }} />,
    },
  ];

  return (
    <EnsureLoginRoute>
      <AdminLayout loading={loading}>
        <Container className="mt-1" fluid>
          <CustomizedBreadcrumbs
            crumbs={pageHeaderData}
            selecPlaceholder="Select Worker"
            onSelectItem={handleWorkerChange}
            selectOptions={activeWorkers}
          />
          <Divider />
          <WorkerOverview handleFilterChange={handleFilterChange} />
          <WorkerCapacityMetrics filter={filter} workerId={currentWorkerId} />
          <div className="mt-5 mr-2">
            <WorkerActiveQueriesTable workerId={currentWorkerId} />
          </div>
          <div className="mt-5 mr-2">
            <WorkerActiveTasksTable workerId={currentWorkerId} />
          </div>
        </Container>
      </AdminLayout>
    </EnsureLoginRoute>
  );
};

export default ClusterPage;
