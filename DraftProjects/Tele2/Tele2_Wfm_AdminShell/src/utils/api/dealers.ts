import axios from 'axios';
import DealersRequest from 'types/requests/dealers';
import DealersResponse from 'types/response/dealers';
import { BASE_PARTNERS_URL } from '@t2crm/wfm-utils/lib/constants/apiUrls';

export const getDealerById = (dealerId: number) => (
  axios.get<DealersResponse.DealerByIdInfo>(
    `${BASE_PARTNERS_URL}/api/v1/Dealers/${dealerId}`,
  )
);

export const createDealer = (params: DealersRequest.CreateOrModifyParams) => (
  axios.post(
    `${BASE_PARTNERS_URL}/localapi/v1/Dealers`, params,
  )
);

export const modifyDealer = (params: DealersRequest.CreateOrModifyParams) => (
  axios.put(
    `${BASE_PARTNERS_URL}/localapi/v1/Dealers`, params,
  )
);

export default {
  getDealerById,
  createDealer,
  modifyDealer,
};
