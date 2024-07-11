import EditRoundedIcon from '@mui/icons-material/EditRounded';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { OverridableStringUnion } from '@mui/types';
import React, { Fragment, useState } from 'react';

import UpdateClusterWrapper from '@/components/UpdateCluster';

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

interface UpdateClusterButtonWrapperProps {
  clusterId: string;
  cluster: ClusterData;
  onUpdateSuccess?: () => void;
  hideLabel?: boolean;
}

const UpdateClusterButtonWrapper = (props: UpdateClusterButtonWrapperProps) => {
  const { cluster, clusterId, hideLabel = false, onUpdateSuccess } = props;
  const [open, setNewClusterDialog] = useState(false);

  const openDialog = () => {
    setNewClusterDialog(true);
  };

  const closeDialog = () => {
    setNewClusterDialog(false);
  };

  return (
    <Fragment>
      {hideLabel ? (
        <Tooltip title="Update Cluster">
          <IconButton onClick={openDialog}>
            <EditRoundedIcon htmlColor="#03a9f4" />
          </IconButton>
        </Tooltip>
      ) : (
        <MuiButton
          label={'Update Cluster'}
          onClick={openDialog}
          startIcon={<EditRoundedIcon />}
        />
      )}

      <UpdateClusterWrapper
        open={open}
        onClose={closeDialog}
        cluster={cluster}
        clusterId={clusterId}
        onUpdateSuccess={onUpdateSuccess}
      />
    </Fragment>
  );
};

export default UpdateClusterButtonWrapper;
