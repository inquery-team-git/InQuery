import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import cn from 'classnames';
import { isObject } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { addNewCluster, testClusterConnection } from '@/data/cluster.data';
import type { ErrorProps } from '@/types';

import NewClusterForm from './Form';
import type { NewClusterFormParams } from './NewClusterForm';

interface AddNewClusterWrapperProps {
  open: boolean;
  onClose: () => void;
  paperClassName?: string;
}

const AddNewClusterWrapper = (props: AddNewClusterWrapperProps) => {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setErrorMsg(isObject(err) ? err.message : err);
    setSuccessMsg('');
    setProcessing(false);
  };

  const onSuccess = (data: any) => {
    // set redux state
    setErrorMsg('');
    setProcessing(false);
    setSuccessMsg('Cluster addedd successfully!');
    router.push(`/admin/cluster/${data.id}`);
  };

  const onConnectionSuccess = () => {
    // set redux state
    setErrorMsg('');
    setProcessing(false);
    setSuccessMsg('Connected');
  };

  const handleNewCluster = (values: NewClusterFormParams) => {
    setErrorMsg('');
    setSuccessMsg('');
    setProcessing(true);
    return addNewCluster({
      ...values,
      // eslint-disable-next-line radix
      port: parseInt(values.port as unknown as string),
    }).then(onSuccess, onError);
  };

  const handleClusterConnection = (values: NewClusterFormParams) => {
    if (values.host && values.port) {
      setErrorMsg('');
      setSuccessMsg(`Connecting to ${values.host}:${values.port}`);
      setProcessing(true);
      testClusterConnection(
        values.host,
        // eslint-disable-next-line radix
        parseInt(values.port as unknown as string)
      ).then(onConnectionSuccess, onError);
    } else {
      setErrorMsg('Enter Cluster host and port');
      setSuccessMsg('');
      setProcessing(false);
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      classes={{
        paper: cn('dialog-paper', props.paperClassName),
      }}
      className="material-dialog"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '20px 20px 0px',
        }}
      >
        <h2>{'Add New Cluster'}</h2>
        <IconButton onClick={props.onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <DialogContent style={{ padding: '0 20px 20px' }}>
        <NewClusterForm
          handleNewCluster={handleNewCluster}
          testClusterConnection={handleClusterConnection}
          processing={processing}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewClusterWrapper;
