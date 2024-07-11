/* eslint-disable no-underscore-dangle */
/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { capitalize, upperCase } from 'lodash';
import React, { useState } from 'react';

import TextInput from '@/components/ReduxFields/TextInput';
import type { Role } from '@/types';

import SelectField from '../ReduxFields/SelectField';
import type { MemberInviteParams } from './MemberInvite';
import validate from './validate';

interface MemberInviteFormProps {
  handleSubmit: (
    values: MemberInviteParams,
    callback: (value: string) => void
  ) => void;
  roles: Role[];
  processing?: boolean;
  error?: string;
  className?: string;
}

const MemberInviteForm = ({
  handleSubmit,
  roles,
  processing,
  className,
}: MemberInviteFormProps) => {
  const [buttonText, setButtonText] = useState('Send Invite');

  const onSubmit = (values: MemberInviteParams, resetForm: any) => {
    const onInviteSent = (value: string) => {
      setButtonText(value);
      resetForm();
    };

    handleSubmit(values, onInviteSent);
  };

  const handleButtonText = () => {
    setButtonText('Send Invite');
  };

  return (
    <Formik
      initialValues={{ email: '', role: '', emails: [] }}
      validate={validate}
      onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const isFormChanged = true;
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
                  Invite Team members via email:
                </label>
                <TextInput
                  autoFocus
                  name="email"
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
                  placeholder="Email addresses, separated by commas or spaces"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email && Boolean(errors.email)}
                  errorMsg={errors.email && touched.email && errors.email}
                  onFocus={handleButtonText}
                />
              </Grid>
              <Grid
                item
                container
                sm={12}
                md={12}
                display="flex"
                alignItems="baseline"
              >
                <SelectField
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={'Select Role'}
                  error={errors.role && touched.role && Boolean(errors.role)}
                  errorMsg={errors.role && touched.role && errors.role}
                  options={roles.map((role) => ({
                    text: capitalize(upperCase(role.name)),
                    value: role._id,
                  }))}
                  onFocus={handleButtonText}
                />
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
                    marginLeft: '15px',
                  }}
                  type="submit"
                  disabled={processing || !isFormChanged}
                >
                  {buttonText}
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MemberInviteForm;
