/* eslint-disable no-underscore-dangle */
import { isObject } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import team from '@/assets/images/theme/user_image.png';
import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import CompanyUpdateForm from '@/components/CompanyUpdateForm';
import type { CompanyUpdateParams } from '@/components/CompanyUpdateForm/CompanyUpdate';
import ImageUpload from '@/components/ImageUpload';
import { updateCompanyBasicDetails } from '@/data/company.data';
import Admin from '@/layouts/Admin';
import { useDispatch } from '@/redux';
import {
  getAuthUserCompanyDetails,
  updateAuthCompanyDetails,
} from '@/redux/auth/auth.slice';
import type { Company, ErrorProps } from '@/types';

function CompanyPage() {
  const dispatch = useDispatch();
  const authenticatedCompany = useSelector(getAuthUserCompanyDetails);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const handleUpdateCompanySuccess = (values: Company) => {
    dispatch(updateAuthCompanyDetails(values));
    setError('');
    setProcessing(false);
  };

  const handleUpdateCompany = (values: Partial<CompanyUpdateParams>) => {
    return updateCompanyBasicDetails(values, authenticatedCompany._id).then(
      handleUpdateCompanySuccess,
      onError
    );
  };

  return (
    <EnsureLoginRoute>
      <Admin>
        <Container style={{ maxWidth: 'none', padding: '0px' }}>
          <Col
            className="order-xl-1"
            xl="8"
            style={{ maxWidth: 'none', padding: '0px' }}
          >
            <Row className="align-items-center pl-3 pr-4 m-0">
              <Col xs="8" className="p-0">
                <h3 className="mb-0">Company Settings</h3>
              </Col>
            </Row>
            <hr className="my-3 ml-3 mr-4" />
            <ImageUpload
              source={team}
              label={'Upload logo'}
              size={' Max: 8MB'}
              ratio={'Ratio: 1:1'}
              imgClassName="rounded-circle"
              className="pl-3 pr-4"
            />
            <ImageUpload
              source={team}
              label={'Upload favicon'}
              size={'Recommended size: 32 x 32 pixels'}
              ratio={'Ratio: 1:1'}
              imgClassName="rounded"
              className="pl-3 pr-4"
            />
            <CompanyUpdateForm
              handleSubmit={handleUpdateCompany}
              initialValues={{
                name: authenticatedCompany.name,
                description: authenticatedCompany.description,
                subdomain: authenticatedCompany.subdomain,
                primaryColor: authenticatedCompany.primaryColor,
              }}
              error={error}
              processing={processing}
              className="pl-3 pr-4"
            />
          </Col>
        </Container>
      </Admin>
    </EnsureLoginRoute>
  );
}

export default CompanyPage;
