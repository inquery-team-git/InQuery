/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { ChangelogPost } from '@/types';

// Type for our state
export interface PublicChangelogState {
  isLoading: boolean;
  error: string;
  posts: ChangelogPost[];
}

export interface PublicChangelogActionData<T> {
  payload: T;
  type: string;
}

const initialState: PublicChangelogState = {
  posts: [],
  isLoading: false,
  error: '',
};

// Actual Slice
export const publicChangelogSlice = createSlice({
  name: 'publicChangelog',
  initialState,
  reducers: {
    setPublicChangeLogList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.posts>
    ) => {
      state.posts = action.payload;
    },
    setPublicChangelogStateLoading: (
      state: Draft<PublicChangelogState>,
      action: PublicChangelogActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setPublicChangelogStateError: (
      state: Draft<PublicChangelogState>,
      action: PublicChangelogActionData<string>
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
  setPublicChangeLogList,
  setPublicChangelogStateLoading,
  setPublicChangelogStateError,
} = publicChangelogSlice.actions;

export const getPublicChangelogState = (state: {
  publicChangelog: PublicChangelogState;
}) => state.publicChangelog;

export const getPublicChangelogPostsList = (state: {
  publicChangelog: PublicChangelogState;
}) => (state.publicChangelog && state.publicChangelog.posts) || [];

export const getPublicChangelogStateError = (state: {
  publicChangelog: PublicChangelogState;
}) => (state.publicChangelog && state.publicChangelog.error) || '';

export const isPublicChangelogStateLoading = (state: {
  publicChangelog: PublicChangelogState;
}) => (state.publicChangelog && state.publicChangelog.isLoading) || false;

export default publicChangelogSlice.reducer;
