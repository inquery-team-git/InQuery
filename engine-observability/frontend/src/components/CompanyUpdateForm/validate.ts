import type { CompanyUpdateParams } from './CompanyUpdate';

const validate = (values: Partial<CompanyUpdateParams>) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Company name is required';
  }

  if (!values.subdomain) {
    errors.subdomain = 'Sub domain is required';
  }

  if (!values.primaryColor) {
    errors.primaryColor = 'Company primary color is required';
  }
  return errors;
};
export default validate;
