/* eslint-disable no-underscore-dangle */
/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import type { FormikErrors, FormikTouched } from 'formik';
import { useFormikContext } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';

import CardButton from '@/components/CardButton';
import TextInput from '@/components/ReduxFields/TextInput';
import SwitchButton from '@/components/SwitchButton';

import type { ChangelogPrivacyParams } from './ChangelogPrivacy';

interface FormComponentProps {
  values: ChangelogPrivacyParams;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  errors: FormikErrors<ChangelogPrivacyParams>;
  touched: FormikTouched<ChangelogPrivacyParams>;
}

const privacyConfigs = [
  {
    type: 'public',
    title: 'Public',
    text: 'Anybody can access your changelog',
  },
  {
    type: 'private',
    title: 'Private',
    text: 'Limit changelog access to your team',
  },
];

const FormComponent = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: FormComponentProps) => {
  const [privacy, setPrivacy] = useState<'public' | 'private'>(values.type);
  const [allowIdentified, setAllowIdentified] = useState(false);
  const { setFieldValue } = useFormikContext();

  const handlePrivacy = (privacyType: 'public' | 'private') => {
    setPrivacy(privacyType);
    setFieldValue('type', privacyType);
    if (privacyType === 'public') {
      setFieldValue('allowIdentified', false);
      setFieldValue('domains', '');
    }
  };

  const handleIdentified = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setAllowIdentified(value);
    setFieldValue('allowIdentified', value);
  };

  useEffect(() => {
    setAllowIdentified(values.allowIdentified || false);
  }, [values.allowIdentified]);

  return (
    <Fragment>
      <CardButton
        items={privacyConfigs}
        currentState={privacy}
        onChange={handlePrivacy}
      />
      {privacy === 'private' && (
        <Grid
          container
          direction={'column'}
          className="m-0"
          style={{ maxWidth: '800px' }}
        >
          <Grid item container sm={12} md={12}>
            <SwitchButton
              value={allowIdentified}
              title="Users/customers"
              text="Grant access to anyone who has been identified via our client‑side SDK or single sign‑on."
              onChange={handleIdentified}
            />
          </Grid>
          <Grid item className="gridItem fullWidth" sm={12} md={12}>
            <label className="form-control-label">
              Specific email by domain
            </label>
            <p className="form-control-description">
              Give access to people who have @yourcompany.com emails
              (authenticated via Google sign-on)
            </p>
            <TextInput
              autoFocus
              name="domains"
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
              value={values.domains}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.domains && touched.domains && Boolean(errors.domains)
              }
              errorMsg={errors.domains && touched.domains && errors.domains}
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default FormComponent;
