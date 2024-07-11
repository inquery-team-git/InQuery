'use-client';

/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import { isObject } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import PasswordResetForm from '@/components/PasswordResetForm';
import type { PasswordResetParams } from '@/components/PasswordResetForm/PasswordReset';
import AuthLayout from '@/layouts/Auth';
import type { ErrorProps } from '@/types';

function ForgotPassword() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setErrorMsg(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const onSuccess = () => {
    // set redux state
    setErrorMsg('');
    setProcessing(false);
    setSuccessMsg('Password reset request sent');
    router.push('/login');
  };

  const sendPasswordResetLink = async (_values: PasswordResetParams) => {
    return true;
  };

  const handlePasswordReset = (values: PasswordResetParams) => {
    setErrorMsg('');
    setProcessing(true);
    return sendPasswordResetLink(values).then(onSuccess, onError);
  };

  return (
    <div className="forgotPassword">
      <AuthLayout className="navBar">
        <div className="columnsWrapper">
          <div className="leftColumn">
            <Grid
              container
              className="forgotPasswordWrapper"
              direction={'column'}
            >
              <Grid item className="muiCard">
                <PasswordResetForm
                  handlePasswordReset={handlePasswordReset}
                  processing={processing}
                  errorMsg={errorMsg}
                  successMsg={successMsg}
                />
              </Grid>
            </Grid>
          </div>
          <div className="rightColumn">
            <div className="rightColumnInner">
              <img
                src="https://getlog.co/site/img/browser-window.png"
                alt="Getlog"
              />
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}

export default ForgotPassword;
