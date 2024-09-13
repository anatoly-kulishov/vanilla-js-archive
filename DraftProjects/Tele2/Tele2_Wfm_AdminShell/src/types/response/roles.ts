declare namespace RolesResponse {
  type Position = {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  };

  type Role = {
    id: number;
    name: string;
  };

  type Claim = {
    type: string;
    value: string;
  };

  type RoleFullData = Role & {
    claims: Claim[];
  };

  type ConditionType = {
    id: number,
    parameter: string,
    name: string
  }

  type AssignmentCondition = {
    parameterTypeId: number;
    parameterTypeName: string;
    parameterValues: string[];
  };

  type ResponseRoleConditions = {
    assignmentConditionsList: AssignmentCondition[];
  };

  type ResponseRoleConditionsTypes = {
    types: ConditionType[];
  }
}

export default RolesResponse;
