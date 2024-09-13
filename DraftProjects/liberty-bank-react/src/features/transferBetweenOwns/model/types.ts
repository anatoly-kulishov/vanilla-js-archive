import { SelectOption, CurrencyCode } from '@/shared';

export interface TransferOption extends SelectOption {
  additionalData: {
    balance: number;
    currency: CurrencyCode;
  };
}

export interface TransferBetweenOwnsFormArgs {
  essenceFrom: string;
  essenceTo: string;
  amount: string;
}
