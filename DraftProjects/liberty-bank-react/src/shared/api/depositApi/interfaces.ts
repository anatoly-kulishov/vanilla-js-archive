import { TSvgIconNames } from '../..';

type CurrencyCode = 'RUB' | 'USD' | 'EUR';
export type DepositPurpose = 'ACCUMULATION' | 'PAYMENT' | 'MULTIFUNCTIONAL';
export type SchemaName = 'FIXED' | 'RECURRING';

interface IDepositBase {
  id: string;
  name: string;
  currencyCodes: CurrencyCode[];
  minDurationMonths: number;
  maxDurationMonths: number;
  amountMin: number;
  amountMax: number;
}

export interface IDepositProduct extends IDepositBase {
  maxInterestRate: number;
  productDetails: string;
  depositPurpose?: DepositPurpose;
}

export interface IDepositHistoryProduct {
  customerId: string;
  depositId: string;
  finalSum: number;
  name: string;
  openDate: string;
  closeDate: string;
  withdrawalDate: string;
  currencyCode: CurrencyCode;
  initialAmount: number;
  interestRate: number;
  isCapitalization: boolean;
  moneyProfit: number;
}

export interface IInfoDepositForm extends IDepositBase {
  autoRenewal: boolean;
}

export interface IDepositFormData {
  amount: number;
  term: number;
  checkboxConditions: boolean;
  checkboxProlongation: boolean;
  selectedCurrency: CurrencyCode;
}

export interface IDepositFormRequest {
  depositProductId: number;
  initialAmount: number;
  depositTerm: number;
  autoRenewal: boolean;
  currencyCode: CurrencyCode;
}

export interface IDepositFormResponse {
  customerId: number;
  initialAmount: number;
  currencyCode: CurrencyCode;
  periodMonths: string;
  autoRenewal: boolean;
}

export interface IUserProduct extends Pick<IDepositBase, 'id' | 'name'> {
  currencyCode: CurrencyCode;
  closeDate: string;
  interestRate: number;
  currentBalance: number;
  depAccountNumber: string;
  type?: 'credit' | 'deposit';
}

export interface IDepositDetails {
  icon: TSvgIconNames;
  header: string;
  details: string[];
}

export interface IDepositInfoData extends IInfoDepositForm {
  schemaName: string;
  interestRateEarly: number;
  isCapitalization: boolean;
  isRevocable: boolean;
  isActive: boolean;
  procentBorders: number;
  maxInterestRate: number;
  productDetails: string;
  depositDetail: IDepositDetails[];
  tagline: string;
}

export interface IUserDepositInfo extends Omit<IUserProduct, 'id'> {
  openDate: string;
  periodMonths: number;
  autoRenewal: boolean;
  isRevocable: boolean;
  isActive: boolean;
  initialAmount: number;
  schemaName: SchemaName;
}

export interface IRenewalStatusRequest {
  depositId: string;
  autoRenewal: boolean;
}

export interface IUserDepositInfoWithId {
  userDepositInfo: IUserDepositInfo;
  id?: string;
}

export interface IUserDepositRecall {
  isActive: boolean;
  mainDepAccountNumber: string;
}

export interface IProfitCalculationRequest {
  depositProductId: number;
  initialSum: number;
  termTime: number;
  isCapitalisation: boolean;
  currencyCode: CurrencyCode;
}

export interface IProfitCalculationResponse {
  finalSum: number;
  moneyProfit: number;
  percentProfit: number;
  currencyCode: CurrencyCode;
}
