import { get } from '@/utils/fetch.util';

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
    url: `/api/v1/public/changelogPost/list?${queries.join('&')}`,
  }).then((resp) => resp.data);
};

export const fetchChangelogPostById = (postId: string) =>
  get({
    url: `/api/v1/public/changelogPost/get/${postId}`,
  }).then((resp) => resp.data);

export const fetchChangelogPostByUrl = (url: string) =>
  get({
    url: `/api/v1/public/changelogPost/get-url/${url}`,
  }).then((resp) => resp.data);
