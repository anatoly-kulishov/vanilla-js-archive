import { PaymentSystem, CurrencyCode } from '@/shared';

export interface GroupedTransferFee {
  ourClient: number;
  partnerClient: number;
  anotherClientRu: number;
  anotherClientWorld: number;
  onBankAccount: number;
  byPhoneNumber: number;
  minFeeWorld: number[];
}

export interface GroupedWithdrawalCashFee {
  ourBank: number;
  partnersBank: number;
  anotherBankRu: number;
  anotherBankWorld: number;
  minCashFeeWorld: number[];
}

export interface GroupedCashback {
  interestPerMonth: number;
  interestForAll: number;
  interestForPartners: number;
  cashbackLimit: number[];
}

export interface GroupedCard {
  typeName: string;
  paymentSystem: PaymentSystem[];
  transferFee: GroupedTransferFee;
  withdrawalCashFee: GroupedWithdrawalCashFee;
  costPerMonth: number[];
  freeCostFrom: number[];
  servicePrice: number[];
  cardReissue: number[];
  addCardCost: number[];
  cashback: GroupedCashback;
  currency: CurrencyCode[];
  validityTerm: number;
}

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
