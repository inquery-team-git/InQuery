import type {
  ChangelogPostCreate,
  ChangelogPostEdit,
  ChangelogPostStatusUpdate,
} from '@/types';
import { get, post, put, remove } from '@/utils/fetch.util';

export const createNewChangelogPost = (body: Partial<ChangelogPostCreate>) =>
  post({
    url: `/api/v1/app/changelogPost/create`,
    data: body,
  }).then((resp) => resp.data);

export const updateChangelogPostStatus = (
  postId: string,
  body: Partial<ChangelogPostStatusUpdate>
) =>
  put({
    url: `/api/v1/app/changelogPost/updateStatus/${postId}`,
    data: body,
  }).then((resp) => resp.data);

export const updateChangelogPostById = (
  postId: string,
  body: Partial<ChangelogPostEdit>
) =>
  put({
    url: `/api/v1/app/changelogPost/update/${postId}`,
    data: body,
  }).then((resp) => resp.data);

export const fetchAllChangelogPost = (query?: any) => {
  const queries = [];
  if (query && query.status && query.status.length) {
    queries.push(`status=${query.status}`);
  }
  if (query && query.types && query.types.length) {
    queries.push(`types=${query.types}`);
  }
  if (query && query.labels && query.labels.length) {
    queries.push(`labels=${query.labels}`);
  }
  return get({
    url: `/api/v1/app/changelogPost/list?${queries.join('&')}`,
  }).then((resp) => resp.data);
};

export const fetchChangelogPostById = (postId: string) =>
  get({
    url: `/api/v1/app/changelogPost/get/${postId}`,
  }).then((resp) => resp.data);

export const fetchChangelogPostByUrl = (url: string) =>
  get({
    url: `/api/v1/app/changelogPost/get-url/${url}`,
  }).then((resp) => resp.data);

export const deleteChangelogPostById = (postId: string) =>
  remove({
    url: `/api/v1/app/changelogPost/delete/${postId}`,
  }).then((resp) => resp.data);
