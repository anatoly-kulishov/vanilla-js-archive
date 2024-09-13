declare namespace ResponseAccessPolicy {
  type GetLimitedClaim = {
    id: number;
    limitedTypeId: number;
    limitedTypeName: string;
    value: string;
  }[];

  type GetLimitedTypes = {
    id: number;
    name: string;
    isNeedValue: boolean;
  }[];

  type ClaimsType = {
    id: number;
    name: string;
  };
}
