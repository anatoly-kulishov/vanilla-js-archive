import { object, string } from 'yup';
import { parseLocaleStringToNumber } from '@/features/transferBetweenOwns/lib/parseLocaleStringToNumber/parseLocaleStringToNumber';
import { COMMENT_REG_EXP, TEXT } from '../../model/constants';
import { TransferOption } from '../../model/types';

export const createValidationSchema = (allOptions: TransferOption[]) => {
  return object().shape({
    essenceFrom: string().required(TEXT.error.required),
    recipientAccount: string()
      .required(TEXT.error.required)
      .test('recipientAccount', TEXT.error.accountNumberLength, (value) => {
        return value.replace(/\s+/g, '').length === 20;
      }),
    bic: string()
      .required(TEXT.error.required)
      .test('recipientAccount', TEXT.error.bicNumberLength, (value) => {
        return value.replace(/\s+/g, '').length === 9;
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
    comment: string()
      .max(70, TEXT.error.maxCommentLength)
      .test('comment', TEXT.error.invalidCommentSymbol, (value) => {
        return value ? COMMENT_REG_EXP.test(value) : true;
      }),
  });
};
