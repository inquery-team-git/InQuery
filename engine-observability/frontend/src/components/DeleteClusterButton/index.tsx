import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { OverridableStringUnion } from '@mui/types';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';

import { deleteCluster } from '@/data/cluster.data';
import type { ErrorProps } from '@/types';

import MaterialDialog from '../Dialog';

interface MuiButtonProps {
  label?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  startIcon?: React.ReactNode;
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >;
}

const MuiButton = (props: MuiButtonProps) => {
  const variant = props.variant || 'outlined';
  return (
    <Button
      variant={variant}
      color="primary"
      sx={{
        textAlign: 'center',
        padding: '4px 16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#525151',
        cursor: 'pointer',
        borderRadius: '15px',
        border: variant === 'text' ? 'none' : '1px solid #D9D9D9',
        transition: 'all 0.1s ease-in-out',
        minWidth: 'max-content',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        textTransform: 'none',
        marginLeft: '15px',
        height: 'fit-content',
      }}
      onClick={props.onClick}
      startIcon={props.startIcon}
    >
      {props.label}
    </Button>
  );
};

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

interface DeleteClusterButtonWrapperProps {
  clusterId: string;
  cluster: ClusterData;
  onDeleteSuccess?: () => void;
  hideLabel?: boolean;
}

const DeleteClusterButtonWrapper = (props: DeleteClusterButtonWrapperProps) => {
  const { cluster, clusterId, hideLabel = false, onDeleteSuccess } = props;
  const [open, setNewClusterDialog] = useState(false);

  const openDialog = () => {
    setNewClusterDialog(true);
  };

  const closeDialog = () => {
    setNewClusterDialog(false);
  };

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setSuccessMsg('');
    setErrorMsg(_.isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const onSuccess = () => {
    // set redux state
    setErrorMsg('');
    setSuccessMsg('Cluster deleted successfully!');
    setProcessing(false);
    closeDialog();
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  const handleDeleteCluster = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setProcessing(true);
    return deleteCluster(clusterId).then(onSuccess, onError);
  };

  return (
    <Fragment>
      {hideLabel ? (
        <Tooltip title="Delete Cluster">
          <IconButton onClick={openDialog}>
            <DeleteForeverRoundedIcon htmlColor="#ff3d00" />
          </IconButton>
        </Tooltip>
      ) : (
        <MuiButton
          label="Delete Cluster"
          onClick={openDialog}
          startIcon={<DeleteForeverRoundedIcon />}
        />
      )}
      <MaterialDialog
        confirm={handleDeleteCluster}
        close={closeDialog}
        open={open}
        title="Delete Cluster"
        description={`Are you sure you want to remove Observability for the cluster with the following details?\nCluster Address: ${cluster.host_port}\n\nNote: Once deleted, it cannot be recovered!`}
        cancelBtnText="No"
        confirmBtnText="Yes"
        disableConfirmBtn={processing}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    </Fragment>
  );
};

export default DeleteClusterButtonWrapper;
