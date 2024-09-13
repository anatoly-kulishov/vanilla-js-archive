import { TSvgIconNames } from '../..';

export type CurrencyCode = 'RUB' | 'USD' | 'EUR';
export type CreditPurpose = 'ANY' | 'MORTGAGE' | 'AUTO' | 'PRODUCT';
export type StatusType = 'APPROVED' | 'PENDING' | 'REJECT' | 'WITHDRAWN' | 'ACCEPTED';
type TypeCredit = 'CONSUMER' | 'TARGET';
type CalculationMode = 'ANNUITY' | 'DIFFERENTIATED';

export interface ICreditRequest {
  id: string;
  name: string;
  amount: number;
  periodMonths: number;
  interestRate: number;
  currencyCode: CurrencyCode;
  status: StatusType;
  creationDate: string;
}

export interface ICreditHistoryProduct
  extends Pick<ICreditRequest, 'name' | 'periodMonths' | 'interestRate' | 'currencyCode'> {
  id: number;
  creditMainAccountNumber: string;
  openingDate: string;
  closingDate: string;
  creditAmount: number;
}

export interface IReportCreditRequest extends Omit<ICreditRequest, 'id'> {
  deliveryInCash: boolean;
  typeCredit: TypeCredit;
  calculationMode: CalculationMode;
  rateIsAdjustable: boolean;
}

export interface IUserCreditProduct {
  currencyCode: string;
  principalDebt: number;
  name: string;
  terminationDate: string;
  id: string;
}

export interface ICreditInfo {
  id: string;
  currencyCode: CurrencyCode;
  creditAmount: number;
  name: string;
  terminationDate: string;
  interestRate: number;
}

export interface ICreditProduct {
  id: number;
  name: string;
  interestRate: number;
  details: string;
  currencyCodeList: CurrencyCode[];
  creditPurpose?: CreditPurpose;
  minSum: number;
  maxSum: number;
  minPeriodMonths: number;
  maxPeriodMonths: number;
}

export interface IInfoCreditForm {
  id: string;
  name: string;
  minSum: number;
  maxSum: number;
  currencyCodeList: CurrencyCode[];
  minPeriodMonths: number;
  maxPeriodMonths: number;
}

export interface IDetails {
  icon: TSvgIconNames;
  header: string;
  details: string[];
}

export interface ICreditProductDetails extends IInfoCreditForm {
  creditDetails: IDetails[];
  interestRate: number;
  needGuarantees: boolean;
  deliveryInCash: boolean;
  earlyRepayment: boolean;
  needIncomeDetails: boolean;
  calculationMode: CalculationMode;
  gracePeriodMonths: number;
  rateIsAdjustable: boolean;
  tagline: string;
}

export interface ICreditFormData {
  amount: string;
  periodMonths: string;
  monthlyIncome: string;
  monthlyExpenditure: string;
  monthlyExpenditureDisabled?: string;
  identificationNumber: string;
  noCreditObligations: boolean;
  currencyCode: CurrencyCode;
}

export interface ICreditFormRequest {
  productId: number;
  amount: number;
  periodMonths: number;
  monthlyIncome: number;
  monthlyExpenditure: number;
  employerIdentificationNumber: string;
  currencyCode: CurrencyCode;
}

export interface ICreditFormResponse {
  id: number;
  productId: number;
  status: string;
  amount: number;
  periodMonths: number;
  creationDate: string;
}

export interface ICreditRequestsCount {
  count: number;
}

export interface ICurrentCredit
  extends Pick<ICreditRequest, 'name' | 'periodMonths' | 'interestRate' | 'currencyCode'> {
  creditAmount: number;
  currPeriodTransaction: number;
  generalDebt: number;
  percentCreditPayment: number;
  paymentDate: string;
  outstandingPrincipal: number;
  creditAccountNumber: string;
  isActive: boolean;
}

export interface IWithdrawCreditResponse extends Pick<ICreditRequest, 'status'> {
  creditOrderId: number;
}

export interface ICreditDebtInfo {
  generalDebt: number;
  percentCreditPayment: number;
  monthPayment: number;
  paymentDate: number[];
}

export interface ICreditCardFormData {
  averageMonthlyIncome: string;
  amount: string;
  checkboxConditions: boolean;
}
