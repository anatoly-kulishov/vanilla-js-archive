import axios from "axios";

const BASE_ACCESS_POLICY_URL = process.env.APPSELLER_SERVICES_URL;
const SERVICE_NAME = "accesspolicyservice";

export const getLimitedTypes = () =>
  axios.get<ResponseAccessPolicy.GetLimitedTypes>(
    `${BASE_ACCESS_POLICY_URL}/${SERVICE_NAME}/RoleClaims/Limitations/Types`
  );


export const getLimitedClaim = ({ RoleName, ClaimValue }: RequestAccessPolicy.GetLimitedClaim) =>
  axios.get<ResponseAccessPolicy.GetLimitedClaim>(
    `${BASE_ACCESS_POLICY_URL}/${SERVICE_NAME}/RoleClaims/Limitations/Claims`,
    { params: { RoleName, ClaimValue } }
  );

export const createLimitedClaim = (payload: RequestAccessPolicy.CreateLimitedClaim) => axios.post(
  `${BASE_ACCESS_POLICY_URL}/${SERVICE_NAME}/RoleClaims/Limitations/Claims`,
  payload
)

export const updateLimitedClaim = (
  payload: RequestAccessPolicy.UpdateLimitedClaim
) =>
  axios.put(
    `${BASE_ACCESS_POLICY_URL}/${SERVICE_NAME}/RoleClaims/Limitations/Claims/${payload.id}`,
    payload
  );

export const deleteLimitedClaim = (
  payload: RequestAccessPolicy.DeleteLimitedClaim
) =>
  axios.delete(
    `${BASE_ACCESS_POLICY_URL}/${SERVICE_NAME}/RoleClaims/Limitations/Claims/${payload.id}`
  );

