import { AUTH_TYPE } from '..';

export interface ICity {
  cityId?: number;
  cityName: string;
  isDefault?: boolean;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IRequestLogin {
  login: string;
  password: string;
  type: AUTH_TYPE;
}

export interface IRequestUpdateEmail {
  email: string;
}
export interface IChangePassword {
  password: string;
  newPassword: string;
}

export interface IAPIError {
  message: string;
}

export interface IJwtPayload {
  exp: number;
  sub: string;
}

export interface IResponseCustomerInfo {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  mobilePhone: string;
  email: string;
  customerStatus: string;
}

export interface IResponseCustomerNotifications {
  email: string;
  smsNotification: boolean;
  pushNotification: boolean;
  emailSubscription: boolean;
}

export interface IChangeNotifications {
  notificationStatus: boolean;
  customerId: string;
  type: string;
  accessToken: string;
}

export interface IResponseInvestUserInfo {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  series: string;
  number: string;
  issuedBy: string;
  departmentCode: string;
  dateOfIssue: string;
  region: string;
  location: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  inn: string;
  mobilePhone: string;
  email: string;
  residence: boolean;
  abroadTax: boolean;
  beneficialOwner: boolean;
  representative: boolean;
  beneficiary: boolean;
  citizenship: string;
}

export interface IResponseInvestClosingStatement {
  localdate: string;
  customerLastName: string;
  customerFirstName: string;
  customerMiddleName: string;
  brokerAccountName: string;
  depoAccountRegNumber: string;
  passportSeries: string;
  passportNumber: string;
  passportIssuedBy: string;
  passportDepartmentCode: string;
  passportDateOfIssue: string;
}

export interface IApiResponseError {
  data: {
    error: {
      code: string;
      message: string;
      type: string;
      uri: string;
    };
  };
  status: number;
}

export interface IApiResponse {
  error?: IApiResponseError;
  data?: {
    status: string;
  };
}

export interface SmsResponce {
  customerId: string;
}
export enum CurrencyValues {
  dollar = '$',
  ruble = '₽',
  euro = '€',
  yuan = '¥',
}
export enum CatalogFilters {
  withAllAssets = 'По всем активам',
  withBriefcase = 'По портфелю',
  withSelectedAssets = 'По выбранным активам',
}
export interface IAssetsFavorites {
  stocks: string[];
  bonds: string[];
  currency: string[];
}

export interface IInvestOptions {
  briefcaseCurrency: CurrencyValues;
  catalogFilter: CatalogFilters;
  isNotificationsWithPeriodEnabled: boolean;
  isNotificationsEnabled: boolean;
  notificationsPeriod: string;
}

export interface BrokerAccountStatus {
  userHaveActiveBrokerAccount: boolean;
}

export interface AccessToken {
  accessToken: string | null;
}

export interface InvestNotification {
  percentPrice: string;
  numPrice: number;
}

export type PaymentSystem = 'MIR' | 'MASTERCARD' | 'VISA';
export type CardStatus = 'ACTIVE' | 'BLOCKED' | 'CLOSED';
