'use-client';

import HomeIcon from '@mui/icons-material/Home';
import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container } from 'reactstrap';

import AddClusterButtonWrapper from '@/components/AddNewClusterButton';
import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import ClustersListTable from '@/components/ClustersListTable';
import CustomizedBreadcrumbs from '@/components/MuiBreadcrumbs';
import AdminLayout from '@/layouts/Admin';
// import { TimestampFilter } from "@/types";
// import { DEFAULT_TIME_FILTER } from "@/constants";

const ClusterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClusterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (event.target.value === 'create_cluster') {
      console.info('Create Cluster', event.target.value);
    } else {
      router.push(`/admin/cluster/${event.target.value}`);
      console.info('You clicked a cluster.', event.target.value);
    }
  };

  const toggleLoading = (value: boolean) => {
    setLoading(value);
  };

  const pageHeaderData = [
    {
      label: 'InQuery',
      disabled: true,
      href: '#',
      actions: [],
      startIcon: <HomeIcon fontSize="small" style={{ color: '#FFF' }} />,
    },
  ];

  return (
    <EnsureLoginRoute>
      <AdminLayout loading={loading}>
        <Container
          className="mt-1"
          fluid
          style={{ position: 'relative', width: '100%', height: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CustomizedBreadcrumbs
              crumbs={pageHeaderData}
              selecPlaceholder="Select Cluster"
              onSelectItem={handleClusterChange}
              selectOptions={[]}
            />
            <AddClusterButtonWrapper />
          </div>
          <Divider />
          <ClustersListTable handleLoading={toggleLoading} />
        </Container>
      </AdminLayout>
    </EnsureLoginRoute>
  );
};

export default ClusterPage;
