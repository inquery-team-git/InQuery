'use-client';

/* eslint-disable tailwindcss/no-custom-classname */
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

import AuthLayout from '@/layouts/Auth';

function ResetPassword() {
  return (
    <div className="resetPassword">
      <AuthLayout className="navBar">
        <div className="columnsWrapper">
          <div className="leftColumn">
            <Grid
              container
              className="resetPasswordWrapper"
              direction={'column'}
            >
              <Grid item className="muiCard">
                <Grid container direction={'column'} alignItems={'center'}>
                  <Grid item className="resetPasswordHeader fullWidth">
                    <h1>Reset your password</h1>
                  </Grid>
                  <Grid item className="gridItem fullWidth">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      type="email"
                      variant="outlined"
                      className="textField"
                      inputProps={{
                        style: {
                          height: '17px',
                        },
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="New Password"
                      type="password"
                      variant="outlined"
                      className="textField"
                      inputProps={{
                        style: {
                          height: '17px',
                        },
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      className="textField"
                      inputProps={{
                        style: {
                          height: '17px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item className="gridItem fullWidth">
                    <Button
                      variant="contained"
                      color="primary"
                      className="submitButton"
                      fullWidth
                    >
                      Reset Password
                    </Button>
                  </Grid>
                </Grid>
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

export default ResetPassword;
