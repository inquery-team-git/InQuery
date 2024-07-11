/* eslint-disable tailwindcss/no-custom-classname */
import Alert from '@mui/material/Alert';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import type { OverridableStringUnion } from '@mui/types';
import { Form, Formik } from 'formik';
import React from 'react';

import TextInput from '@/components/ReduxFields/TextInput';

import type { NewClusterFormParams } from './NewClusterForm';
import validate from './validate';

interface ActionButtonProps {
  label: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  endIcon?: React.ReactNode;
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >;
}

const ActionButton = (props: ActionButtonProps) => {
  const { variant, onClick, endIcon, label, ...otherProps } = props;
  const bVariant = variant || 'outlined';
  return (
    <Button
      variant={bVariant}
      color="primary"
      sx={{
        textAlign: 'center',
        padding: '4px 16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: bVariant === 'contained' ? '#FFFFFF' : '#000000',
        background: bVariant === 'contained' ? '#000000' : '#FFFFFF',
        cursor: 'pointer',
        borderRadius: '15px',
        border: ['contained', 'text'].includes(bVariant)
          ? 'none'
          : '1px solid #000000',
        transition: 'all 0.1s ease-in-out',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        textTransform: 'none',
        marginLeft: '15px',
        minHeight: '40px',
        minWidth: '120px',
      }}
      onClick={onClick}
      endIcon={endIcon}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

interface NewClusterFormProps {
  processing?: boolean;
  errorMsg?: string;
  successMsg?: string;
  className?: string;
  handleNewCluster: (values: NewClusterFormParams) => void;
  testClusterConnection: (values: NewClusterFormParams) => void;
}

const NewClusterForm = (props: NewClusterFormProps) => {
  const {
    errorMsg: apiError,
    successMsg,
    className,
    handleNewCluster,
    testClusterConnection,
  } = props;

  const onSubmit = (values: NewClusterFormParams) => {
    handleNewCluster(values);
  };
  console.log(apiError);

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        host: '',
        port: 8080,
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <Form className={className}>
            <Grid
              container
              direction={'column'}
              className="m-0"
              style={{ maxWidth: '800px' }}
            >
              <Grid item className="fullWidth">
                {(successMsg || apiError) && (
                  <Alert severity={apiError ? 'error' : 'success'}>
                    {successMsg || apiError}
                  </Alert>
                )}
              </Grid>
              <Grid
                item
                container
                spacing={2}
                style={{
                  marginTop: '0px',
                }}
              >
                <Grid
                  item
                  className="gridItem fullWidth"
                  xs={12}
                  sm={6}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <label className="form-control-label" htmlFor="input-email">
                    Cluster Name
                  </label>
                  <TextInput
                    name="name"
                    type="name"
                    className="textField"
                    inputProps={{
                      style: {
                        height: '15px',
                      },
                    }}
                    inputStyle={{
                      width: '100%',
                    }}
                    style={{
                      margin: '0px',
                    }}
                    placeholder="Staging Adhoc"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    errorMsg={touched.name && errors.name}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                style={{
                  marginTop: '0px',
                }}
              >
                <Grid
                  item
                  className="gridItem fullWidth"
                  xs={12}
                  sm={6}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Host
                  </label>
                  <TextInput
                    name="host"
                    className="textField"
                    inputProps={{
                      style: {
                        height: '15px',
                      },
                    }}
                    inputStyle={{
                      width: '100%',
                    }}
                    style={{
                      margin: '0px',
                    }}
                    placeholder="127.0.0.1"
                    value={values.host}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.host && Boolean(errors.host)}
                    errorMsg={touched.host && errors.host}
                  />
                </Grid>
                <Grid
                  item
                  className="gridItem fullWidth"
                  xs={12}
                  sm={6}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    Port
                  </label>
                  <TextInput
                    name="port"
                    type="text"
                    className="textField"
                    inputProps={{
                      style: {
                        height: '15px',
                      },
                    }}
                    inputStyle={{
                      width: '100%',
                    }}
                    style={{
                      margin: '0px',
                    }}
                    value={values.port}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="8080"
                    error={touched.port && Boolean(errors.port)}
                    errorMsg={touched.port && errors.port}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                style={{
                  marginTop: '0px',
                }}
              >
                <Grid
                  item
                  className="gridItem fullWidth"
                  xs={12}
                  sm={12}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <label className="form-control-label" htmlFor="input-email">
                    Cluster Description
                  </label>
                  <TextInput
                    name="description"
                    type="description"
                    className="textField"
                    inputProps={{
                      style: {
                        height: '15px',
                      },
                    }}
                    inputStyle={{
                      width: '100%',
                    }}
                    style={{
                      margin: '0px',
                    }}
                    placeholder="Staging Adhoc"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    errorMsg={touched.description && errors.description}
                    multiline
                    minRows={3}
                  />
                </Grid>
              </Grid>
              <Grid item className="gridItem fullWidth">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  <ActionButton
                    onClick={() => testClusterConnection(values)}
                    label={'Test Connection'}
                    variant="outlined"
                  />

                  <ActionButton
                    label={'Add Cluster'}
                    variant="contained"
                    type="submit"
                  />
                </div>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewClusterForm;
