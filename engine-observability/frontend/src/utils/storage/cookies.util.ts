import { deleteCookie, getCookie, setCookie, setCookies } from 'cookies-next';
import type { OptionsType } from 'cookies-next/lib/types';

export const setToken = (name: string, value: any, options?: OptionsType) =>
  setCookie(name, value, { ...options, path: '/' });

export const setTokens = (name: string, value: any, options?: OptionsType) =>
  setCookies(name, value, { ...options, path: '/' });

export const setAttemptToken = (
  name: string,
  value: any,
  options?: OptionsType
) => setCookie(name, value, { ...options, path: '/' });

export const getToken = (name: string) => getCookie(name);

export const removeToken = (name: string) => {
  deleteCookie(name, { path: '/' });
  deleteCookie(name);
};
