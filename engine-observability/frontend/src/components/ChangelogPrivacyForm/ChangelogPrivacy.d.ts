export interface ChangelogPrivacyParams {
  type: 'public' | 'private';
  allowIdentified: boolean;
  domains: string;
  allowedDomains: string[];
}
