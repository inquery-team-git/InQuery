'use-client';

import Router from 'next/router';
import React from 'react';

const Error404 = () => {
  React.useEffect(() => {
    Router.push('/admin/cluster');
  });

  return <div />;
};

export default Error404;
