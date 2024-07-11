import { isInteger, parseInt } from 'lodash';

import type { UpdateClusterFormParams } from './UpdateClusterForm';

const HOST_REGEX = /^((\d{1,3}\.){3}\d{1,3}|trino)$/;
const validate = (values: UpdateClusterFormParams) => {
  const errors: any = {};
  let port: number = 0;
  if (!values.name) {
    errors.name = 'Cluster Name is required';
  }
  if (!values.host) {
    errors.host = 'Cluster Host is required';
  }
  if (!values.port) {
    errors.port = 'Cluster Port is required';
  }
  if (values.host && !HOST_REGEX.test(values.host)) {
    errors.host =
      'Invalid Host: should follow the pattern /^(\\d{1,3}\\.){3}\\d{1,3}$/';
  }
  if (values.port) {
    port = parseInt(values.port as unknown as string);
  }
  if (port && !isInteger(port)) {
    errors.port = 'Port should be integer';
  }
  if (port && port > 65535) {
    errors.port = 'Port should not be greater than 65535';
  }
  if ((port && port < 1) || port === 0) {
    errors.port = 'Port should not be less than 1';
  }
  return errors;
};
export default validate;
