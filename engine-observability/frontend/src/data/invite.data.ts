import { get, post, remove } from '@/utils/fetch.util';

export interface MemberInviteParams {
  emails: string[];
  roleId: string;
  companyId: string;
}

export const inviteCompanyMembers = (body: MemberInviteParams) =>
  post({
    url: '/api/v1/app/invites/create',
    data: body,
  }).then((resp) => resp.data);

export const getAllPendingInvites = () =>
  get({
    url: '/api/v1/app/invites/list',
  }).then((resp) => resp.data);

export const deleteInvite = (inviteId: string) =>
  remove({
    url: `/api/v1/app/invites/delete/${inviteId}`,
  }).then((resp) => resp.data);
