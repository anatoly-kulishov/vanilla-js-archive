import { SelectOption, CurrencyCode } from '@/shared';

export interface TransferOption extends SelectOption {
  additionalData: {
    balance: number;
    currency: CurrencyCode;
  };
}

export interface TransferByCardNumberFormArgs {
  essenceFrom: string;
  recipientCard: string;
  amount: string;
  comment?: string;
}
