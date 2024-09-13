import axios from 'axios';
import type ResponseDictionaries from 'types/response/dictionaries';
import CompanyGroupsRequests from 'types/requests/companyGroups';
import { BASE_PARTNERS_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';

export const getCompanyGroupById = (companyGroupId: number) => (
  axios.get<ResponseDictionaries.CompanyGroup>(
    `${BASE_PARTNERS_URL}/api/v1/CompanyGroups/${companyGroupId}`,
  )
);

export const createCompanyGroup = (params: CompanyGroupsRequests.CreateCompanyGroupParams) => (
  axios.post<ResponseDictionaries.CompanyGroup>(
    `${BASE_PARTNERS_URL}/localapi/v1/CompanyGroups`, params,
  )
);

export const modifyCompanyGroup = (params: CompanyGroupsRequests.CreateCompanyGroupParams) => (
  axios.put<ResponseDictionaries.CompanyGroup>(
    `${BASE_PARTNERS_URL}/localapi/v1/CompanyGroups`, params,
  )
);

export default {
  getCompanyGroupById,
  modifyCompanyGroup,
  createCompanyGroup,
};
