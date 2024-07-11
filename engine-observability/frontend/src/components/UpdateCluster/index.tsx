import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import cn from 'classnames';
import _ from 'lodash';
import { useState } from 'react';

import { testClusterConnection, updateCluster } from '@/data/cluster.data';
import type { ErrorProps } from '@/types';

import UpdateClusterForm from './Form';
import type { UpdateClusterFormParams } from './UpdateClusterForm';

export interface ClusterData {
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

interface UpdateClusterWrapperProps {
  clusterId: string;
  cluster: ClusterData;
  open: boolean;
  onClose: () => void;
  onUpdateSuccess?: () => void;
  paperClassName?: string;
}

const UpdateClusterWrapper = (props: UpdateClusterWrapperProps) => {
  const { cluster, clusterId, onClose, onUpdateSuccess } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setErrorMsg(_.isObject(err) ? err.message : err);
    setSuccessMsg('');
    setProcessing(false);
  };

  const onSuccess = () => {
    // set redux state
    setErrorMsg('');
    setProcessing(false);
    setSuccessMsg('Cluster updated successfully!');
    onClose();
    if (onUpdateSuccess) {
      onUpdateSuccess();
    }
  };

  const onConnectionSuccess = () => {
    // set redux state
    setErrorMsg('');
    setProcessing(false);
    setSuccessMsg('Connected');
  };

  const handleUpdateCluster = (values: UpdateClusterFormParams) => {
    setErrorMsg('');
    setSuccessMsg('');
    setProcessing(true);
    const updates: UpdateClusterFormParams = {};
    if (cluster.name !== values.name) {
      updates.name = values.name;
    }
    if (cluster.host !== values.host) {
      updates.host = values.host;
    }
    if (cluster.port !== values.port) {
      // eslint-disable-next-line radix
      updates.port = parseInt(values.port as unknown as string);
    }
    if (cluster.description !== values.description) {
      updates.description = values.description;
    }
    if (cluster.enabled !== values.enabled) {
      updates.enabled = values.enabled;
    }
    if (_.isEmpty(updates)) return false;
    return updateCluster(clusterId, updates).then(onSuccess, onError);
  };

  const handleClusterConnection = (values: UpdateClusterFormParams) => {
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
        <h2>{'Update Cluster'}</h2>
        <IconButton onClick={props.onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <DialogContent style={{ padding: '0 20px 20px' }}>
        <UpdateClusterForm
          handleUpdateCluster={handleUpdateCluster}
          testClusterConnection={handleClusterConnection}
          processing={processing}
          errorMsg={errorMsg}
          successMsg={successMsg}
          cluster={props.cluster}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateClusterWrapper;
