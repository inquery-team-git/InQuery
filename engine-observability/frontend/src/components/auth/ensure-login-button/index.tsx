/* eslint-disable tailwindcss/no-custom-classname */

import { isEmpty } from 'lodash/fp';
import { useRouter } from 'next/router';
import React from 'react';

import { useSelector } from '@/redux';
import { getAuthToken, getAuthUser } from '@/redux/auth/auth.slice';

interface EnsureLoginButtonProps {
  afterLogin?: () => void;
  className?: string;
  children: React.ReactNode;
}

const EnsureLoginButton = (props: EnsureLoginButtonProps) => {
  const router = useRouter();
  const accessToken = useSelector(getAuthToken);
  const user = useSelector(getAuthUser);
  const { afterLogin, className = '', children } = props;

  const handleAfterLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    afterLogin && afterLogin();
  };

  if (!accessToken || !user || isEmpty(user)) {
    return router.push('/login');
  }

  return (
    <div className={className} onClick={handleAfterLogin}>
      {children}
    </div>
  );
};

export default EnsureLoginButton;
