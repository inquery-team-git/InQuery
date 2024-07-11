import React, { Fragment, useState } from 'react';

import AddNewClusterWrapper from '@/components/AddNewCluster';

import NoClusterComponent from './component';

interface ClusterOverViewProps {}

const ClusterOverView = (_props: ClusterOverViewProps) => {
  const [open, setNewClusterDialog] = useState(false);

  const openDialog = () => {
    setNewClusterDialog(true);
  };

  const closeDialog = () => {
    setNewClusterDialog(false);
  };

  return (
    <Fragment>
      <NoClusterComponent title="Cluster" openNewClusterDialog={openDialog} />
      <AddNewClusterWrapper open={open} onClose={closeDialog} />
    </Fragment>
  );
};

export default ClusterOverView;
