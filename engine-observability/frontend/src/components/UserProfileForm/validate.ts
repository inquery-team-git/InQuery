import type { UserProfileParams } from './UserProfile';

const validate = (values: UserProfileParams) => {
  const errors: any = {};

  // if (!values.email) {
  //   errors.email = 'Email is required';
  // }

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }
  return errors;
};
export default validate;
