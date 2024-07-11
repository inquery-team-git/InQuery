/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { MemberProfile, MemberState } from '@/types';

export interface MemberActionData<T> {
  payload: T;
  type: string;
}
export interface MemberRoleChange {
  userId: string;
  role: string;
}

const initialState: MemberState = {
  members: [],
  isLoading: false,
  error: '',
};

export const adminMemberSlice = createSlice({
  name: 'adminMembers',
  initialState,
  reducers: {
    setMembersList: (
      state: Draft<MemberState>,
      action: MemberActionData<MemberProfile[]>
    ) => {
      state.members = action.payload;
      state.isLoading = false;
    },
    setMemberNewRole: (
      state: Draft<MemberState>,
      action: MemberActionData<MemberRoleChange>
    ) => {
      const { members = [] } = state;
      members.map((m) => {
        if (m._id === action.payload.userId) {
          m.role = action.payload.role;
        }
        return m;
      });
      state.members = members;
      state.isLoading = false;
    },
    setMemberStateLoading: (
      state: Draft<MemberState>,
      action: MemberActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setMemberStateError: (
      state: Draft<MemberState>,
      action: MemberActionData<string>
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

export const {
  setMembersList,
  setMemberNewRole,
  setMemberStateLoading,
  setMemberStateError,
} = adminMemberSlice.actions;

export const getMembersList = (state: { adminMembers: MemberState }) =>
  (state.adminMembers && state.adminMembers.members) || [];

export const getMemberStateError = (state: { adminMembers: MemberState }) =>
  (state.adminMembers && state.adminMembers.error) || '';

export const isMemberStateLoading = (state: { adminMembers: MemberState }) =>
  (state.adminMembers && state.adminMembers.isLoading) || false;

export default adminMemberSlice.reducer;
