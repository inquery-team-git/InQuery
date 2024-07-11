/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { ChangelogPost } from '@/types';

// Type for our state
export interface PublicChangelogDetailState {
  isLoading: boolean;
  error: string;
  post: ChangelogPost | undefined;
}

export interface PublicChangelogDetailActionData<T> {
  payload: T;
  type: string;
}

const initialState: PublicChangelogDetailState = {
  post: undefined,
  isLoading: false,
  error: '',
};

// Actual Slice
export const publicChangelogDetailSlice = createSlice({
  name: 'publicChangelogDetail',
  initialState,
  reducers: {
    setChangelogEditPost: (
      state: Draft<PublicChangelogDetailState>,
      action: PublicChangelogDetailActionData<ChangelogPost>
    ) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    setChangelogStateLoading: (
      state: Draft<PublicChangelogDetailState>,
      action: PublicChangelogDetailActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setChangelogStateError: (
      state: Draft<PublicChangelogDetailState>,
      action: PublicChangelogDetailActionData<string>
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
  setChangelogStateLoading,
  setChangelogStateError,
} = publicChangelogDetailSlice.actions;

export const getAdminChangelogState = (state: {
  publicChangelogDetail: PublicChangelogDetailState;
}) => state.publicChangelogDetail;

export const getChangelogPostDetail = (state: {
  publicChangelogDetail: PublicChangelogDetailState;
}) =>
  (state.publicChangelogDetail && state.publicChangelogDetail.post) ||
  undefined;

export const getChangelogDetailStateError = (state: {
  publicChangelogDetail: PublicChangelogDetailState;
}) => (state.publicChangelogDetail && state.publicChangelogDetail.error) || '';

export const isChangelogDetailStateLoading = (state: {
  publicChangelogDetail: PublicChangelogDetailState;
}) =>
  (state.publicChangelogDetail && state.publicChangelogDetail.isLoading) ||
  false;

export default publicChangelogDetailSlice.reducer;
