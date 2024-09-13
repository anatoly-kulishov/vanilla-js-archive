import type { TAllImages } from '../../ui';
import { StatusType } from '../creditApi';

type PaymentSystem = 'MIR' | 'MASTERCARD' | 'VISA';
type CurrencyCode = 'RUB' | 'USD' | 'EUR';
type CardStatus = 'ACTIVE' | 'BLOCKED' | 'CLOSED';
type CardLevel = 'CLASSIC' | 'GOLD';
export type CardTypeName =
  | 'Liberty Card Classic'
  | 'Liberty Card Child'
  | 'Liberty Card Gold'
  | 'Liberty Card Platinum'
  | 'Liberty Card Virtual'
  | 'Liberty Card Secure'
  | 'Liberty Card Travel';
export type DeliveryType = 'BRANCH' | 'RUSSIAN_POST' | 'COURIER' | 'EMAIL';

export interface IArgs {
  cardId: string;
  customerId: string;
}

export interface ICard {
  id: string;
  firstTwelveNumbers: string;
  lastFourNumbers: string;
  account: string;
  typeName: TAllImages;
  paymentSystem: PaymentSystem;
  balance: number;
  currency: CurrencyCode;
  expiredAt: string;
  closedAt: string;
  level: string;
  cardStatus: CardStatus;
  credit: boolean;
  favourite: boolean;
}

export interface ICreditCard
  extends Pick<
    ICard,
    'id' | 'firstTwelveNumbers' | 'lastFourNumbers' | 'level' | 'paymentSystem' | 'currency'
  > {
  generalBalance: number;
  name: string;
  status: CardStatus;
  expiredAt: string;
}

export interface ICardInfo {
  typeName: string;
  cardName: string;
  cardStatus: CardStatus;
  paymentSystem: PaymentSystem;
  level: string;
  balance: number;
  currency: CurrencyCode;
  cardNumber: string;
  securityCode: string;
  expiredAt: string;
  closedAt: string;
  favourite: boolean;
}

export interface ICreditCardInfo extends Omit<ICardInfo, 'favourite'> {}

export interface IChangeCardStatusArgs {
  cardId: string;
  customerId: string;
  cardStatus: CardStatus;
}

export interface IResponseStatus {
  status: number;
  message: string;
  timeStamp: string;
}

export interface IDebitCardProductResponse {
  id: string;
  typeName: CardTypeName;
  paymentSystem: PaymentSystem;
  currency: CurrencyCode;
  level: string;
  costPerMonth: number;
  virtual: boolean;
  validityTerm: number;
}

export interface IDebitCardProductsResponse {
  content: IDebitCardProductResponse[];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IDebitCardProduct
  extends Pick<IDebitCardProductResponse, 'typeName' | 'validityTerm'> {
  paymentSystem: PaymentSystem[];
  currency: CurrencyCode[];
  costPerMonth: number[];
}

export interface ICreditCardProductResponse {
  id: string;
  name: string;
  interestRate: number;
  currency: CurrencyCode;
  paymentSystem: PaymentSystem;
  levelOfCreditCardProduct: CardLevel;
  maxSum: number;
}

export interface ICreditCardProduct
  extends Pick<ICreditCardProductResponse, 'id' | 'name' | 'interestRate'> {
  typeName: TAllImages;
  currency: CurrencyCode[];
  paymentSystem: PaymentSystem[];
  maxSum: number[];
}

export interface ICreditCardOrderRequest {
  customerId: string;
  creditCardProductId: string;
  averageMonthlyIncome: number;
  amount: number;
}

export interface ICreditCardOrderResponse {
  creditOrderId: string;
  status: StatusType;
  amount: number;
  creationDate: number;
}

export interface ICardOrderRequest {
  type_name: CardTypeName;
  accountId?: string;
  customer: string;
  currency: CurrencyCode;
  paymentSystem: PaymentSystem;
  deliveryType: DeliveryType;
  officeNumber?: string;
  region?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  apartmentNumber?: number;
  entrance?: number;
  floor?: number;
  postcode?: number;
}

export interface ICardOrderResponse {
  applicationNumber: number;
  createdDate: string;
}

export type CardOrderResponse = ICardOrderResponse;

export interface IChangeCardPIN {
  id: string;
  customerId: string;
  oldPincode: string;
  newPincode?: string;
}

export interface IChangeCardCardPIN {
  id: string;
  pin: string;
}

export interface IChangeCardLimits {
  id: string;
  customerId: string;
  operationPerDay?: number;
  operationPerMonth?: number;
  amountPerDay?: number;
  amountPerMonth?: number;
  amountPerOperation: number;
  permitVirtualPayment?: boolean;
}
export interface ICardPINResponse {
  code: number;
  message: string;
  timeStamp: string;
}
export interface ISetFavorite {
  id: string;
  customerId: string;
  favourite: boolean;
}

export interface ICardTariffsResponse {
  productType: string;
  servicePrice: number;
  costPerMonth: number;
  freeCostFrom: number;
  addCardCost: number;
  cardReissueCost: number;
  currency: CurrencyCode;
  transferFee: {
    ourClient: number;
    partnerClient: number;
    anotherClientRu: number;
    anotherClientWorld: number;
    onBankAccount: number;
    byPhoneNumber: number;
    minFeeWorld: number;
  };
  withdrawalCashFee: {
    ourBank: number;
    partnersBank: number;
    anotherBankRu: number;
    anotherBankWorld: number;
    minCashFeeWorld: number;
  };
  cashback: {
    interestPerMonth: number;
    interestForAll: number;
    interestForPartners: number;
    cashbackLimit: number;
  };
}

export interface IGetTariffs {
  customerId: string;
  cardId: string;
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

export interface IGroupedCardProductsResponse {
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

export interface IUserCreditCard {
  id: string;
  name: string;
  status: CardStatus;
  firstTwelveNumbers: string;
  lastFourNumbers: string;
  validityPeriod: string;
  securityCode: string;
  paymentSystem: PaymentSystem;
  level: string;
  generalDebt: number;
  maxSum: number;
  currency: CurrencyCode;
  paymentScheduleCreatedAt: string;
  gracePeriodDay: number;
  generalBalance: number;
  endDate: string;
}

export interface ICreditCardProductInfo {
  name: string;
  minSum: number;
  maxSum: number;
  ourBank: number;
  anotherBankRu: number;
  anotherBankWorld: number;
  costPerMonth: number;
  freeCostFrom: boolean;
  cardReissue: number;
  isVirtual: boolean;
  maxOperationDay: number;
  maxOperationMonth: number;
  maxSumDay: number;
  maxSumMonth: number;
  maxSumOperation: number;
  maxCashDay: number;
  interestForPartners: number;
  interestPerMonth: number;
  cashbackLimit: number;
  ourClient: number;
  anotherClientRu: number;
  anotherClientWorld: number;
  anotherClientAnotherWorld: number;
  isActive: boolean;
  level: string;
  paymentSystem: PaymentSystem;
  currency: CurrencyCode;
  validityTerm: number;
  gracePeriodDay: number;
  interestRate: number;
}

interface ICardProductBenefits {
  benefitType: string;
  title: string;
  description: string;
}

export interface ICardProductBenefitsResponse {
  cardProductBenefits: ICardProductBenefits[];
}

export interface ICreditCardRequest {
  id: string;
  name: string;
  amount: number;
  validityTerm: number;
  interestRate: number;
  currency: CurrencyCode;
  status: StatusType;
  createdAt: string;
}
