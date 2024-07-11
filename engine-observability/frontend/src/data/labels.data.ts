import { get, post, put, remove } from '@/utils/fetch.util';

export interface LabelRequestData {
  name: string;
}

export const createNewLabel = (body: LabelRequestData) =>
  post({
    url: '/api/v1/app/labels/create',
    data: body,
  }).then((resp) => resp.data);

export const getAllLabels = () =>
  get({
    url: '/api/v1/app/labels/list',
  }).then((resp) => resp.data);

export const updateLabelData = (labelId: string, body: LabelRequestData) =>
  put({
    url: `/api/v1/app/labels/update/${labelId}`,
    data: body,
  }).then((resp) => resp.data);

export const deleteLabel = (labelId: string) =>
  remove({
    url: `/api/v1/app/labels/delete/${labelId}`,
  }).then((resp) => resp.data);
