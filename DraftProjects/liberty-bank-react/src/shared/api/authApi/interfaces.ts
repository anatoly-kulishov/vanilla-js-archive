export interface IUserPhone {
  mobilePhone: string;
  id: string;
}

export interface ISmsTimer {
  blockSeconds: number;
}

export interface IResVerificationByCode {
  sessionToken: string;
}
export interface IReqVerificationByCode {
  mobilePhone: string;
  verificationCode: string;
}

export interface IPasswordRecovery {
  sessionToken: string;
  newPassword: string;
}

export interface ICreatePassword {
  sessionToken: string;
  password: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IQueryCustomerInfo extends IAccessToken {
  customerId: string;
}
