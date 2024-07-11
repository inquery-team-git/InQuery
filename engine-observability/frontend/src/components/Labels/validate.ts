import type { CreateLabelParams } from './CreateLabels';

const validate = (values: CreateLabelParams) => {
  const errors: any = {};
  if (!values.name) {
    errors.role = 'Label name is required';
  }
  return errors;
};
export default validate;
