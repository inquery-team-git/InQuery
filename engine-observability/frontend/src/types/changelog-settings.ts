export type ChangelogSetting = {
  _id: string;
  company: string;
  hasRSSFeed: boolean;
  allowIdentified: boolean;
  private: boolean;
  viewerHasAccess: boolean;
  hasEntries: boolean;
  hasPublishedEntries: boolean;
  allowedDomains: string[];
  createdAt: Date;
};

export interface ChangelogSettingState {
  isLoading: boolean;
  error: string;
  setting: Partial<ChangelogSetting>;
}
