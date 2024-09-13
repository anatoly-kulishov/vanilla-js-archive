declare namespace ResponseAuth {
  export type IndividualClaim = {
    type: string;
    value: string;
  };

  export type UserInfo = {
    id: number;
    login: string;
    roles: string[];
    displayName: string;
    email: string;
    enabled: boolean;
    individualClaims: IndividualClaim[];
    lockedOut: boolean;
    lockoutEnd?: string;
    twoFactorEnabled: boolean;
  };

  export type Role = {
    name: string;
  };
}

export default ResponseAuth;
