/* eslint-disable tailwindcss/no-custom-classname */
// import GitHubIcon from '@mui/icons-material/GitHub';
// import GoogleIcon from '@mui/icons-material/Google';
import {
  Checkbox,
  // Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import NavTextLink from '@/components/Buttons/NavTextButton';
import TextInput from '@/components/ReduxFields/TextInput';

import type { UserLoginParams } from './UserLogin';
import validate from './validate';

interface UserLoginFormProps {
  handleLogin: (values: UserLoginParams) => void;
  processing?: boolean;
  errorMsg?: string;
}

const UserLoginForm = (props: UserLoginFormProps) => {
  const [rememberMe, setRememberMe] = useState(true);
  const { handleLogin, errorMsg: apiError } = props;

  const handleAuthChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const onSubmit = (values: UserLoginParams) => {
    handleLogin({ ...values, rememberMe });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid container direction={'column'} alignItems={'center'}>
            <Grid
              item
              className="loginHeader fullWidth"
              style={{ marginBottom: '10px' }}
            >
              <h1>Login</h1>
            </Grid>
            {/* <Grid item className="authButtons fullWidth">
              <Button
                color="primary"
                className="authButton"
                onClick={(e) => e.preventDefault()}
                startIcon={<GoogleIcon color="primary" />}
              >
                Log in with Google
              </Button>
              <Button
                color="primary"
                className="authButton"
                onClick={(e) => e.preventDefault()}
                startIcon={<GitHubIcon color="primary" />}
              >
                Log in with Github
              </Button>
            </Grid>
            <Divider variant="fullWidth" className="divider">
              Login in with Email
            </Divider> */}
            <Grid item className="fullWidth">
              <TextInput
                name="email"
                type="email"
                label="Email"
                inputClassName="fullWidth textField"
                inputProps={{
                  style: {
                    height: '17px',
                  },
                }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email && Boolean(errors.email)}
                errorMsg={errors.email && touched.email && errors.email}
              />
            </Grid>
            <Grid item className="fullWidth">
              <TextInput
                name="password"
                type="password"
                label="Password"
                inputClassName="textField"
                inputProps={{
                  style: {
                    height: '17px',
                  },
                }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.password &&
                  touched.password &&
                  Boolean(errors.password)
                }
                errorMsg={
                  errors.password && touched.password && errors.password
                }
              />
            </Grid>
            <Grid item className="fullWidth">
              <FormControlLabel
                control={<Checkbox checked={rememberMe} />}
                label="Remember Me"
                onClick={handleAuthChange}
              />
            </Grid>
            <Grid item className="fullWidth" style={{ marginBottom: '10px' }}>
              {apiError && (
                <FormHelperText
                  className="text-danger"
                  style={{ fontSize: '14px' }}
                >
                  {apiError}
                </FormHelperText>
              )}
            </Grid>
            <Grid item className="gridItem fullWidth">
              <Button
                variant="contained"
                color="primary"
                className="submitButton"
                fullWidth
                type="submit"
                disabled={props.processing}
              >
                Log in
              </Button>
            </Grid>
            <Grid item style={{ padding: '0 30px' }}>
              <NavTextLink
                description={'Forgot your password? You can reset it'}
                linkText={'here'}
                path={'/forgot-password'}
                className="textLink"
                float="none"
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserLoginForm;
