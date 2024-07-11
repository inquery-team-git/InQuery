/* eslint-disable tailwindcss/no-custom-classname */
// import GitHubIcon from '@mui/icons-material/GitHub';
// import GoogleIcon from '@mui/icons-material/Google';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash/fp';
import React, { useState } from 'react';

import NavTextLink from '@/components/Buttons/NavTextButton';
import TextInput from '@/components/ReduxFields/TextInput';

import type { UserSignupParams } from './UserSignup';
import validate from './validate';

interface UserSignupFormProps {
  handleEmailSignup: (values: UserSignupParams) => void;
  processing?: boolean;
  errorMsg?: string;
  successMsg?: string;
}

const UserSignupForm = (props: UserSignupFormProps) => {
  const [agreeTerms, setAgreeTerms] = useState(true);
  const { handleEmailSignup, errorMsg: apiError, successMsg } = props;

  const handleAuthChange = (event: any) => {
    setAgreeTerms(event.target.checked);
  };

  const onSubmit = (values: UserSignupParams) => {
    handleEmailSignup({
      ...values,
      terms: agreeTerms,
      authType: 'EMAIL',
      companyDescription: 'Company Info',
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        companyName: '',
        companySubdomain: '',
        terms: true,
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid container direction={'column'} alignItems={'center'}>
            <Grid item className="signupHeader fullWidth">
              <h1>Easily mangae your knowledge base</h1>
              <p>Get started with InQuery for free</p>
            </Grid>
            {successMsg && (
              <Grid item className="fullWidth">
                <div className="noticeMessage">{successMsg}</div>
              </Grid>
            )}
            <Grid item container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="firstName"
                  type="text"
                  label="First Name"
                  inputClassName="fullWidth textField"
                  inputProps={{
                    style: {
                      height: '17px',
                    },
                  }}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  errorMsg={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="lastName"
                  type="text"
                  label="Last Name"
                  inputClassName="fullWidth textField"
                  inputProps={{
                    style: {
                      height: '17px',
                    },
                  }}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  errorMsg={touched.lastName && errors.lastName}
                />
              </Grid>
            </Grid>
            <Grid item className="fullWidth">
              <TextInput
                name="email"
                type="email"
                label="Work Email Address"
                inputClassName="fullWidth textField"
                inputProps={{
                  style: {
                    height: '17px',
                  },
                }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                errorMsg={touched.email && errors.email}
              />
            </Grid>
            <Grid item className="fullWidth">
              <TextInput
                name="companyName"
                label="Company/APP Name"
                inputClassName="fullWidth textField"
                inputProps={{
                  style: {
                    height: '17px',
                  },
                }}
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyName && Boolean(errors.companyName)}
                errorMsg={touched.companyName && errors.companyName}
              />
            </Grid>
            <Grid item className="fullWidth">
              <TextInput
                name="companySubdomain"
                label="Subdomain"
                inputClassName="fullWidth textField"
                inputProps={{
                  style: {
                    height: '17px',
                  },
                }}
                value={values.companySubdomain}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.companySubdomain && Boolean(errors.companySubdomain)
                }
                errorMsg={touched.companySubdomain && errors.companySubdomain}
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
                error={touched.password && Boolean(errors.password)}
                errorMsg={touched.password && errors.password}
              />
            </Grid>
            <Grid item className="fullWidth">
              <FormControlLabel
                control={<Checkbox checked={agreeTerms} />}
                label={
                  <NavTextLink
                    description={'I agree to the'}
                    linkText={'terms of use'}
                    path={'/terms'}
                    className="textLink"
                    float="none"
                  />
                }
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
                disabled={props.processing || !isEmpty(errors) || !agreeTerms}
              >
                Create Account
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

            <Divider variant="fullWidth" className="divider">
              OR
            </Divider>
            <Grid item className="authButtons fullWidth">
              <Button
                color="primary"
                className="authButton"
                onClick={(e) => e.preventDefault()}
                startIcon={<GoogleIcon color="primary" />}
              >
                Continue with Google
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserSignupForm;
