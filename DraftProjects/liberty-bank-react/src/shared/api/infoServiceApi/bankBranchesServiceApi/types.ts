export interface City {
  cityId: number;
  cityName: string;
  isDefault: false;
}

export interface CitiesList {
  totalCount: number;
  items: City[];
}

export interface Schedule {
  dayOfWeek: 'ПН' | 'ВТ' | 'СР' | 'ЧТ' | 'ПТ' | 'СБ' | 'ВС';
  openingTime: string;
  closingTime: string;
}

export type BankBranchType = 'LOCAL_BRANCH' | 'ATM' | 'TERMINAL';

export interface ServicesBank {
  cashWithdraw: boolean;
  moneyTransfer: boolean;
  paymentsAcceptance: boolean;
  replenishment: boolean;
  currencyExchange: boolean;
  consultation: boolean;
  credit: boolean;
  deposit: boolean;
  insurance: boolean;
}

export interface CityBranch {
  id: string;
  branchNumber: number;
  bankBranchType: BankBranchType;
  branchLatitude: string;
  branchLongitude: string;
  cityName: string;
  branchAddress: string;
  isWorkingNow: boolean;
  isClosed: boolean;
  metro: string | null;
  legalEntity: boolean;
  physicalEntity: boolean;
  ramp: boolean;
  servicesBank: ServicesBank;
  workingSchedulePhysical: Schedule[];
  workingScheduleLegal: Schedule[];
}

export interface BankBranchAddress {
  country: string;
  region: string;
  city: string;
  metro: string;
  street: string;
  buildingNumber: string;
  coordinates: string;
  postCode: string;
  roomNumber: string;
}

export interface BankBranchPhoto {
  number: number;
  photo: string;
}

export interface BankBranch {
  isWorkingNow: boolean;
  officeUuid: string;
  officeNumber: string;
  address: BankBranchAddress;
  photos: BankBranchPhoto[];
  ramp: boolean;
  phoneNumber: string;
  isClosed: boolean;
  openingTime: string;
  closingTime: string;
  currencyExchange: boolean;
  exoticCurrency: boolean;
  moneyTransfer: boolean;
  cashWithdrawal: boolean;
  acceptPayment: boolean;
  replenishCard: boolean;
  replenishAccount: boolean;
  consultation: boolean;
  insurance: boolean;
  credit: boolean;
  deposit: boolean;
}
