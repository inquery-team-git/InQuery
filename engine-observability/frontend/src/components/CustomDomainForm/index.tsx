/* eslint-disable no-underscore-dangle */
/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';

import type { CustomDomainParams } from './CustomDomain';
import FormComponent from './Form';
import validate from './validate';

interface CustomDomainFormProps {
  handleSubmit: (values: CustomDomainParams) => void;
  processing?: boolean;
  error?: string;
  className?: string;
  initialValues: CustomDomainParams;
}

const CustomDomainForm = ({
  initialValues,
  handleSubmit,
  processing,
  className,
}: CustomDomainFormProps) => {
  const onSubmit = (values: CustomDomainParams) => {
    handleSubmit(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const isFormChanged = true;
        return (
          <Form className={className}>
            <FormComponent
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            <Grid item sm={12} md={12}>
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
                Save Changes
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomDomainForm;
