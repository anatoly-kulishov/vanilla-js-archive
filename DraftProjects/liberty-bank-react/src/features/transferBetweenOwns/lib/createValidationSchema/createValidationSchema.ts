import { object, string } from 'yup';
import { parseLocaleStringToNumber } from '@/features/transferBetweenOwns/lib/parseLocaleStringToNumber/parseLocaleStringToNumber';
import { TEXT } from '../../model/constants';
import { TransferOption } from '../../model/types';

export const createValidationSchema = (allOptions: TransferOption[]) => {
  return object().shape({
    essenceFrom: string().required(TEXT.error.required),
    essenceTo: string()
      .required(TEXT.error.required)
      .test('essenceTo', TEXT.error.sameCurrency, (value, context) => {
        const essenceFrom = context.parent.essenceFrom;
        const currentCurrencyTo = allOptions.find((o) => o.value === value)?.additionalData
          .currency;
        const currentCurrencyFrom = allOptions.find((o) => o.value === essenceFrom)?.additionalData
          .currency;

        return currentCurrencyTo === currentCurrencyFrom;
      }),
    amount: string()
      .required(TEXT.error.required)
      .test('amount', TEXT.error.notZero, (value) => {
        return parseLocaleStringToNumber(value) >= 1;
      })
      .test('amount', TEXT.error.insufficientFunds, (value, context) => {
        const essenceFrom = context.parent.essenceFrom;
        const currentBalance = allOptions.find((o) => o.value === essenceFrom)?.additionalData
          .balance;

        return (
          !value ||
          (currentBalance !== undefined && parseLocaleStringToNumber(value) <= currentBalance)
        );
      }),
  });
};
