import type { UserEmailPreferenceParams } from '@/components/UserEmailPreferenceForm/UserEmailPreference';
import type { UserProfileParams } from '@/components/UserProfileForm/UserProfile';
import { put } from '@/utils/fetch.util';

export const updateUserProfile = (
  body: UserProfileParams | UserEmailPreferenceParams
) =>
  put({
    url: '/api/v1/app/member/profile',
    data: body,
  }).then((resp) => resp.data);
