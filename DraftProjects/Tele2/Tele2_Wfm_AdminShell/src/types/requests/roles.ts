declare namespace RolesRequests {
  interface PositionParams {
    name?: string;
  }

  interface OperationParams {
    roleId: number;
    operationName: string;
  }

  interface RoleConditionalsParams {
    id: number;
    roleName: string;
  }

  type AssignmentCondition = {
    parameterTypeId: number;
    parameterTypeName: string;
    values: string[];
  };

  interface UpdateAssignmentConditionsParams {
    parameterTypeId: number;
    parameterTypeName: string;
    parameterValue: string;
  }

  interface UpdateRoleConditionalsParams {
    roleId: number;
    roleName: string;
    assignmentConditions: UpdateAssignmentConditionsParams[];
  }
}

export default RolesRequests;
