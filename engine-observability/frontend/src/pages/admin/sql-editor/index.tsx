'use-client';

import { styled } from '@mui/material/styles';
import React from 'react';
import { Container } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import QueryEditor from '@/components/QueryEditor/Editor';
import QueryEditorHeader from '@/components/QueryEditor/Header';
import QueryLogTab from '@/components/QueryEditor/Log';
import QueryResultTab from '@/components/QueryEditor/Result';
import QueryEditorSideBar from '@/components/QueryEditor/Sidebar';
import AdminLayout from '@/layouts/Admin';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: '15px 0px 15px 15px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const SQLEditorPage = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <EnsureLoginRoute>
      <AdminLayout
        containerStyle={{
          padding: '0px',
        }}
      >
        <Container
          fluid
          style={{
            height: '100%',
            paddingLeft: '5px !important',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '100%',
            }}
          >
            <QueryEditorSideBar
              openDrawer={open}
              handleDrawerClose={handleDrawerClose}
              handleDrawerOpen={handleDrawerOpen}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <QueryEditorHeader
                openDrawer={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
              />
              <Main open={open}>
                <QueryEditor />
                <QueryLogTab />
                <QueryResultTab />
              </Main>
            </div>
          </div>
        </Container>
      </AdminLayout>
    </EnsureLoginRoute>
  );
};

export default SQLEditorPage;
