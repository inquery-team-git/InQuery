/* eslint-disable tailwindcss/no-custom-classname */

import { isObject } from 'lodash';
import { useEffect, useState } from 'react';

import NetworkError from '@/components/NetworkError';
import { checkAPIHealth } from '@/data/heath';
import type { ErrorProps } from '@/types';

// import { isEmpty } from 'lodash/fp';
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";

// import LoadingSpinner from "@/components/LoadingSpinner";
// import { useSelector } from "@/redux";
// import { getAuthUser } from "@/redux/auth/auth.slice";
// import { getAuthToken } from "@/utils/session-manager.util";

interface EnsureLoginRouteProps {
  children: JSX.Element;
}

const EnsureLoginRoute = (props: EnsureLoginRouteProps) => {
  // const router = useRouter();
  // const accessToken = getAuthToken();
  // const user = useSelector(getAuthUser);
  const { children } = props;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchClusterListSuccess = () => {
    setLoading(false);
  };

  const handleCheckAPIHealth = () => {
    if (loading) return false;
    setLoading(true);
    return checkAPIHealth().then(onFetchClusterListSuccess, onError);
  };

  useEffect(() => {
    handleCheckAPIHealth();
  }, []);

  // useEffect(() => {
  //   if (!accessToken) {
  //     router.push('/login');
  //   }
  // }, [accessToken]);

  // if (!user || isEmpty(user)) {
  //   return <LoadingSpinner middle />;
  // }
  if (error) return <NetworkError title="Network Error" />;
  return children;
};

export default EnsureLoginRoute;
