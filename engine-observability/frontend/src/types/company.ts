export interface Company {
  _id: string;
  apiKey: string;
  name: string;
  subdomain: string;
  primaryColor: string;
  viewerReportFrequency: string;
  sendViewerReportEmails: boolean;
  fullScreenAdminView: boolean;
  showChangelog: boolean;
  description: string;
  isActive: boolean;
  customDomain: string;
  customDomainEnabled: boolean;
}

export interface CompanyDetail {
  userId: string;
  role: string;
  companyId: string;
  companyName: string;
  subdomain: string;
  companyDescription: string;
  companyHash: string;
  showActive: boolean;
}
