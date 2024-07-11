'use-client';

/* eslint-disable no-underscore-dangle */
/* eslint-disable tailwindcss/no-custom-classname */
// import GitHubIcon from '@mui/icons-material/GitHub';
// import GoogleIcon from '@mui/icons-material/Google';
import { Grid } from '@mui/material';
import { isObject } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import UserLoginForm from '@/components/UserLoginForm';
import type { UserLoginParams } from '@/components/UserLoginForm/UserLogin';
import { loggedinUserInfo, loginUser } from '@/data/auth.data';
import { getAllLabels } from '@/data/labels.data';
import { fetchRolesList } from '@/data/role.data';
import AuthLayout from '@/layouts/Auth';
import { setLabelsList } from '@/redux/admin/labels.slice';
import { setRolesList } from '@/redux/admin/role.slice';
import {
  authenticateUser,
  // checkIsAuthenticated,
  setAuthUser,
  setUserCompanies,
} from '@/redux/auth/auth.slice';
import type { AuthTokens, ErrorProps, Label, UserUCRM } from '@/types';

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  // const isAuthenticated: boolean = useSelector(checkIsAuthenticated);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const handlefetchAdminRolesListSuccess = (roles: any) => {
    dispatch(setRolesList(roles));
    setError('');
    setProcessing(false);
  };

  const fetchAdminRolesList = () => {
    return fetchRolesList().then(handlefetchAdminRolesListSuccess, onError);
  };

  const onFetchCompanyLabelsSuccess = (data: Label[]) => {
    dispatch(setLabelsList(data));
    setError('');
    setProcessing(false);
  };

  const handleFetchCompanyLabels = () => {
    return getAllLabels().then(onFetchCompanyLabelsSuccess, onError);
  };

  const handleFetchUserInfoSuccess = (user: any) => {
    dispatch(setAuthUser(user));
    handleFetchCompanyLabels();
    fetchAdminRolesList();
    setError('');
    setProcessing(false);
    router.push('/admin/cluster');
  };

  const fetchLoggedinUserInfo = () => {
    return loggedinUserInfo().then(handleFetchUserInfoSuccess, onError);
  };

  const handleLoginSuccess = ({
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    companies,
  }: AuthTokens & { companies: UserUCRM[] }) => {
    // set redux state
    dispatch(
      authenticateUser({
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
      })
    );
    dispatch(setUserCompanies(companies));
    fetchLoggedinUserInfo();
  };

  const handleLogin = (values: UserLoginParams) => {
    setError('');
    setProcessing(true);
    return loginUser(values).then(handleLoginSuccess, onError);
  };

  return (
    <div className="login">
      <AuthLayout className="navBar">
        <div className="columnsWrapper">
          <div className="leftColumn">
            <Grid container className="loginWrapper" direction={'column'}>
              <Grid item className="muiCard">
                <UserLoginForm
                  handleLogin={handleLogin}
                  processing={processing}
                  errorMsg={error}
                />
              </Grid>
            </Grid>
          </div>
          <div className="rightColumn">
            <div className="rightColumnInner">
              <img
                src="https://getlog.co/site/img/browser-window.png"
                alt="Getlog"
              />
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;
