/* eslint-disable no-underscore-dangle */
import { isObject } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import CustomDomainAdd from '@/components/CustomDomain/Add';
import CustomDomainSuccess from '@/components/CustomDomain/Success';
import type { CustomDomainParams } from '@/components/CustomDomainForm/CustomDomain';
import { updateCompanyBasicDetails } from '@/data/company.data';
import Admin from '@/layouts/Admin';
import {
  getAuthUserCompanyDetails,
  updateAuthCompanyDetails,
} from '@/redux/auth/auth.slice';
import type { Company, ErrorProps } from '@/types';

function UserEmails() {
  const dispatch = useDispatch();
  const authenticatedCompany = useSelector(getAuthUserCompanyDetails);
  const [company, setCompany] = useState(authenticatedCompany);

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const handleUpdateCompanySuccess = (values: Company) => {
    setCompany(values);
    dispatch(updateAuthCompanyDetails(values));
    setError('');
    setProcessing(false);
  };

  const handleCustomDomainAdd = (values: CustomDomainParams) => {
    return updateCompanyBasicDetails(
      { customDomain: values.domain, customDomainEnabled: values.enabled },
      authenticatedCompany._id
    ).then(handleUpdateCompanySuccess, onError);
  };

  const handleRemoveCustomDomain = () => {
    return updateCompanyBasicDetails(
      { customDomain: '', customDomainEnabled: false },
      authenticatedCompany._id
    ).then(handleUpdateCompanySuccess, onError);
  };

  return (
    <EnsureLoginRoute>
      <Admin>
        <Container style={{ maxWidth: 'none', padding: '0px' }}>
          {company.customDomain && company.customDomainEnabled ? (
            <CustomDomainSuccess
              customDomain={company.customDomain}
              deleteDomain={handleRemoveCustomDomain}
              error={error}
              processing={processing}
            />
          ) : (
            <CustomDomainAdd
              subdomain={authenticatedCompany.subdomain}
              addDomain={handleCustomDomainAdd}
              initialValues={{
                domain: '',
                enabled: false,
              }}
              error={error}
              processing={processing}
            />
          )}
        </Container>
      </Admin>
    </EnsureLoginRoute>
  );
}

export default UserEmails;
