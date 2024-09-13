import { CURRENCY, CurrencyCode } from '../../..';

export interface IChangeStatusArgs {
  id: string;
  status: string;
}

export interface IChangeStatusResponse {
  status?: string;
}

export interface IAccount {
  accounts: IAccountInfo[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

export interface IActiveAccountsByCurrency extends Pick<IAccount, 'accounts'> {}

export interface IGetAllAccountsArgs {
  page?: number;
  size?: number;
  sort?: string[];
  customerId?: string;
  id?: string;
  statuses?: string;
}

export interface IGetActiveAccountsByCurrencyArgs
  extends Pick<IGetAllAccountsArgs, 'customerId' | 'size' | 'page'> {
  currency: CurrencyCode;
}

export interface IAccountInfo {
  id: string;
  customerId: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  currency: keyof typeof CURRENCY;
  openDate: string;
  closeDate: string;
  accountType: 'PAYMENT' | 'CREDIT' | 'DEPOSIT';
  status: 'ACTIVE' | 'BLOCKED' | 'CLOSED';
  isMain: boolean;
}

export interface ICreateAccountArgs {
  isMain: boolean;
  accountType: string;
  currency: string;
  customerId?: string;
}

export interface IChangeName {
  id: string;
  accountName: string;
}

export interface IResponseName {
  accountName?: string;
}

export interface IChangeIsMain {
  id: string;
  isMain: boolean;
}

export interface IResponseIsMain {
  isMain?: boolean;
}

export interface IRequisitesApiResponse {
  accountInfo: {
    [key: string]: string;
  };
  bankInfo: {
    [key: string]: string;
  };
}
