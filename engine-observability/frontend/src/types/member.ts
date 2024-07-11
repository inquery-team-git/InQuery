export type MemberProfile = {
  _id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
  isActive: boolean;
  authType: string;
  createdAt: Date;
  updatedAt: Date;
  img?: any;
};

export interface MemberState {
  isLoading: boolean;
  error: string;
  members: MemberProfile[];
}
