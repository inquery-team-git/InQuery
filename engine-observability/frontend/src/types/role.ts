export interface Role {
  _id: string;
  name: string;
  permissions: string[];
  isActive: boolean;
}

export interface RoleState {
  isLoading: boolean;
  error: string;
  roles: Role[];
}
