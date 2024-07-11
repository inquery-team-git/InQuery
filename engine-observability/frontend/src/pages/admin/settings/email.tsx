import { isObject } from 'lodash';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import UserEmailPreferenceForm from '@/components/UserEmailPreferenceForm';
import type { UserEmailPreferenceParams } from '@/components/UserEmailPreferenceForm/UserEmailPreference';
import { updateUserProfile } from '@/data/user.data';
import Admin from '@/layouts/Admin';
import { useDispatch, useSelector } from '@/redux';
import {
  getAuthUserDetails,
  updateAuthUserProfile,
} from '@/redux/auth/auth.slice';
import type { AuthUser, ErrorProps } from '@/types';

function EmailPreference() {
  const dispatch = useDispatch();
  const loggedinUser = useSelector(getAuthUserDetails);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const handleUpdateUserSuccess = (user: Partial<AuthUser>) => {
    dispatch(updateAuthUserProfile(user));
    setError('');
    setProcessing(false);
  };

  const updateUserEmailPerference = (values: UserEmailPreferenceParams) => {
    return updateUserProfile({
      reportFrequency: values.reportFrequency,
      sendReportEmails: values.reportFrequency === 'NEVER',
    }).then(handleUpdateUserSuccess, onError);
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
                <h3 className="mb-0">Email Preferences</h3>
              </Col>
            </Row>
            <hr className="my-3 ml-3 mr-4" />
            <UserEmailPreferenceForm
              handleSubmit={updateUserEmailPerference}
              initialValues={{
                reportFrequency: loggedinUser.reportFrequency,
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

export default EmailPreference;
