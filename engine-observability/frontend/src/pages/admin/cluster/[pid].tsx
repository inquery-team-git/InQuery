'use-client';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Divider } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'reactstrap';

import AddNewClusterWrapper from '@/components/AddNewCluster';
import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import ClusterActiveQueriesTable from '@/components/ClusterActiveQueriesTable';
import ClusterActiveWorkersTable from '@/components/ClusterActiveWorkersTable';
import ClusterCapacityMetrics from '@/components/ClusterCapacityMetrics';
import ClusterFailureMetrics from '@/components/ClusterFailureMetrics';
import ClusterLatencyMetrics from '@/components/ClusterLatencyMetrics';
import ClusterOverView from '@/components/ClusterOverView';
import ClusterUsageMetrics from '@/components/ClusterUsageMetrics';
import CustomizedBreadcrumbs from '@/components/MuiBreadcrumbs';
// import NetworkError from '@/components/NetworkError';
import { DEFAULT_TIME_FILTER, timePeriodFilters } from '@/constants';
import { getClusterList, testClusterConnection } from '@/data/cluster.data';
import AdminLayout from '@/layouts/Admin';
import type { ErrorProps, ICluster, TimestampFilter } from '@/types';

const pageCrumbs: Record<string, any>[] = [
  {
    label: 'InQuery',
    disabled: false,
    href: '/admin/cluster',
    actions: [''],
    startIcon: <HomeIcon fontSize="small" style={{ color: '#FFF' }} />,
  },
];

const ClusterPage = () => {
  const router = useRouter();
  const currentClusterId = router.query.pid as string;
  const [filter, setFilter] = useState<TimestampFilter>(DEFAULT_TIME_FILTER);
  const [currentCluster, setCurrentCluster] = useState<ICluster>();
  const [clusterList, setClusterList] = useState<ICluster[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clusterDialog, setClusterDialog] = useState(false);

  const openAddClusterDialog = () => {
    setClusterDialog(true);
  };

  const closeAddClusterDialog = () => {
    setClusterDialog(false);
  };

  const handleClusterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (event.target.value === 'create_cluster') {
      console.info('Create Cluster', event.target.value);
      openAddClusterDialog();
    } else {
      router.push(`/admin/cluster/${event.target.value}`);
      console.info('You clicked a cluster.', event.target.value);
    }
  };

  const handleFilterChange = (value: TimestampFilter) => {
    setFilter(value);
  };

  const onError = (err: string | ErrorProps) => {
    setError(_.isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchClusterListSuccess = (res: any) => {
    const clusters: ICluster[] = res.data;
    if (clusters && clusters.length) {
      setClusterList(clusters);
    }
    setLoading(false);
  };

  const handleFetchClusterList = () => {
    if (loading) return false;
    setLoading(true);
    return getClusterList().then(onFetchClusterListSuccess, onError);
  };

  const onConnectionSuccess = () => {
    // set redux state
    setError('');
    setLoading(false);
    setConnected(true);
  };

  const onConnectionFailed = (err: string | ErrorProps) => {
    setError(_.isObject(err) ? err.message : err);
    setLoading(false);
    setConnected(false);
  };

  const handleCheckClusterConnection = () => {
    if (currentCluster && currentCluster?.host && currentCluster?.port) {
      testClusterConnection(
        currentCluster.host,
        // eslint-disable-next-line radix
        parseInt(currentCluster.port as unknown as string)
      ).then(onConnectionSuccess, onConnectionFailed);
    }
  };

  useEffect(() => {
    handleFetchClusterList();
  }, []);

  useEffect(() => {
    const clusterData: ICluster | undefined = _.find(clusterList, {
      id: currentClusterId,
    });
    if (clusterData) {
      setCurrentCluster(clusterData);
    }
  }, [currentClusterId, clusterList.length]);

  useEffect(() => {
    handleCheckClusterConnection();
    const filterConfig = _.find(timePeriodFilters, { value: filter });
    const interval = setInterval(
      handleCheckClusterConnection,
      filterConfig?.intervalPeriod
    );
    return () => clearInterval(interval);
  }, [filter, currentCluster]);

  const clusterSelectOptions = _.map(clusterList, (c: ICluster) => ({
    text: c.name,
    value: c.id,
  }));

  if (!currentCluster) return null;
  return (
    <EnsureLoginRoute>
      <AdminLayout loading={loading}>
        <Container className="mt-1" fluid>
          <CustomizedBreadcrumbs
            crumbs={[
              ...pageCrumbs,
              ...(currentCluster
                ? [
                    {
                      label: currentCluster.name,
                      disabled: false,
                      href: `#`,
                      actions: ['select'],
                      endIcon: (
                        <UnfoldMoreIcon
                          fontSize="small"
                          style={{ color: '#FFF' }}
                        />
                      ),
                    },
                  ]
                : []),
            ]}
            selecPlaceholder="Select Cluster"
            onSelectItem={handleClusterChange}
            selectOptions={[
              ...clusterSelectOptions,
              {
                icon: <AddIcon />,
                text: 'Add Cluster',
                value: 'create_cluster',
              },
            ]}
          />
          <Divider />
          {/* {!connected && !loading && error && <NetworkError title={error} />} */}
          {!loading && (
            <Fragment>
              <ClusterOverView
                handleFilterChange={handleFilterChange}
                cluster={currentCluster}
                filter={filter}
                error={error}
                connected={connected}
              />
              <ClusterCapacityMetrics
                filter={filter}
                cluster={currentCluster}
              />
              <ClusterUsageMetrics filter={filter} cluster={currentCluster} />
              <ClusterFailureMetrics filter={filter} cluster={currentCluster} />
              <ClusterLatencyMetrics filter={filter} cluster={currentCluster} />
              <div className="mt-5 mr-2">
                <ClusterActiveQueriesTable
                  cluster={currentCluster}
                  filter={filter}
                />
              </div>
              <div className="mt-5 mr-2">
                <ClusterActiveWorkersTable
                  cluster={currentCluster}
                  filter={filter}
                />
              </div>
            </Fragment>
          )}
        </Container>
        <AddNewClusterWrapper
          open={clusterDialog}
          onClose={closeAddClusterDialog}
        />
      </AdminLayout>
    </EnsureLoginRoute>
  );
};

export default ClusterPage;
