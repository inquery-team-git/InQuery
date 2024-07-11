/* eslint-disable tailwindcss/no-custom-classname */
import { Grid } from '@mui/material';
import { isObject } from 'lodash';
import React, { useState } from 'react';

import inQueryLogo from '@/assets/images/brand/inquery_small_dark.png';
import AdminSettingsSidebar from '@/components/AdminSettingsSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminNavbar from '@/components/Navbars/AdminNavbar';
import { loggedinUserInfo } from '@/data/auth.data';
import { getAllLabels } from '@/data/labels.data';
import { useDispatch, useSelector } from '@/redux';
import { setLabelsList } from '@/redux/admin/labels.slice';
import {
  getAllCompanyDetails,
  getAuthUserDetails,
  setAuthUser,
  setUserCurrentCompany,
} from '@/redux/auth/auth.slice';
import type { CompanyDetail, Label } from '@/types';

import { adminNavBarRoutes, companyRoutes, profileRoutes } from './routes';

interface AdminLayoutProps {
  children: React.ReactNode;
  containerStyle?: Record<string, any>;
  loading?: boolean;
}
interface ErrorProps {
  message: string;
}

function AdminLayout(props: AdminLayoutProps) {
  const dispatch: any = useDispatch();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [processing, setProcessing] = useState(false);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const loggedinUser = useSelector(getAuthUserDetails);
  const userCompanies = useSelector(getAllCompanyDetails);
  const mainContentRef = React.createRef<HTMLDivElement>();
  const showSideBar = true;

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const handleFetchUserInfoSuccess = (user: any) => {
    dispatch(setAuthUser(user));
    setError('');
    setProcessing(false);
  };

  const fetchLoggedinUserInfo = () => {
    return loggedinUserInfo().then(handleFetchUserInfoSuccess, onError);
  };

  const onFetchCompanyLabelsSuccess = (data: Label[]) => {
    dispatch(setLabelsList(data));
    setError('');
    setProcessing(false);
  };

  const handleFetchCompanyLabels = () => {
    return getAllLabels().then(onFetchCompanyLabelsSuccess, onError);
  };

  const handleCompanyChange = (company: CompanyDetail) => {
    if (company) {
      dispatch(setUserCurrentCompany(company));
    }
    fetchLoggedinUserInfo();
    handleFetchCompanyLabels();
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  });

  return (
    <div className="main-content p-0" ref={mainContentRef}>
      <AdminNavbar
        leftRoutes={adminNavBarRoutes.left}
        rightRoutes={adminNavBarRoutes.right}
        logo={{
          innerLink: '/admin/cluster',
          imgSrc: inQueryLogo,
          imgAlt: 'Inquery Logo',
        }}
        companies={userCompanies}
        handleCompanyChange={handleCompanyChange}
      />
      {showSideBar && (
        <Grid container style={{ flexWrap: 'inherit', flex: 1 }}>
          <Grid
            item
            style={{
              width: ' 17%',
              minWidth: '200px',
              maxWidth: '218px',
              flexBasis: 0,
              flexGrow: 1,
              padding: '0px',
            }}
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <AdminSettingsSidebar
              userRoutes={profileRoutes}
              companyRoutes={companyRoutes}
              userName={'You'}
              companyName={'InQuery'}
            />
          </Grid>
          <Grid
            item
            style={{
              padding: '20px',
              maxWidth: '100%',
              flexBasis: 0,
              flexGrow: 1,
              ...props.containerStyle,
            }}
            className="main-container"
          >
            {props.loading && <LoadingSpinner middle />}
            {props.children}
          </Grid>
        </Grid>
      )}
      {!showSideBar && props.children}
    </div>
  );
}

export default AdminLayout;
