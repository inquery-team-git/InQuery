/* eslint-disable no-underscore-dangle */
import { capitalize, isObject } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import SwitchButton from '@/components/SwitchButton';
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
  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  // eslint-disable-next-line unused-imports/no-unused-vars
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

  const handleUpdateCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    return updateCompanyBasicDetails(
      { sendViewerReportEmails: value },
      authenticatedCompany._id
    ).then(handleUpdateCompanySuccess, onError);
  };

  useEffect(() => {
    setChecked(authenticatedCompany.sendViewerReportEmails);
  }, [authenticatedCompany.sendViewerReportEmails]);

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
                <h3 className="mb-0">User Emails</h3>
              </Col>
            </Row>
            <hr className="my-3 ml-3 mr-4" />
            <Form className="align-items-center pl-3 pr-4 m-0">
              <Row style={{ maxWidth: '700px' }} className="mt-3">
                <Col>
                  <FormGroup className="mb-0">
                    <label className="form-control-label">
                      {`New posts (${capitalize(
                        authenticatedCompany.viewerReportFrequency
                      )})`}
                    </label>
                    <p className="form-control-description">
                      An email with the new posts from the previous week sent to
                      all tracked users. They give new posts exposure and a
                      chance to trend.
                    </p>
                    <SwitchButton
                      value={checked}
                      text="Send new posts email"
                      size={'medium'}
                      onChange={handleUpdateCompany}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Container>
      </Admin>
    </EnsureLoginRoute>
  );
}

export default UserEmails;
