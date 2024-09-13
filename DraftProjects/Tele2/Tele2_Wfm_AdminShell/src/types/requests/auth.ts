import ResponseAuth from "types/response/auth";

declare namespace AuthRequests {
  interface UserClaimsParams {
    userId: number;
    claim: ResponseAuth.IndividualClaim;
  }

  interface GetUserRolesParams {
    userId: number;
  }

  interface AddUserRoleParams {
    userId: number;
    roleName: string;
  }

  interface DeleteUserRolesParams {
    userId: number;
    roleName: string;
  }
}

export default AuthRequests;
