import axios from "axios";
import type Common from "@t2crm/wfm-utils/lib/types/common";
import PartnersResponse from "types/response/partners";
import PartnersRequest from "types/requests/partners";
import { BASE_PARTNERS_URL } from "@t2crm/wfm-utils/lib/constants/apiUrls";

export const getDealers = (filters?: Common.KeyValue) =>
  axios.get<PartnersResponse.Dealer[]>(`${BASE_PARTNERS_URL}/api/v1/Dealers`, {
    params: filters,
  });

export const getPartners = (filters?: Common.KeyValue) =>
  axios.get<PartnersResponse.PagablePartners>(
    `${BASE_PARTNERS_URL}/api/v1/Partners`,
    { params: filters }
  );

export const getPartnerById = (partnerId: number) =>
  axios.get<PartnersResponse.PartnerByIdInfo>(
    `${BASE_PARTNERS_URL}/api/v1/Partners/${partnerId}`
  );

export const createPartner = (
  params: PartnersRequest.CreateOrModifyPartnerParams
) => axios.post(`${BASE_PARTNERS_URL}/localapi/v1/Partners`, params);

export const modifyPartner = (
  params: PartnersRequest.CreateOrModifyPartnerParams
) => axios.put(`${BASE_PARTNERS_URL}/localapi/v1/Partners`, params);

export default {
  getPartners,
  createPartner,
  modifyPartner,
};
