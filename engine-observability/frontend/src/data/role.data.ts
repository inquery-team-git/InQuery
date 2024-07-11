import { get } from '@/utils/fetch.util';

export const fetchRolesList = () =>
  get({
    url: '/api/v1/app/role/list',
  }).then((resp) => resp.data);
