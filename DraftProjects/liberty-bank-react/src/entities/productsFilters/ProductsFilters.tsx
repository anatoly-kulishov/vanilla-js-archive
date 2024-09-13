import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Chips,
  CurrencyCode,
  ICreditProduct,
  IDepositProduct,
  Input,
  LabelBox,
  prepareAndSubstituteValue,
} from '@/shared';
import {
  currency,
  TEXT_FILTER,
  CREDIT_MIN_TERM,
  CREDIT_MAX_TERM,
  DEPOSIT_MAX_TERM,
  DEPOSIT_MIN_TERM,
  AMOUNT_MIN_VALUE,
  AMOUNT_MAX_VALUE,
  creditPurpose,
  depositPurpose,
  TextCreditPurpose,
  TextDepositPurpose,
  TERM_PLACEHOLDER,
  AMOUNT_PLACEHOLDER,
} from './constants';
import { calculateInputMaxLength } from './utils';
import styles from './ProductsFilters.module.scss';

interface IProductsFilters {
  type: 'credit' | 'deposit';
}

export interface IFiltersFormFields<ProductInterface> {
  amount: string;
  term: string;
  currency: CurrencyCode;
  purpose: TextCreditPurpose | TextDepositPurpose;
  actualProductsList: ProductInterface;
}

export const ProductsFilters: FC<IProductsFilters> = ({ type }) => {
  const {
    register,
    formState: { errors },
    getValues,
    resetField,
    setValue,
  } = useFormContext<IFiltersFormFields<(ICreditProduct | IDepositProduct)[]>>();

  const handleOnBlur = (minValue: number, maxValue: number, value: 'amount' | 'term') => {
    setValue(
      value,
      String(prepareAndSubstituteValue(Number(getValues(value)), minValue, maxValue, 'string')),
      { shouldValidate: true },
    );
  };

  return (
    <form className={styles.container}>
      <div className={styles.filter}>
        <div className={styles.__purposeSelection}>
          <Chips
            values={type === 'credit' ? creditPurpose : depositPurpose}
            type='radio'
            {...register('purpose')}
          />
        </div>

        <div className={styles.__currencySelection}>
          <Chips
            values={currency}
            type='radio'
            {...register('currency')}
            onClick={() => {
              resetField('amount');
              resetField('term');
            }}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <LabelBox
          id='amount'
          label={type === 'credit' ? TEXT_FILTER.creditAmount : TEXT_FILTER.depositAmount}
          fieldValue={getValues('currency')}
          className={styles.labelBox}
          error={errors.amount?.message}
        >
          <Controller
            name='amount'
            rules={{
              onBlur: () =>
                handleOnBlur(
                  AMOUNT_MIN_VALUE[type][getValues('currency')],
                  AMOUNT_MAX_VALUE[type][getValues('currency')],
                  'amount',
                ),
              pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
              min: {
                value: AMOUNT_MIN_VALUE[type][getValues('currency')],
                message: 'Введённая сумма меньше допустимой',
              },
              max: {
                value: AMOUNT_MAX_VALUE[type][getValues('currency')],
                message: 'Введённая сумма больше допустимой',
              },
            }}
            render={({ field }) => (
              <Input.Text
                id='amount'
                placeholder={AMOUNT_PLACEHOLDER[type][getValues('currency')]}
                size='l'
                className={styles.input}
                isError={!!errors.amount}
                maxLength={calculateInputMaxLength(AMOUNT_MAX_VALUE[type][getValues('currency')])}
                dataTestId='input-text-amount'
                mask='*** *** ***'
                isReverseMask
                chars={/[0-9]/}
                {...field}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
              />
            )}
          />
        </LabelBox>
        <LabelBox
          id='term'
          label={type === 'credit' ? TEXT_FILTER.creditTerm : TEXT_FILTER.depositTerm}
          fieldValue={TEXT_FILTER.months}
          className={styles.labelBox}
          error={errors.term?.message}
        >
          <Controller
            name='term'
            rules={{
              onBlur: () => handleOnBlur(CREDIT_MIN_TERM, CREDIT_MAX_TERM, 'term'),
              pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
              min: {
                value: type === 'credit' ? CREDIT_MIN_TERM : DEPOSIT_MIN_TERM,
                message: 'Введённый срок меньше допустимого',
              },
              max: {
                value: type === 'credit' ? CREDIT_MAX_TERM : DEPOSIT_MAX_TERM,
                message: 'Введённый срок больше допустимого',
              },
            }}
            render={({ field }) => (
              <Input.Text
                id='term'
                placeholder={TERM_PLACEHOLDER[type]}
                size='l'
                className={styles.input}
                isError={!!errors.term}
                maxLength={
                  type === 'credit'
                    ? calculateInputMaxLength(CREDIT_MAX_TERM)
                    : calculateInputMaxLength(DEPOSIT_MAX_TERM)
                }
                chars={/[0-9]/}
                dataTestId='input-text-term'
                {...field}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
              />
            )}
          />
        </LabelBox>
      </div>
    </form>
  );
};
