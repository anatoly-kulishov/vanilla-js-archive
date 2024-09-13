import { ReactNode } from 'react';

type AccountInfo = {
  accountNumber: string;
  balance: number;
};

export interface IMoneyTransferFormFields {
  transferFromAccount: AccountInfo;
  transferToAccount: AccountInfo;
  amount: number;
}

export interface ISelectOption {
  value: string;
  balance: number;
  caption?: string;
  selectedIconType?: 'left' | 'right';
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  accountName?: string;
}
