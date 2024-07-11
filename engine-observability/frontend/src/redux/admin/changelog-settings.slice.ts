/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { ChangelogSetting, ChangelogSettingState } from '@/types';

export interface ChangelogSettingActionData<T> {
  payload: T;
  type: string;
}

const initialState: ChangelogSettingState = {
  setting: {},
  isLoading: false,
  error: '',
};

export const changelogSettingsSlice = createSlice({
  name: 'changelogSettings',
  initialState,
  reducers: {
    setChangelogSettings: (
      state: Draft<ChangelogSettingState>,
      action: ChangelogSettingActionData<ChangelogSetting>
    ) => {
      state.setting = action.payload;
      state.isLoading = false;
    },
    setUpdatedChangelogSettings: (
      state: Draft<ChangelogSettingState>,
      action: ChangelogSettingActionData<ChangelogSetting>
    ) => {
      state.setting = action.payload;
      state.isLoading = false;
    },
    setChangelogSettingStateLoading: (
      state: Draft<ChangelogSettingState>,
      action: ChangelogSettingActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setChangelogSettingStateError: (
      state: Draft<ChangelogSettingState>,
      action: ChangelogSettingActionData<string>
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
  setChangelogSettings,
  setUpdatedChangelogSettings,
  setChangelogSettingStateLoading,
  setChangelogSettingStateError,
} = changelogSettingsSlice.actions;

export const getChangelogSettings = (state: {
  changelogSettings: ChangelogSettingState;
}) => (state.changelogSettings && state.changelogSettings.setting) || {};

export const getChangelogSettingStateError = (state: {
  changelogSettings: ChangelogSettingState;
}) => (state.changelogSettings && state.changelogSettings.error) || '';

export const isChangelogSettingStateLoading = (state: {
  changelogSettings: ChangelogSettingState;
}) => (state.changelogSettings && state.changelogSettings.isLoading) || false;

export default changelogSettingsSlice.reducer;
