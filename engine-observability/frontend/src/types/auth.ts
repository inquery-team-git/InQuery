import type { Company } from './company';
import type { Role } from './role';

export interface UserUCRM {
  user: string;
  role: Role;
  company: Company;
}

export interface UserUCRMCookie {
  user: string;
  role: string;
  companyHash: string;
  companyId: string;
  domain: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface AuthUser {
  _id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  reportFrequency?: string;
  sendReportEmails?: boolean;
  authType?: string;
  createdAt?: string;
  updatedAt?: string;
  rememberMe?: boolean;
  loginDate?: string;
  role: Role;
  company: Company;
}

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  authenticated: boolean;
  isLoading: boolean;
  user: AuthUser;
  currentCompany: string;
  companies: UserUCRM[];
}
