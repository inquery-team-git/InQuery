/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { ChangelogPost } from '@/types';

// Type for our state
export interface AdminChangelogStateCreate {
  isLoading: boolean;
  error: string;
  post: ChangelogPost | undefined;
}

export interface AdminChangelogActionData<T> {
  payload: T;
  type: string;
}

const initialState: AdminChangelogStateCreate = {
  post: undefined,
  isLoading: false,
  error: '',
};

// Actual Slice
export const adminChangelogCreateSlice = createSlice({
  name: 'adminChangelogPostCreate',
  initialState,
  reducers: {
    setChangelogCreatePost: (
      state: Draft<AdminChangelogStateCreate>,
      action: AdminChangelogActionData<ChangelogPost>
    ) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    setChangelogCreateStateLoading: (
      state: Draft<AdminChangelogStateCreate>,
      action: AdminChangelogActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setChangelogCreateStateError: (
      state: Draft<AdminChangelogStateCreate>,
      action: AdminChangelogActionData<string>
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
  setChangelogCreatePost,
  setChangelogCreateStateLoading,
  setChangelogCreateStateError,
} = adminChangelogCreateSlice.actions;

export const getAdminChangelogState = (state: {
  adminChangelogPostCreate: AdminChangelogStateCreate;
}) => state.adminChangelogPostCreate;

export const getChangelogCreatePost = (state: {
  adminChangelogPostCreate: AdminChangelogStateCreate;
}) =>
  (state.adminChangelogPostCreate && state.adminChangelogPostCreate.post) ||
  undefined;

export const getChangelogCreateStateError = (state: {
  adminChangelogPostCreate: AdminChangelogStateCreate;
}) =>
  (state.adminChangelogPostCreate && state.adminChangelogPostCreate.error) ||
  '';

export const isChangelogCreateStateLoading = (state: {
  adminChangelogPostCreate: AdminChangelogStateCreate;
}) =>
  (state.adminChangelogPostCreate &&
    state.adminChangelogPostCreate.isLoading) ||
  false;

export default adminChangelogCreateSlice.reducer;
