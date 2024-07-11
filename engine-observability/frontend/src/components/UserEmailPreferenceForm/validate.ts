import type { UserEmailPreferenceParams } from './UserEmailPreference';

const validate = (values: UserEmailPreferenceParams) => {
  const errors: any = {};
  if (!values.reportFrequency) {
    errors.reportFrequency = 'Select Report frequency';
  }
  return errors;
};
export default validate;
