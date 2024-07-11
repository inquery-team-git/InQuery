import { FormHelperText, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';

import NavTextLink from '@/components/Buttons/NavTextButton';

import TextInput from '../ReduxFields/TextInput';
import type { PasswordResetParams } from './PasswordReset';
import validate from './validate';

interface PasswordResetFormProps {
  handlePasswordReset: (values: PasswordResetParams) => void;
  processing?: boolean;
  successMsg?: string;
  errorMsg?: string;
}

const PasswordResetForm = (props: PasswordResetFormProps) => {
  const { handlePasswordReset, errorMsg: apiError, successMsg } = props;

  const onSubmit = (values: PasswordResetParams) => {
    handlePasswordReset({ ...values });
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
            <Grid item className="forgotPasswordHeader fullWidth">
              <h1>Password reset</h1>
              <p>Enter your email below to reset your password</p>
            </Grid>
            {successMsg && (
              <Grid item className="fullWidth">
                <div className="noticeMessage">{successMsg}</div>
              </Grid>
            )}
            <Grid item className="gridItem fullWidth">
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
                Reset Password
              </Button>
            </Grid>
            <Grid item style={{ padding: '0 30px' }}>
              <NavTextLink
                description={'Back to'}
                linkText={'login'}
                path={'/login'}
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

export default PasswordResetForm;
