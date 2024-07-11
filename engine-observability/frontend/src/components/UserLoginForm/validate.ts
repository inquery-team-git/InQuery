import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants';

import type { UserLoginParams } from './UserLogin';

const validate = (values: UserLoginParams) => {
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
  return errors;
};
export default validate;
