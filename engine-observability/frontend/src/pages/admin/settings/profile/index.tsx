import { isObject } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import team from '@/assets/images/theme/user_image.png';
import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import ImageUpload from '@/components/ImageUpload';
import UserProfileForm from '@/components/UserProfileForm';
import type { UserProfileParams } from '@/components/UserProfileForm/UserProfile';
import { updateUserProfile } from '@/data/user.data';
import Admin from '@/layouts/Admin';
import { useDispatch } from '@/redux';
import {
  getAuthUserDetails,
  updateAuthUserProfile,
} from '@/redux/auth/auth.slice';
import type { AuthUser, ErrorProps } from '@/types';

function Profile() {
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

  const updateLoggedinUserInfo = (values: UserProfileParams) => {
    return updateUserProfile(values).then(handleUpdateUserSuccess, onError);
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
                <h3 className="mb-0">User information</h3>
              </Col>
            </Row>
            <hr className="my-3 ml-3 mr-4" />
            <ImageUpload
              source={team}
              label={'Upload Image'}
              imgClassName="rounded-circle"
              className="pl-3 pr-4"
            />
            <UserProfileForm
              handleLogin={updateLoggedinUserInfo}
              initialValues={{
                firstName: loggedinUser.firstName,
                lastName: loggedinUser.lastName,
                email: loggedinUser.email,
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

export default Profile;
