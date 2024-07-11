/* eslint-disable no-underscore-dangle */
/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import type { FormikErrors, FormikTouched } from 'formik';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

import TextInput from '@/components/ReduxFields/TextInput';
import SwitchButton from '@/components/SwitchButton';

import type { CustomDomainParams } from './CustomDomain';

interface FormComponentProps {
  values: CustomDomainParams;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  errors: FormikErrors<CustomDomainParams>;
  touched: FormikTouched<CustomDomainParams>;
}

const FormComponent = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: FormComponentProps) => {
  const [enabled, setEnabled] = useState(false);
  const { setFieldValue } = useFormikContext();

  const handleIdentified = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    if (!value) {
      setFieldValue('domain', '');
    }
    setEnabled(value);
    setFieldValue('enabled', value);
  };

  useEffect(() => {
    setEnabled(values.enabled || false);
  }, [values.enabled]);

  return (
    <Grid
      container
      direction={'column'}
      className="m-0"
      style={{ maxWidth: '800px' }}
    >
      <Grid item container sm={12} md={12}>
        <SwitchButton
          value={enabled}
          text="Use your own domain for your changelog"
          onChange={handleIdentified}
        />
      </Grid>
      {enabled && (
        <Grid item className="gridItem fullWidth" sm={12} md={12}>
          <label className="form-control-label">Custom url</label>
          <TextInput
            autoFocus
            name="domain"
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
            placeholder="eg. changelog.yourcompany.com"
            value={values.domain}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.domain && touched.domain && Boolean(errors.domain)}
            errorMsg={errors.domain && touched.domain && errors.domain}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default FormComponent;
