import axios from "axios";
import RolesRequests from "types/requests/roles";
import RolesResponse from "types/response/roles";
import { BASE_AUTH_URL } from "@t2crm/wfm-utils/lib/constants/apiUrls";

const BASE_ROLE_ASSIGNMENT_URL = process.env.APPSELLER_SERVICES_URL;

export const getRoles = () =>
  axios.get<RolesResponse.Role[]>(`${BASE_AUTH_URL}/localapi/v1/Roles`);

export const getRoleById = (id: number) =>
  axios.get<RolesResponse.RoleFullData>(
    `${BASE_AUTH_URL}/localapi/v1/Roles/${id}`
  );

export const createRole = (name: string) =>
  axios.post(`${BASE_AUTH_URL}/localapi/v1/Roles`, { name });

export const createOperation = (params: RolesRequests.OperationParams) =>
  axios.post(`${BASE_AUTH_URL}/localapi/v1/Roles/${params.roleId}/Claims`, {
    name: params.operationName,
  });

export const deleteOperation = (params: RolesRequests.OperationParams) =>
  axios.delete(
    `${BASE_AUTH_URL}/localapi/v1/Roles/${params.roleId}/Claims/${params.operationName}`
  );

export const getPositions = (params: RolesRequests.PositionParams) =>
  axios.get<RolesResponse.Position[]>(
    `${BASE_ROLE_ASSIGNMENT_URL}/rolesassignment/Positions`,
    {
      params,
    }
  );

export const getRolesConditionsTypes = () =>
  axios.get<RolesResponse.ResponseRoleConditionsTypes>(`${BASE_ROLE_ASSIGNMENT_URL}/rolesassignment/AssignmentConditions/Types`)

export const getRoleConditions = (
  params: RolesRequests.RoleConditionalsParams
) =>
  axios.get(
    `${BASE_ROLE_ASSIGNMENT_URL}/rolesassignment/AssignmentConditions/Role/${params.id}`,
    {
      params,
    }
  );

export const updateRoleConditions = (
  params: RolesRequests.UpdateRoleConditionalsParams
) =>
  axios.put(
    `${BASE_ROLE_ASSIGNMENT_URL}/rolesassignment/AssignmentConditions/Role/${params.roleId}`,
    params
  );
