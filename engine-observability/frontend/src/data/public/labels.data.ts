import { get } from '@/utils/fetch.util';

export interface LabelRequestData {
  name: string;
}

export const getAllLabels = () =>
  get({
    url: '/api/v1/public/labels/list',
  }).then((resp) => resp.data);
