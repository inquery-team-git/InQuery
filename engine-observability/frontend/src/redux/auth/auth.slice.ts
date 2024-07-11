/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type {
  AuthState,
  AuthTokens,
  AuthUser,
  Company,
  CompanyDetail,
  Role,
  UserUCRM,
} from '@/types';
import {
  removeAuthCompanyData,
  removeAuthData,
  removeAuthToken,
  setAuthCompanyData,
  setAuthData,
  setAuthToken,
} from '@/utils/session-manager.util';

export interface AuthActionData<T> {
  payload: T;
  type: string;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  tokenType: 'Bearer',
  expiresIn: 0,
  authenticated: false,
  isLoading: false,
  user: {
    role: {} as Role,
    company: {} as Company,
  },
  currentCompany: '',
  companies: [],
};

// const authAdapter = createEntityAdapter<AuthState>()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (
      state: Draft<AuthState>,
      action: AuthActionData<AuthUser>
    ) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    updateAuthUserProfile: (
      state: Draft<AuthState>,
      action: AuthActionData<Partial<AuthUser>>
    ) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.reportFrequency = action.payload.reportFrequency;
      state.user.sendReportEmails = action.payload.sendReportEmails;
    },
    updateAuthUserSettings: (
      state: Draft<AuthState>,
      action: AuthActionData<Partial<AuthUser>>
    ) => {
      state.user.reportFrequency = action.payload.reportFrequency;
      state.user.sendReportEmails = action.payload.sendReportEmails;
    },
    updateAuthCompanyDetails: (
      state: Draft<AuthState>,
      action: AuthActionData<Company>
    ) => {
      state.user.company.name = action.payload.name;
      state.user.company.description = action.payload.description;
      state.user.company.subdomain = action.payload.subdomain;
      state.user.company.primaryColor = action.payload.primaryColor;
      state.user.company.sendViewerReportEmails =
        action.payload.sendViewerReportEmails;
      state.user.company.viewerReportFrequency =
        action.payload.viewerReportFrequency;
      state.user.company.customDomain = action.payload.customDomain;
      state.user.company.customDomainEnabled =
        action.payload.customDomainEnabled;
    },
    authenticateUser: (
      state: Draft<AuthState>,
      action: AuthActionData<AuthTokens>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
      setAuthToken(action.payload.accessToken);
      setAuthData({
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
        expiresIn: action.payload.expiresIn,
        refreshToken: action.payload.refreshToken,
      });
    },
    setUserCurrentCompany: (
      state: Draft<AuthState>,
      action: AuthActionData<CompanyDetail>
    ) => {
      const company = action.payload;
      setAuthCompanyData({
        user: company.userId,
        role: company.role,
        companyHash: company.companyHash,
        companyId: company.companyId,
        domain: company.subdomain,
      });
      state.currentCompany = company.companyId;
    },
    setUserCompanies: (
      state: Draft<AuthState>,
      action: AuthActionData<UserUCRM[]>
    ) => {
      const companies = action.payload;
      state.companies = companies;
      if (action.payload && companies[0]) {
        // set auth-ucrm cookies
        setAuthCompanyData({
          user: companies[0].user,
          role: companies[0].role.name,
          companyHash: companies[0].company.apiKey,
          companyId: companies[0].company._id,
          domain: companies[0].company.subdomain,
        });
        state.currentCompany = companies[0].company._id;
      }
    },
    setLoading: (state: Draft<AuthState>, action: AuthActionData<boolean>) => {
      state.isLoading = action.payload;
    },
    unAuthenticateUser: () => {
      removeAuthToken();
      removeAuthData();
      removeAuthCompanyData();
      return initialState;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
    // [PURGE]: (state) => {
    //   authAdapter.removeAll(state);
    // }
  },
});

export const {
  authenticateUser,
  setAuthUser,
  unAuthenticateUser,
  setLoading,
  setUserCompanies,
  setUserCurrentCompany,
  updateAuthUserProfile,
  updateAuthUserSettings,
  updateAuthCompanyDetails,
} = authSlice.actions;

export const getAuthState = (state: { auth: AuthState }) => state.auth;

export const getAuthToken = (state: { auth: AuthState }) => {
  const { accessToken } = state.auth;
  return accessToken;
};

export const checkIsAuthenticated = (state: { auth: AuthState }) => {
  const { authenticated } = state.auth;
  return authenticated;
};

export const getAuthUser = (state: { auth: AuthState }) => {
  const { user } = state.auth;
  return user;
};

export const getAuthUserDetails = (state: { auth: AuthState }) => {
  const { user } = state.auth;
  return {
    userId: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    reportFrequency: user.reportFrequency,
    sendReportEmails: user.sendReportEmails,
    role: user?.role?.name,
    permissions: user?.role?.permissions,
    companyId: user?.company?._id,
    companyName: user?.company?.name,
    subdomain: user?.company?.subdomain,
    primaryColor: user?.company?.primaryColor,
    viewerReportFrequency: user?.company?.viewerReportFrequency,
    sendViewerReportEmails: user?.company?.sendViewerReportEmails,
    fullScreenAdminView: user?.company?.fullScreenAdminView,
    showChangelog: user?.company?.showChangelog,
    companyDescription: user?.company?.description,
  };
};

export const getAuthUserCompanyDetails = (state: { auth: AuthState }) => {
  const { user } = state.auth;
  return user.company;
};

export const getAuthUserRoleDetails = (state: { auth: AuthState }) => {
  const { user } = state.auth;
  return user.role;
};

export const getAllCompanyDetails = (state: { auth: AuthState }) => {
  const { companies = [], currentCompany } = state.auth;
  return companies.map((company) => ({
    userId: company?.user,
    role: company?.role.name,
    // permissions: company?.role.permissions,
    companyId: company?.company._id,
    companyName: company?.company.name,
    subdomain: company?.company.subdomain,
    companyHash: company?.company.apiKey,
    // primaryColor: company?.company.primaryColor,
    // viewerReportFrequency: company?.company.viewerReportFrequency,
    // sendViewerReportEmails: company?.company.sendViewerReportEmails,
    // fullScreenAdminView: company?.company.fullScreenAdminView,
    // showChangelog: company?.company.showChangelog,
    companyDescription: company?.company.description,
    showActive: currentCompany === company?.company._id,
  }));
};

export default authSlice.reducer;
