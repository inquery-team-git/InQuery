import Router from 'next/router';
import React from 'react';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';

export default function Index() {
  React.useEffect(() => {
    Router.push('/admin/settings/profile');
  });

  return (
    <EnsureLoginRoute>
      <div />
    </EnsureLoginRoute>
  );
}
