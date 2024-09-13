import { SelectOption, CurrencyCode } from '@/shared';

export interface TransferOption extends SelectOption {
  additionalData: {
    balance: number;
    currency: CurrencyCode;
  };
}

export interface TransferByAccountNumberFormArgs {
  essenceFrom: string;
  recipientAccount: string;
  bic: string;
  amount: string;
  comment?: string;
}
