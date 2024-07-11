export interface UserSignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  companySubdomain: string;
  terms?: boolean;
  authType?: string;
  companyDescription?: string;
}
