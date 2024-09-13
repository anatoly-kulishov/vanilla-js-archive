import axios from "axios";
import type ResponseAuth from "types/response/auth";
import type AuthRequests from "types/requests/auth";
import { BASE_AUTH_URL } from "@t2crm/wfm-utils/lib/constants/apiUrls";

export const getUserInfo = (id: number) =>
  axios.get<ResponseAuth.UserInfo>(`${BASE_AUTH_URL}/localapi/v1/Users/${id}`);

export const enableUser = (userId: number) =>
  axios.put(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/enabled`);

export const disableUser = (userId: number) =>
  axios.put(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/disabled`);

export const updatePassword = (userId: number, newPassword: string) =>
  axios.post(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/password`, {
    newPassword,
  });

export const getUserClaims = (userId: number) =>
  axios.get<ResponseAuth.IndividualClaim[]>(
    `${BASE_AUTH_URL}/localapi/v1/Users/${userId}/Claims`
  );

export const createUserClaim = ({
  userId,
  claim,
}: AuthRequests.UserClaimsParams) =>
  axios.post(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/Claims`, claim);

export const deleteUserClaim = ({
  userId,
  claim,
}: AuthRequests.UserClaimsParams) =>
  axios.delete(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/Claims`, {
    data: { ...claim },
  });

export const getUserRoles = ({ userId }: AuthRequests.GetUserRolesParams) =>
  axios.get<string[]>(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/Roles`);

export const getRoles = () =>
  axios.get<ResponseAuth.Role[]>(`${BASE_AUTH_URL}/localapi/v1/Roles`);

export const addUserRole = ({
  userId,
  roleName,
}: AuthRequests.AddUserRoleParams) =>
  axios.post(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/Roles`, {
    roleName,
  });

export const deleteUserRole = ({
  userId,
  roleName,
}: AuthRequests.DeleteUserRolesParams) =>
  axios.delete(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/Roles`, {
    data: { roleName },
  });

export const enabledTwoFactorAuth = (userId: number) =>
  axios.put(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/TwoFactor/enabled`);

export const disabledTwoFactorAuth = (userId: number) =>
  axios.put(`${BASE_AUTH_URL}/localapi/v1/Users/${userId}/TwoFactor/disabled`);
