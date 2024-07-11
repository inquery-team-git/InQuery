import type { CustomDomainParams } from './CustomDomain';

const validate = (values: CustomDomainParams) => {
  const errors: any = {};

  if (values.enabled && !values.domain) {
    errors.domain =
      'You need to enter a domain name eg. changelog.yourcompany.com';
  }
  const domainPattern = /^(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/;
  if (values.domain && !domainPattern.test(values.domain)) {
    errors.domain =
      'You need to enter a domain name eg. changelog.yourcompany.com';
  }

  return errors;
};
export default validate;
