/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';

import TextInput from '@/components/ReduxFields/TextInput';

import type { UserProfileParams } from './UserProfile';
import validate from './validate';

interface UserProfileFormProps {
  handleLogin: (values: UserProfileParams) => void;
  initialValues: UserProfileParams;
  processing?: boolean;
  error?: string;
  className?: string;
}

const UserProfileForm = ({
  initialValues,
  handleLogin,
  processing,
  className,
}: UserProfileFormProps) => {
  const onSubmit = (values: UserProfileParams) => {
    handleLogin(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const isFormChanged =
          initialValues.firstName !== values.firstName ||
          initialValues.lastName !== values.lastName;
        return (
          <Form className={className}>
            <Grid
              container
              direction={'column'}
              className="m-0"
              style={{ maxWidth: '800px' }}
            >
              <Grid item className="gridItem fullWidth" sm={12} md={12}>
                <label className="form-control-label" htmlFor="input-email">
                  Email address
                </label>
                <TextInput
                  name="email"
                  type="email"
                  className="textField"
                  inputProps={{
                    style: {
                      height: '15px',
                    },
                  }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: '350px',
                  }}
                  placeholder="jesse@example.com"
                  disabled
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email && Boolean(errors.email)}
                  errorMsg={errors.email && touched.email && errors.email}
                />
              </Grid>
              <Grid item container sm={12} md={12}>
                <Grid item className="gridItem fullWidth" xs={12} md={6}>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    First name
                  </label>
                  <TextInput
                    name="firstName"
                    className="textField"
                    inputProps={{
                      style: {
                        height: '15px',
                      },
                    }}
                    inputStyle={{
                      width: '100%',
                      maxWidth: '350px',
                    }}
                    placeholder="Lucky"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.firstName &&
                      touched.firstName &&
                      Boolean(errors.firstName)
                    }
                    errorMsg={
                      errors.firstName && touched.firstName && errors.firstName
                    }
                  />
                </Grid>
                <Grid item className="gridItem fullWidth" xs={12} md={6}>
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    Last name
                  </label>
                  <TextInput
                    name="lastName"
                    className="textField"
                    inputProps={{
                      style: {
                        height: '15px',
                      },
                    }}
                    inputStyle={{
                      width: '100%',
                      maxWidth: '350px',
                    }}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jesse"
                    error={
                      errors.lastName &&
                      touched.lastName &&
                      Boolean(errors.lastName)
                    }
                    errorMsg={
                      errors.lastName && touched.lastName && errors.lastName
                    }
                  />
                </Grid>
              </Grid>

              <Grid item className="gridItem fullWidth">
                <Button
                  variant="contained"
                  color="primary"
                  className="submitButton"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    transition: 'all 0.1s ease-in-out',
                    minWidth: '150px',
                    minHeight: '48px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '16.5px',
                    lineHeight: '20px',
                    textTransform: 'none',
                  }}
                  type="submit"
                  disabled={processing || !isFormChanged}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserProfileForm;
