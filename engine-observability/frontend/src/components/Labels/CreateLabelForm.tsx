import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { capitalize } from 'lodash';
import React from 'react';

import TextInput from '@/components/ReduxFields/TextInput';

import type { CreateLabelParams } from './CreateLabels';
import validate from './validate';

interface CreateLabelFormProps {
  handleSubmit: (values: CreateLabelParams) => void;
  processing?: boolean;
  error?: string;
  className?: string;
}

function CreateLabelForm({
  handleSubmit,
  processing,
  className,
}: CreateLabelFormProps) {
  const handleNameFormat = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let { value } = e.currentTarget;
    if (value.length > 0) {
      value = capitalize(value);
    }
    value = value.replace(/[^a-zA-Z ]/g, '');
    return value;
  };

  const onSubmit = (values: CreateLabelParams) => {
    handleSubmit(values);
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const isFormChanged = true;
        return (
          <Form className={className}>
            <label className="form-control-label" htmlFor="input-email">
              Create new label:
            </label>
            <Grid
              container
              className="m-0"
              display="flex"
              justifyContent="space-between"
            >
              <Grid item sm={12} md={9}>
                <TextInput
                  autoFocus
                  name="name"
                  type="text"
                  className="textField"
                  inputProps={{
                    style: {
                      minHeight: '28px',
                    },
                  }}
                  inputStyle={{
                    width: '100%',
                    padding: '10px',
                  }}
                  multiline
                  minRows={1}
                  placeholder="Create new label..."
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name && Boolean(errors.name)}
                  errorMsg={errors.name && touched.name && errors.name}
                  formatValue={handleNameFormat}
                />
              </Grid>
              <Grid item>
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
                    minWidth: '120px',
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
}

export default CreateLabelForm;
