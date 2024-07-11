import type { ChangelogPrivacyParams } from './ChangelogPrivacy';

const validate = (values: ChangelogPrivacyParams) => {
  const errors: any = {};

  if (values.type === 'private' && !values.domains) {
    errors.domains = 'At least one domain is required';
  }
  const domainPattern =
    /^([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(,\s?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})*(\s+[a-zA-Z0-9-]+\.[a-zA-Z]{2,})*(\s*,\s*[a-zA-Z0-9-]+\.[a-zA-Z]{2,})*$/;
  if (values.domains && !domainPattern.test(values.domains)) {
    errors.domains = 'Invalid domains';
  }

  return errors;
};
export default validate;
