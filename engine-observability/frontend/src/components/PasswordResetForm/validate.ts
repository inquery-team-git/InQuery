import { EMAIL_REGEX } from '@/constants';

import type { PasswordResetParams } from './PasswordReset';

const validate = (values: PasswordResetParams) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  }
  if (values.email && !EMAIL_REGEX.test(values.email)) {
    errors.password = 'Email address is invalid.';
  }

  return errors;
};
export default validate;
