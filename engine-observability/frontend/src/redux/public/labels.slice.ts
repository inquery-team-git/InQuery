/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { upperCase } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import type { Label, LabelState } from '@/types';

export interface LabelActionData<T> {
  payload: T;
  type: string;
}

const initialState: LabelState = {
  labels: [],
  isLoading: false,
  error: '',
};

export const publicLabelsSlice = createSlice({
  name: 'publicLabels',
  initialState,
  reducers: {
    setLabelsList: (
      state: Draft<LabelState>,
      action: LabelActionData<Label[]>
    ) => {
      state.labels = action.payload;
      state.isLoading = false;
    },
    setLabelStateLoading: (
      state: Draft<LabelState>,
      action: LabelActionData<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setLabelStateError: (
      state: Draft<LabelState>,
      action: LabelActionData<string>
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

export const { setLabelsList, setLabelStateLoading, setLabelStateError } =
  publicLabelsSlice.actions;

export const getLabelsList = (state: { publicLabels: LabelState }) =>
  (state.publicLabels && state.publicLabels.labels) || [];

export const getFormattedLabelsList = (state: { publicLabels: LabelState }) => {
  const labels = (state.publicLabels && state.publicLabels.labels) || [];
  return labels.map((label) => ({
    value: label._id,
    text: upperCase(label.name),
  }));
};

export const getLabelStateError = (state: { publicLabels: LabelState }) =>
  (state.publicLabels && state.publicLabels.error) || '';

export const isLabelStateLoading = (state: { publicLabels: LabelState }) =>
  (state.publicLabels && state.publicLabels.isLoading) || false;

export default publicLabelsSlice.reducer;
