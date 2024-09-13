declare namespace RequestAccessPolicy {
  type GetLimitedClaim = {
    RoleName: string;
    ClaimValue: string;
  };

  type CreateLimitedClaim = Omit<UpdateLimitedClaim, 'id'>

  type UpdateLimitedClaim = {
    id: number;
    roleName: string;
    claimValue: string;
    limitedTypeId: number;
    value: string;
  };

  type DeleteLimitedClaim = {
    id?: number;
  };
}
