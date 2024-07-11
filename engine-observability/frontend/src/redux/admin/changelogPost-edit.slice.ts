/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { ChangelogPostEdit } from '@/types';

// Type for our state
export interface AdminChangelogStateEdit {
  isLoading: boolean;
  error: string;
  post: ChangelogPostEdit | undefined;
}

export interface AdminChangelogActionData<T> {
  payload: T;
  type: string;
}

const initialState: AdminChangelogStateEdit = {
  post: undefined,
  isLoading: false,
  error: '',
};

// Actual Slice
export const adminChangelogEditSlice = createSlice({
  name: 'adminChangelogPostEdit',
  initialState,
  reducers: {
    setChangelogEditPost: (
      state: Draft<AdminChangelogStateEdit>,
      action: AdminChangelogActionData<ChangelogPostEdit>
    ) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    updateChangelogEditPost: (
      state: Draft<AdminChangelogStateEdit>,
      action: AdminChangelogActionData<ChangelogPostEdit>
    ) => {
      const { post } = state;
      state.post = { ...post, ...action.payload };
      state.isLoading = false;
    },
    removeChangelogEditPost: (state: Draft<AdminChangelogStateEdit>) => {
      state.post = undefined;
      state.isLoading = false;
    },
    setChangelogEditStateLoading: (
      state: Draft<AdminChangelogStateEdit>,
      action: AdminChangelogActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setChangelogEditStateError: (
      state: Draft<AdminChangelogStateEdit>,
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
  setChangelogEditPost,
  updateChangelogEditPost,
  removeChangelogEditPost,
  setChangelogEditStateLoading,
  setChangelogEditStateError,
} = adminChangelogEditSlice.actions;

export const getAdminChangelogState = (state: {
  adminChangelogPostEdit: AdminChangelogStateEdit;
}) => state.adminChangelogPostEdit;

export const getChangelogEditPost = (state: {
  adminChangelogPostEdit: AdminChangelogStateEdit;
}) =>
  (state.adminChangelogPostEdit && state.adminChangelogPostEdit.post) ||
  undefined;

export const getChangelogEditStateError = (state: {
  adminChangelogPostEdit: AdminChangelogStateEdit;
}) =>
  (state.adminChangelogPostEdit && state.adminChangelogPostEdit.error) || '';

export const isChangelogEditStateLoading = (state: {
  adminChangelogPostEdit: AdminChangelogStateEdit;
}) =>
  (state.adminChangelogPostEdit && state.adminChangelogPostEdit.isLoading) ||
  false;

export default adminChangelogEditSlice.reducer;
