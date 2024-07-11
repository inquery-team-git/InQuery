import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { isObject } from 'lodash';
import React, { Fragment, useState } from 'react';

import { getQueryRecommendations } from '@/data/query.data';
import type { ErrorProps } from '@/types';

import RecommendationWrapper from './Recommender';

interface QueryRecommendationsProps {
  query: string;
}

const QueryRecommendations = (props: QueryRecommendationsProps) => {
  const [open, showDialog] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const openDialog = () => {
    showDialog(true);
  };

  const closeDialog = () => {
    showDialog(false);
  };

  const onError = (err: string | ErrorProps) => {
    setErrorMsg(isObject(err) ? err.message : err);
    setSuccess(false);
    setProcessing(false);
  };

  const onSuccess = (data: any) => {
    setRecommendations(data.recommendations);
    setErrorMsg('');
    setSuccess(true);
    setProcessing(false);
    openDialog();
  };

  const handleQueryRecommendations = () => {
    setErrorMsg('');
    setSuccess(false);
    setProcessing(true);
    return getQueryRecommendations('').then(onSuccess, onError);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: '#4CAF51',
      color: '#FFFFFF',
      '&:hover': {
        bgcolor: '#4CAF51',
      },
    }),
  };

  return (
    <Fragment>
      <div>
        {success ? (
          <Tooltip title="Query Recommendations">
            <IconButton
              onClick={openDialog}
              sx={{
                marginLeft: '15px',
                ...buttonSx,
              }}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Generate Query Recommendations">
            <IconButton
              onClick={handleQueryRecommendations}
              sx={{
                marginLeft: '15px',
              }}
            >
              <AutoFixHighIcon htmlColor="#000" />
            </IconButton>
          </Tooltip>
        )}

        {processing && (
          <CircularProgress
            size={33}
            sx={{
              color: '#4CAF51',
              position: 'absolute',
              top: 2,
              left: 17,
              zIndex: 1,
            }}
          />
        )}
      </div>
      <RecommendationWrapper
        open={open}
        onClose={closeDialog}
        recommendations={recommendations}
        query={props.query}
      />
    </Fragment>
  );
};

export default QueryRecommendations;
