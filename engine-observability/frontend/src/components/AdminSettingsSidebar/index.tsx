import { Box } from '@mui/material';
import React from 'react';

import NavList from '@/components/NavList';
import type { Route } from '@/types';

interface AdminSettingsSidebarProps {
  userRoutes: Route[];
  companyRoutes: Route[];
  userName: string;
  companyName: string;
}

function AdminSettingsSidebar(props: AdminSettingsSidebarProps) {
  const { userRoutes, companyRoutes, userName, companyName } = props;

  return (
    <Box
      sx={{ overflow: 'auto', padding: '20px', height: '100%' }}
      className="navbar-vertical fixed-left navbar-light box-shadow bg-white"
    >
      {companyRoutes.length > 0 && (
        <>
          <h6 className="navbar-heading text-muted">{companyName}</h6>
          <NavList routes={companyRoutes} />
        </>
      )}
      {userRoutes.length > 0 && (
        <>
          <hr className="w-100 my-3" />
          <h6 className="navbar-heading text-muted">{userName}</h6>
          <NavList routes={userRoutes} />
        </>
      )}
    </Box>
  );
}

export default AdminSettingsSidebar;
