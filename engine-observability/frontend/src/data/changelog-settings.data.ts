import { get, put } from '@/utils/fetch.util';

export interface ChangelogSettingsRequestData {
  hasRSSFeed: boolean;
  allowIdentified: boolean;
  private: boolean;
  allowedDomains: string[];
}

export const updateChangelogSettings = (
  companyId: string,
  body: Partial<ChangelogSettingsRequestData>
) =>
  put({
    url: `/api/v1/app/company/changelogSetting/${companyId}`,
    data: body,
  }).then((resp) => resp.data);

export const fetchChangelogSettings = (companyId: string) =>
  get({
    url: `/api/v1/app/company/changelogSetting/${companyId}`,
  }).then((resp) => resp.data);
