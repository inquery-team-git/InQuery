import type { PasswordResetParams } from '@/components/PasswordResetForm/PasswordReset';
import type { UserLoginParams } from '@/components/UserLoginForm/UserLogin';
import type { UserSignupParams } from '@/components/UserSignupForm/UserSignup';
import { get, post } from '@/utils/fetch.util';

export const loginUser = (body: UserLoginParams) =>
  post({
    url: '/api/v1/app/member/login',
    data: body,
  }).then((resp) => resp.data);

export const loggedinUserInfo = () =>
  get({
    url: '/api/v1/app/member/info',
  }).then((resp) => resp.data);

export const signupUser = (body: UserSignupParams) =>
  post({
    url: '/api/v1/app/member/sign-up',
    data: body,
  }).then((resp) => resp.data);

export const requestPasswordReset = (body: PasswordResetParams) =>
  post({
    url: '/api/v1/app/member/forgot-password',
    data: body,
  }).then((resp) => resp.data);

export const refreshAuthToken = () =>
  post({
    url: '/api/v1/app/member/refresh',
  }).then((resp) => resp.data);
