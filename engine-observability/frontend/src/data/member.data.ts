import { get, patch, put, remove } from '@/utils/fetch.util';

export const fetchCompanyMembers = () =>
  get({
    url: '/api/v1/app/member/list',
  }).then((resp) => resp.data);

export const changePassword = () =>
  patch({
    url: '/api/v1/app/member/change-password',
  }).then((resp) => resp.data);

export const updateCompanyMemberRole = (userId: string, role: string) =>
  put({
    url: `/api/v1/app/ucrm/updateRole/${userId}`,
    data: { role },
  }).then((resp) => resp.data);

export const deleteCompanyMember = (userId: string) =>
  remove({
    url: `/api/v1/app/ucrm/delete/${userId}`,
  }).then((resp) => resp.data);
