/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import type { Draft } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { remove, upperCase } from 'lodash';
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

export const companyLabelsSlice = createSlice({
  name: 'companyLabels',
  initialState,
  reducers: {
    setLabelsList: (
      state: Draft<LabelState>,
      action: LabelActionData<Label[]>
    ) => {
      state.labels = action.payload;
      state.isLoading = false;
    },
    setNewLabel: (state: Draft<LabelState>, action: LabelActionData<Label>) => {
      const { labels = [] } = state;
      state.labels = [action.payload, ...labels];
      state.isLoading = false;
    },
    updateLabel: (state: Draft<LabelState>, action: LabelActionData<Label>) => {
      const { labels = [] } = state;
      const updatedlabels = labels.map((label) => {
        if (label._id === action.payload._id) {
          return action.payload;
        }
        return label;
      });
      state.labels = updatedlabels;
      state.isLoading = false;
    },
    removeLabel: (state: Draft<LabelState>, action: LabelActionData<Label>) => {
      const { labels = [] } = state;
      const updatedlabels = remove(labels, (label) => {
        return label._id !== action.payload._id;
      });
      state.labels = updatedlabels;
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

export const {
  setLabelsList,
  setNewLabel,
  updateLabel,
  removeLabel,
  setLabelStateLoading,
  setLabelStateError,
} = companyLabelsSlice.actions;

export const getLabelsList = (state: { companyLabels: LabelState }) =>
  (state.companyLabels && state.companyLabels.labels) || [];

export const getFormattedLabelsList = (state: {
  companyLabels: LabelState;
}) => {
  const labels = (state.companyLabels && state.companyLabels.labels) || [];
  return labels.map((label) => ({
    value: label._id,
    text: upperCase(label.name),
  }));
};

export const getLabelStateError = (state: { companyLabels: LabelState }) =>
  (state.companyLabels && state.companyLabels.error) || '';

export const isLabelStateLoading = (state: { companyLabels: LabelState }) =>
  (state.companyLabels && state.companyLabels.isLoading) || false;

export default companyLabelsSlice.reducer;
