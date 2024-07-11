/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { kebabCase, remove } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import type { ChangelogPost } from '@/types';

// Type for our state
export interface AdminChangelogState {
  isLoading: boolean;
  error: string;
  posts: ChangelogPost[];
}

export interface AdminChangelogActionData<T> {
  payload: T;
  type: string;
}

const initialState: AdminChangelogState = {
  posts: [],
  isLoading: false,
  error: '',
};

// Actual Slice
export const adminChangelogSlice = createSlice({
  name: 'adminChangelog',
  initialState,
  reducers: {
    setAdminChangeLogList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.posts>
    ) => {
      state.posts = action.payload;
    },
    setNewChangelogPost: (
      state: Draft<AdminChangelogState>,
      action: AdminChangelogActionData<ChangelogPost>
    ) => {
      const { posts = [] } = state;
      state.posts = [action.payload, ...posts];
      state.isLoading = false;
    },
    updateChangelogPost: (
      state: Draft<AdminChangelogState>,
      action: AdminChangelogActionData<ChangelogPost>
    ) => {
      const { posts = [] } = state;
      const updatedPosts = posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      state.posts = updatedPosts;
      state.isLoading = false;
    },
    removeChangelogPost: (
      state: Draft<AdminChangelogState>,
      action: AdminChangelogActionData<ChangelogPost>
    ) => {
      const { posts = [] } = state;
      const updatedPosts = remove(posts, (post) => {
        return post._id !== action.payload._id;
      });
      state.posts = updatedPosts;
      state.isLoading = false;
    },
    setAdminChangelogStateLoading: (
      state: Draft<AdminChangelogState>,
      action: AdminChangelogActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setAdminChangelogStateError: (
      state: Draft<AdminChangelogState>,
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
  setAdminChangeLogList,
  setNewChangelogPost,
  updateChangelogPost,
  removeChangelogPost,
  setAdminChangelogStateLoading,
  setAdminChangelogStateError,
} = adminChangelogSlice.actions;

export const getAdminChangelogState = (state: {
  adminChangelog: AdminChangelogState;
}) => state.adminChangelog;

export const getAdminChangelogPostsList = (state: {
  adminChangelog: AdminChangelogState;
}) => (state.adminChangelog && state.adminChangelog.posts) || [];

export const getAdminChangelogPostById =
  (postId: string) => (state: { adminChangelog: AdminChangelogState }) => {
    const { posts } = state.adminChangelog;
    const post = posts.find((cp) => kebabCase(cp._id) === postId);
    return post;
  };

export const getAdminChangelogPostByUrl =
  (url: string) => (state: { adminChangelog: AdminChangelogState }) => {
    const { posts } = state.adminChangelog;
    const post = posts.find((cp) => kebabCase(cp.urlName) === url);
    return post;
  };

export const getAdminChangelogStateError = (state: {
  adminChangelog: AdminChangelogState;
}) => (state.adminChangelog && state.adminChangelog.error) || '';

export const isAdminChangelogStateLoading = (state: {
  adminChangelog: AdminChangelogState;
}) => (state.adminChangelog && state.adminChangelog.isLoading) || false;

export default adminChangelogSlice.reducer;
