'use-client';

/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import { isObject } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import UserSignupForm from '@/components/UserSignupForm';
import type { UserSignupParams } from '@/components/UserSignupForm/UserSignup';
import { signupUser } from '@/data/auth.data';
import AuthLayout from '@/layouts/Auth';
import type { ErrorProps } from '@/types';

function Signup() {
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
    setSuccessMsg('Signed up successfully!');
    router.push('/login');
  };

  const handleEmailSignup = (values: UserSignupParams) => {
    setErrorMsg('');
    setProcessing(true);
    return signupUser(values).then(onSuccess, onError);
  };

  return (
    <div className="signup">
      <AuthLayout className="navBar">
        <div className="columnsWrapper">
          <div className="leftColumn">
            <Grid container className="signupWrapper" direction={'column'}>
              <Grid item className="muiCard">
                <UserSignupForm
                  handleEmailSignup={handleEmailSignup}
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

export default Signup;
