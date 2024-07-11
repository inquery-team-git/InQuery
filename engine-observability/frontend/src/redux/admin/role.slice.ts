/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { Role, RoleState } from '@/types';

export interface RoleActionData<T> {
  payload: T;
  type: string;
}

const initialState: RoleState = {
  roles: [],
  isLoading: false,
  error: '',
};

export const adminRolesSlice = createSlice({
  name: 'adminRoles',
  initialState,
  reducers: {
    setRolesList: (state: Draft<RoleState>, action: RoleActionData<Role[]>) => {
      state.roles = action.payload;
      state.isLoading = false;
    },
    setRoleStateLoading: (
      state: Draft<RoleState>,
      action: RoleActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setRoleStateError: (
      state: Draft<RoleState>,
      action: RoleActionData<string>
    ) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setRolesList, setRoleStateLoading, setRoleStateError } =
  adminRolesSlice.actions;

export const getRolesList = (state: { adminRoles: RoleState }) =>
  (state.adminRoles && state.adminRoles.roles) || [];

export const getRoleStateError = (state: { adminRoles: RoleState }) =>
  (state.adminRoles && state.adminRoles.error) || '';

export const isRoleStateLoading = (state: { adminRoles: RoleState }) =>
  (state.adminRoles && state.adminRoles.isLoading) || false;

export default adminRolesSlice.reducer;
