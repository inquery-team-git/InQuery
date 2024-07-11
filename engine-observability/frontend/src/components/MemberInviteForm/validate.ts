import type { MemberInviteParams } from './MemberInvite';

const validate = (values: MemberInviteParams) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'At least one email is required';
  }
  const emailPattern =
    /^([\w+.-]+@[a-zA-Z\d-]+\.[a-zA-Z]+)(?:[\s,]+([\w+.-]+@[a-zA-Z\d-]+\.[a-zA-Z]+))*(?=[\s,]*$)$/;
  if (values.email && !emailPattern.test(values.email)) {
    errors.email = 'Invalid emails';
  }

  if (!values.role) {
    errors.role = 'Role is required';
  }
  return errors;
};
export default validate;
