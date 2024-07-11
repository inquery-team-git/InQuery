'use-client';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import QueryHistoryComponent from '@/components/QueryHistory';
import type { Option } from '@/components/QueryHistory/Sidebar';
import { getClusterList } from '@/data/cluster.data';
import AdminLayout from '@/layouts/Admin';
import type { ErrorProps, ICluster } from '@/types';

const QueryHistroyPage = () => {
  const [clusterOptions, setClusterOptions] = useState<Option[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLoading = (value: boolean) => {
    setLoading(value);
  };

  const onError = (err: string | ErrorProps) => {
    setError(_.isObject(err) ? err.message : err);
  };

  const onFetchClusterListSuccess = (res: any) => {
    const clusters: ICluster[] = res.data;
    if (clusters && clusters.length) {
      const options = _.map(clusters, (c) => ({
        text: c.name,
        value: c.id,
      }));
      setClusterOptions(options);
    }
  };

  const handleFetchClusterList = () => {
    if (loading) return false;
    return getClusterList().then(onFetchClusterListSuccess, onError);
  };

  useEffect(() => {
    handleFetchClusterList();
  }, []);

  return (
    <EnsureLoginRoute>
      <AdminLayout
        containerStyle={{
          padding: '0px',
        }}
        loading={loading}
      >
        <Container
          fluid
          style={{
            height: '100%',
            paddingLeft: '5px !important',
          }}
        >
          <QueryHistoryComponent
            clusterOptions={clusterOptions}
            handleLoading={toggleLoading}
          />
        </Container>
      </AdminLayout>
    </EnsureLoginRoute>
  );
};

export default QueryHistroyPage;
