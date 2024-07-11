'use-client';

import Router from 'next/router';
import React from 'react';

const Notifications = () => {
  React.useEffect(() => {
    Router.push('/admin/cluster');
  });

  return <div />;
};

export default Notifications;
