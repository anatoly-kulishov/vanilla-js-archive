export type AccountStatus = 'ACTIVE' | 'BLOCKED' | 'CLOSED' | 'REQUEST';
export type AccountType = 'PAYMENT' | 'CREDIT' | 'DEPOSIT';
export type CurrencyType = 'RUB' | 'USD' | 'EUR';

export interface AccountInfo {
  id: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  currency: CurrencyType;
  openDate: string;
  closeDate: string;
  accountType: AccountType;
  status: AccountStatus;
  isMain: boolean;
}
