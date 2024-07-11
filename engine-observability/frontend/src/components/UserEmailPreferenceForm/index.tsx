/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';

import RadioButtonGroup from '../FormGroups/RadioButton';
import type { UserEmailPreferenceParams } from './UserEmailPreference';
import validate from './validate';

interface UserEmailPreferenceFormProps {
  handleSubmit: (values: UserEmailPreferenceParams) => void;
  initialValues: UserEmailPreferenceParams;
  processing?: boolean;
  error?: string;
  className?: string;
}

const UserEmailPreferenceForm = ({
  initialValues,
  handleSubmit,
  processing,
  className,
}: UserEmailPreferenceFormProps) => {
  const onSubmit = (values: UserEmailPreferenceParams) => {
    handleSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange }) => {
        const isFormChanged =
          initialValues.reportFrequency !== values.reportFrequency;
        return (
          <Form className={className}>
            <Grid
              container
              direction={'column'}
              className="m-0"
              style={{ maxWidth: '800px' }}
            >
              <Grid item className="gridItem fullWidth" sm={12} md={12}>
                <RadioButtonGroup
                  config={{
                    title: 'Receive admin reports:',
                    items: [
                      { text: 'Daily', value: 'DAILY' },
                      { text: 'Weekly', value: 'WEEKLY' },
                      { text: 'Never', value: 'NEVER' },
                    ],
                    value: values.reportFrequency,
                    onChange: handleChange,
                    error: (errors.reportFrequency &&
                      touched.reportFrequency &&
                      Boolean(errors.reportFrequency)) as boolean,
                    errorMsg: (errors.reportFrequency &&
                      touched.reportFrequency &&
                      errors.reportFrequency) as string,
                    name: 'reportFrequency',
                  }}
                />
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
                    minWidth: '130px',
                    minHeight: '40px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '16.5px',
                    lineHeight: '20px',
                    textTransform: 'none',
                    margin: '20px 0',
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

export default UserEmailPreferenceForm;
