import { get } from '@/utils/fetch.util';

export const checkAPIHealth = () =>
  get({
    url: '',
  }).then((resp) => resp.data);
