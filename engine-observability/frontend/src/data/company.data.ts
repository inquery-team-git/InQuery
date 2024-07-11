import type { CompanyUpdateParams } from '@/components/CompanyUpdateForm/CompanyUpdate';
import { put } from '@/utils/fetch.util';

export const updateCompanyBasicDetails = (
  body: Partial<CompanyUpdateParams>,
  companyId: string
) =>
  put({
    url: `/api/v1/app/company/update/${companyId}`,
    data: body,
  }).then((resp) => resp.data);
