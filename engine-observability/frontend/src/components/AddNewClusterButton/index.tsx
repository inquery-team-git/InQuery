import AddIcon from '@mui/icons-material/Add';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { OverridableStringUnion } from '@mui/types';
import React, { Fragment, useState } from 'react';

import AddNewClusterWrapper from '@/components/AddNewCluster';

interface MuiButtonProps {
  label: React.ReactNode;
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

interface AddClusterButtonWrapperProps {}

const AddClusterButtonWrapper = (_props: AddClusterButtonWrapperProps) => {
  const [open, setNewClusterDialog] = useState(false);

  const openDialog = () => {
    setNewClusterDialog(true);
  };

  const closeDialog = () => {
    setNewClusterDialog(false);
  };

  return (
    <Fragment>
      <MuiButton
        label="Add Cluster"
        onClick={openDialog}
        startIcon={<AddIcon />}
      />
      <AddNewClusterWrapper open={open} onClose={closeDialog} />
    </Fragment>
  );
};

export default AddClusterButtonWrapper;
