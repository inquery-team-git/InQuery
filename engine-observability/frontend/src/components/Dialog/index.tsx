import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Alert from '@mui/material/Alert';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import type { OverridableStringUnion } from '@mui/types';
import cn from 'classnames';
import React from 'react';

interface ActionButtonProps {
  label: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  endIcon?: React.ReactNode;
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >;
  disabled?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
  const { variant, onClick, endIcon, label, ...otherProps } = props;
  const bVariant = variant || 'outlined';
  return (
    <Button
      variant={bVariant}
      color="primary"
      sx={{
        textAlign: 'center',
        padding: '4px 16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: bVariant === 'contained' ? '#FFFFFF' : '#000000',
        background: bVariant === 'contained' ? '#000000' : '#FFFFFF',
        cursor: 'pointer',
        borderRadius: '15px',
        border: ['contained', 'text'].includes(bVariant)
          ? 'none'
          : '1px solid #000000',
        transition: 'all 0.1s ease-in-out',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        textTransform: 'none',
        marginLeft: '15px',
        minHeight: '40px',
        minWidth: '120px',
      }}
      onClick={onClick}
      endIcon={endIcon}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

interface MaterialDialogProps {
  confirm?: Function;
  close?: Function;
  open: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
  cancelBtnText?: React.ReactNode;
  confirmBtnText?: React.ReactNode;
  paperClassName?: string;
  errorMsg?: string;
  successMsg?: string;
  disableConfirmBtn: boolean;
}

const MaterialDialog = (props: MaterialDialogProps) => {
  const {
    open = false,
    confirm,
    close,
    title,
    description,
    cancelBtnText,
    confirmBtnText,
    paperClassName,
    successMsg,
    errorMsg,
    disableConfirmBtn,
  } = props;

  const handleConfirm = () => {
    if (confirm) {
      confirm();
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <Dialog
      open={open && open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      classes={{
        paper: cn('dialog-paper', paperClassName),
      }}
      className="material-dialog"
    >
      <DialogTitle id="dialog-title" className="dialog-title">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h2>{title}</h2>
          {close && (
            <IconButton onClick={close as () => void}>
              <CloseRoundedIcon />
            </IconButton>
          )}
        </div>
      </DialogTitle>
      <DialogContent>
        {(successMsg || errorMsg) && (
          <Alert severity={errorMsg ? 'error' : 'success'}>
            {successMsg || errorMsg}
          </Alert>
        )}
        {typeof description === 'string' ? (
          <DialogContentText
            id="dialog-description"
            className="dialog-description"
            style={{
              marginTop: '5px',
              whiteSpace: 'break-spaces',
            }}
          >
            {description}
          </DialogContentText>
        ) : (
          description
        )}
      </DialogContent>
      {confirm && close && (
        <DialogActions style={{ padding: '20px' }}>
          {close && (
            <ActionButton
              onClick={handleClose}
              label={cancelBtnText || 'No'}
              variant="outlined"
            />
          )}
          {confirm && (
            <ActionButton
              label={confirmBtnText || 'Yes'}
              variant="contained"
              onClick={handleConfirm}
              disabled={disableConfirmBtn}
            />
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MaterialDialog;
