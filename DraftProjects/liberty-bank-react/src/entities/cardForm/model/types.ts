import { StepPage } from '@/widgets/stepForm';
import { FC } from 'react';
import { CardFormLSApi } from '../lib';
import { CurrencyCode, PaymentSystem } from '@/shared';

export enum CardForm {
  ORDER_CARD = 'ORDER_CARD',
  REISSUE_CARD = 'REISSUE_CARD',
}

export enum OrderCardFormLSKeys {
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  PAGE_INDEX = 'PAGE_INDEX',
  ACCOUNT_TYPE = 'ACCOUNT_TYPE',
  ACCOUNT_ID = 'ACCOUNT_ID',
  CURRENCY = 'CURRENCY',
  PAYMENT_SYSTEM = 'PAYMENT_SYSTEM',
  DELIVERY_TYPE = 'DELIVERY_TYPE',
  CITY = 'CITY',
  STREET = 'STREET',
  BUILDING = 'BUILDING',
  APARTMENT = 'APARTMENT',
  FLOOR = 'FLOOR',
  ENTRANCE = 'ENTRANCE',
  DELIVERY_DATE = 'DELIVERY_DATE',
  DELIVERY_TIME = 'DELIVERY_TIME',
  BANK_BRANCH_ID = 'BANK_BRANCH_ID',
  DELIVERY_REGION = 'DELIVERY_REGION',
  POST_CODE = 'POST_CODE',
}

export enum ReissueCardFormLSKeys {
  PAGE_INDEX = 'PAGE_INDEX',
  REISSUE_REASON = 'REISSUE_REASON',
  DELIVERY_TYPE = 'DELIVERY_TYPE',
  CITY = 'CITY',
  STREET = 'STREET',
  BUILDING = 'BUILDING',
  APARTMENT = 'APARTMENT',
  FLOOR = 'FLOOR',
  ENTRANCE = 'ENTRANCE',
  DELIVERY_DATE = 'DELIVERY_DATE',
  DELIVERY_TIME = 'DELIVERY_TIME',
}

export enum OrderCardPageFlowName {
  DEFAULT = 'DEFAULT',
  VIRTUAL = 'VIRTUAL',
}

export enum ReissueCardPageFlowName {
  DEFAULT = 'DEFAULT',
}

export type OrderCardPageFlows = Record<
  OrderCardPageFlowName,
  (StepPage<CardOrderStepFormAdditionalData> | StepPage<StepFormAdditionalData>)[]
>;

export type ReissueCardPageFlows = Record<
  ReissueCardPageFlowName,
  (StepPage<ReissueCardStepFormAdditionalData> | StepPage<StepFormAdditionalData>)[]
>;

export enum AccountSelectionFormPageAccountTypeValue {
  EXISTING = 'EXISTING',
  NEW = 'NEW',
}

export enum DeliveryTypeFormPageDeliveryTypeValue {
  COURIER = 'COURIER',
  BANK = 'BRANCH',
  POST = 'RUSSIAN_POST',
}

export enum ReissueCardFormPageReissueReasons {
  LOST = 'LOST',
  EXPIRED = 'EXPIRED',
}

export interface AccountSelectionFormPageAccountType {
  value: AccountSelectionFormPageAccountTypeValue;
  label: string;
}

export interface DeliveryTypeFormPageDeliveryType {
  value: DeliveryTypeFormPageDeliveryTypeValue;
  label: string;
  // TODO: Значение ниже временное. Введено к MVP, после доработки остальных сценариев доставки должно быть удалено.
  disabled: boolean;
}

export interface ReissueCardFormPageReasonType {
  value: ReissueCardFormPageReissueReasons;
  label: string;
}

export interface AccountSelectionFormArgs {
  accountType: AccountSelectionFormPageAccountTypeValue;
  accountId?: string;
  currency: string;
  paymentSystem: string;
}

export interface CourierDeliveryFormArgs {
  deliveryCity: string;
  deliveryStreet: string;
  deliveryBuilding: string;
  deliveryDate: Date;
  deliveryTime: string;
  deliveryApartment?: string;
  deliveryFloor?: string;
  deliveryEntrance?: string;
}

export interface PostDeliveryFormArgs {
  region: string;
  postCode: string;
  city: string;
  street: string;
  building: string;
  apartment?: string;
  floor?: string;
  entrance?: string;
}

export interface ReissueCardFormArgs {
  reason: ReissueCardFormPageReissueReasons;
}

export type AccountSelectionFormPageProductInfo = {
  typeName: string;
  paymentSystems: PaymentSystem[];
  currencies: CurrencyCode[];
};

export interface StepFormBaseAdditionalData<T> {
  pageFlow: (StepPage<T> | StepPage<StepFormAdditionalData>)[];
  cardFormLSApi: CardFormLSApi;
}

export interface CardOrderStepFormAdditionalData
  extends StepFormBaseAdditionalData<CardOrderStepFormAdditionalData> {
  productType: string;
}

export interface ReissueCardStepFormAdditionalData
  extends StepFormBaseAdditionalData<ReissueCardStepFormAdditionalData> {}

export type StepFormAdditionalData =
  | ReissueCardStepFormAdditionalData
  | CardOrderStepFormAdditionalData;

export interface AccountOption {
  id: string;
  accountNumber: string;
}

interface DeliveryPageProps {
  setCanGoNext: (v: boolean) => void;
  isFormLoading: boolean;
  setIsFormLoading: (v: boolean) => void;
}

export type DeliveryPage = FC<DeliveryPageProps>;

export type CardFormLSKeys = OrderCardFormLSKeys | ReissueCardFormLSKeys;

interface TransferFee {
  ourClient: number;
  partnerClient: number;
  anotherClientRu: number;
  anotherClientWorld: number;
  onBankAccount: number;
  byPhoneNumber: number;
  minFeeWorld: number;
}

interface WithdrawalCashFee {
  ourBank: number;
  partnersBank: number;
  anotherBankRu: number;
  anotherBankWorld: number;
  minCashFeeWorld: number;
}

interface ProductLimit {
  operationPerDayMax: number;
  operationPerMonthMax: number;
  amountPerOperationMax: number;
  amountPerDayMax: number;
  amountPerMonthMax: number;
  withdrawalCashPerDay: number;
}

interface Cashback {
  interestPerMonth: number;
  interestForAll: number;
  interestForPartners: number;
  cashbackLimit: number;
}

interface BonusProgram {
  partnersBonus: boolean;
  bestExchangeRate: boolean;
}

export interface CardProduct {
  id: string;
  typeName: string;
  paymentSystem: PaymentSystem;
  credit: boolean;
  active: boolean;
  transferFee: TransferFee;
  withdrawalCashFee: WithdrawalCashFee;
  costPerMonth: number;
  freeCostFrom: number;
  servicePrice: number;
  cardReissue: number;
  addCardCost: number;
  virtual: boolean;
  productLimit: ProductLimit;
  cashback: Cashback;
  bonusProgram: BonusProgram;
  level: string;
  currency: CurrencyCode;
  validityTerm: number;
  oneUse: boolean;
}

export interface Position {
  lat: number;
  lon: number;
}

export interface BankBranchSearchArgs {
  searchQuery: string;
}
