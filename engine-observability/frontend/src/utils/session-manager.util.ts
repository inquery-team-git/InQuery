import type { AuthTokens, UserUCRMCookie } from '@/types';

import { getToken, removeToken, setToken } from './storage/cookies.util';

export const authorizationTokenBucket = 'jwt';
export const authDataBucket = 'inquery-auth';
export const authCompanyDataBucket = 'inquery-auth-company';
export const sessionIdBucket = 'session-id';

export function getAuthToken() {
  return getToken(authorizationTokenBucket);
}

export function removeAuthToken() {
  return removeToken(authorizationTokenBucket);
}

export function setAuthToken(token: string) {
  return setToken(authorizationTokenBucket, token);
}

export function setAuthData(auth: AuthTokens) {
  return setToken(authDataBucket, auth);
}

export function getAuthData(): Partial<AuthTokens> {
  const authData = getToken(authDataBucket);
  if (!authData) return {};
  return JSON.parse(authData as string);
}

export function removeAuthData() {
  return removeToken(authDataBucket);
}

export function setAuthCompanyData(ucrm: UserUCRMCookie) {
  return setToken(authCompanyDataBucket, ucrm);
}

export function getAuthCompanyData(): Partial<UserUCRMCookie> {
  const ucrm = getToken(authCompanyDataBucket);
  if (!ucrm) return {};
  return JSON.parse(ucrm as string);
}

export function removeAuthCompanyData() {
  return removeToken(authCompanyDataBucket);
}

export function getSessionId() {
  return getToken(sessionIdBucket);
}

export function removeSessionId() {
  return removeToken(sessionIdBucket);
}

export function setSessionId(id: string | number) {
  if (getSessionId() === id) return;
  setToken(sessionIdBucket, id);
}

if (!getSessionId()) setSessionId(Date.now());
