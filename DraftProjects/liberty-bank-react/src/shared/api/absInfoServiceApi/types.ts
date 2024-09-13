export interface BankOffice {
  country: string;
  region: string;
  city: string;
  street: string;
  building_number: string;
  office_coordinates: string;
  post_code: string;
  ramp: boolean;
  consultation: boolean;
  insurance: boolean;
  status: string;
  office_uuid: string;
  office_number: string;
  phone_number: string;
  is_closed: boolean;
  opening_time: string;
  closing_time: string;
  currency_exchange: boolean;
  exotic_currency: boolean;
  money_transfer: boolean;
  cash_withdrawal: boolean;
  accept_payment: boolean;
  replenish_card: boolean;
  replenish_account: boolean;
  bik: string;
  kpp: string;
  inn: string;
  okpo: string;
  ogrn: string;
  swift: string;
  payment_account: string;
  correspondent_account: string;
  bank_name_full: string;
}

export interface Branch {
  branchNumber: string;
  country: string;
  region: string;
  city: string;
  postcode: string;
  street: string;
  buildingNumber: string;
  ramp: boolean;
  phoneNumber: string;
  status: string;
  operatingMode: string;
  currencyExchange: boolean;
  exoticCurrency: boolean;
  moneyTransfers: boolean;
  cashWithdrawals: boolean;
  acceptPayment: boolean;
  replenishCard: boolean;
  replenishAccount: boolean;
  consultation: boolean;
  insurance: boolean;
  BIC: string;
  INN: string;
  KPP: string;
  paymentAccount: string;
  correspondentAccount: string;
  [key: string]: string | boolean;
}

export interface BranchesList {
  totalCount: number;
  items: Branch[];
}

export interface IInput {
  branchNumber: string;
  country: string;
  region: string;
  city: string;
  postcode: string;
  street: string;
  buildingNumber: string;
  ramp: string;
  phoneNumber: string;
  status: string;
  operatingMode: string;
  currencyExchange: string;
  exoticCurrency: string;
  moneyTransfers: string;
  cashWithdrawals: string;
  acceptPayment: string;
  replenishCard: string;
  replenishAccount: string;
  consultation: string;
  insurance: string;
  BIC: string;
  INN: string;
  KPP: string;
  paymentAccount: string;
  correspondentAccount: string;
  [key: string]: string;
}
