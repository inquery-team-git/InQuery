import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants';

import type { UserSignupParams } from './UserSignup';

const validate = (values: UserSignupParams) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  }
  if (values.email && !EMAIL_REGEX.test(values.email)) {
    errors.password = 'Email address is invalid.';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (values.password && !PASSWORD_REGEX.test(values.password)) {
    errors.password =
      'Password is invalid.\nPassword should have a minimum length of 8 characters.\nContain only alphanumeric characters, @, or _\nShould have a maximum length of 16 characters.';
  }
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }
  if (!values.companyName) {
    errors.companyName = 'Company name is required';
  }
  if (!values.companySubdomain) {
    errors.companySubdomain = 'Company subdomain is required';
  }
  return errors;
};
export default validate;
