import type { EnumPostReactions } from '@/types';
import { post, remove } from '@/utils/fetch.util';

export interface UpdateReactionRequestData {
  entityId: string;
  reaction: EnumPostReactions;
}

export const addReactionToChangelogPost = (body: UpdateReactionRequestData) =>
  post({
    url: `/api/v1/public/reaction/add`,
    data: {
      ...body,
      entityType: 'changelogPost',
    },
  }).then((resp) => resp.data);

export const removeReactionFromChangelogPost = (
  body: UpdateReactionRequestData
) =>
  remove({
    url: `/api/v1/public/reaction/remove`,
    data: {
      ...body,
      entityType: 'changelogPost',
    },
  }).then((resp) => resp.data);
