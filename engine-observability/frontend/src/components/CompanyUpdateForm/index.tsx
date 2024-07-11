/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';

import TextInput from '@/components/ReduxFields/TextInput';

import type { CompanyUpdateParams } from './CompanyUpdate';
import validate from './validate';

interface CompanyUpdateFormProps {
  handleSubmit: (values: Partial<CompanyUpdateParams>) => void;
  initialValues: Partial<CompanyUpdateParams>;
  processing?: boolean;
  error?: string;
  className?: string;
}

const CompanyUpdateForm = ({
  initialValues,
  handleSubmit,
  processing,
  className,
}: CompanyUpdateFormProps) => {
  const onSubmit = (values: Partial<CompanyUpdateParams>) => {
    handleSubmit(values);
  };

  const handleHexColorFormat = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let { value } = e.currentTarget;
    if (value.length > 0 && value[0] !== '#') {
      value = `#${value}`;
    }
    value = value.replace(/[^#A-Fa-f0-9]/g, '');
    return value;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const isFormChanged =
          initialValues.name !== values.name ||
          initialValues.description !== values.description ||
          initialValues.subdomain !== values.subdomain ||
          initialValues.primaryColor !== values.primaryColor;
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
                  Company Name
                </label>
                <TextInput
                  name="name"
                  inputClassName="textField"
                  inputProps={{
                    style: {
                      height: '15px',
                    },
                  }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: '350px',
                  }}
                  placeholder="Company Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name && Boolean(errors.name)}
                  errorMsg={errors.name && touched.name && errors.name}
                />
              </Grid>
              <Grid item className="gridItem fullWidth" sm={12} md={12}>
                <label className="form-control-label" htmlFor="input-email">
                  Company Description
                </label>
                <TextInput
                  name="description"
                  inputClassName="textField"
                  inputProps={{
                    style: {
                      height: '15px',
                    },
                  }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: '350px',
                  }}
                  placeholder="Company Name"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.description &&
                    touched.description &&
                    Boolean(errors.description)
                  }
                  errorMsg={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />
              </Grid>
              <Grid item container sm={12} md={12}>
                <label
                  className="form-control-label"
                  htmlFor="input-first-name"
                >
                  Sub Domain
                </label>
              </Grid>
              <Grid
                item
                container
                sm={12}
                md={12}
                display="flex"
                alignItems="end"
              >
                <TextInput
                  name="subdomain"
                  inputClassName="textField"
                  inputProps={{
                    style: {
                      height: '15px',
                    },
                  }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: '350px',
                    minWidth: '350px',
                  }}
                  style={{
                    width: 'unset',
                  }}
                  placeholder="subdomain"
                  value={values.subdomain}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.subdomain &&
                    touched.subdomain &&
                    Boolean(errors.subdomain)
                  }
                  errorMsg={
                    errors.subdomain && touched.subdomain && errors.subdomain
                  }
                />
                <div
                  className="d-flex align-items-end mr-3"
                  style={{ margin: '0 15px 17px' }}
                >
                  <label
                    className="form-control-label mb-0"
                    htmlFor="input-email"
                    style={{ letterSpacing: '1px' }}
                  >
                    .abc.io
                  </label>
                </div>
              </Grid>
              <Grid item container sm={12} md={12}>
                <label
                  className="form-control-label"
                  htmlFor="input-first-name"
                >
                  Theme Primary Color
                </label>
              </Grid>
              <Grid
                item
                container
                sm={12}
                md={12}
                display="flex"
                alignItems="end"
              >
                <TextInput
                  name="primaryColor"
                  inputClassName="textField"
                  inputProps={{
                    style: {
                      height: '15px',
                      textTransform: 'uppercase',
                    },
                    maxLength: 7,
                  }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: '350px',
                    minWidth: '350px',
                  }}
                  style={{
                    width: 'unset',
                  }}
                  value={values.primaryColor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="2aaf66"
                  error={
                    errors.primaryColor &&
                    touched.primaryColor &&
                    Boolean(errors.primaryColor)
                  }
                  errorMsg={
                    errors.primaryColor &&
                    touched.primaryColor &&
                    errors.primaryColor
                  }
                  formatValue={handleHexColorFormat}
                />
                <div
                  style={{
                    border: '1px solid #182B4D',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    padding: '5px',
                    height: '48px',
                    width: '48px',
                    margin: '0 15px 17px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: `${values.primaryColor}`,
                    }}
                  />
                </div>
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

export default CompanyUpdateForm;
