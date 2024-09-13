import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  CURRENCY,
  CurrencyCode,
  Icon,
  Input,
  LabelBox,
  PATH_PAGE,
  Preloader,
  Text,
  getAccessToken,
  getCustomerId,
  useGetActiveAccountsByCurrencyQuery,
} from '@/shared';
import { TEXT } from './constants';
import { IMoneyTransferFormFields } from './types';
import { formatNumberWithCurrency, getOptionsToSelect, hideAccountNumber } from './utils';
import styles from './MoneyTransferForm.module.scss';

interface IMoneyTransferForm {
  hideModal: () => void;
  accountNumber: string;
  currency: CurrencyCode;
  balance: number;
}

export const MoneyTransferForm: FC<IMoneyTransferForm> = ({
  hideModal,
  currency,
  balance,
  accountNumber,
}) => {
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const {
    data: activeAccounts,
    error,
    isLoading,
  } = useGetActiveAccountsByCurrencyQuery({
    customerId: customerId,
    currency,
  });

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  const {
    control,
    formState: { errors, isValid },
    watch,
    getValues,
  } = useForm<IMoneyTransferFormFields>({
    mode: 'onChange',
    defaultValues: {
      transferToAccount: { accountNumber, balance },
    },
  });

  const transferFromAccountValue = watch('transferFromAccount');

  return (
    <form className={styles.container}>
      {isLoading && <Preloader />}
      {activeAccounts && (
        <>
          <Text tag='h2' weight='medium'>
            {TEXT.title}
          </Text>

          <div className={styles.inputContainer}>
            <LabelBox
              id='transferFromAccount'
              label={TEXT.transferFromAccount}
              className={styles.labelBox}
              error={errors.transferFromAccount?.message}
              isContentLeft
              required
            >
              <Controller
                name='transferFromAccount'
                rules={{
                  deps: 'amount',
                  required: { value: true, message: TEXT.requiredValidation },
                }}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input.Select
                    placeholder={TEXT.transferFromAccountPlaceholder}
                    options={activeAccounts && getOptionsToSelect(activeAccounts, currency)}
                    white
                    contentLeft={
                      transferFromAccountValue && <Icon icon='ruble' widthAndHeight='36px' />
                    }
                    label={
                      transferFromAccountValue &&
                      hideAccountNumber(transferFromAccountValue.accountNumber)
                    }
                    {...field}
                    onMySelect={(option) => {
                      typeof option === 'object' &&
                        field.onChange({
                          accountNumber: option.value,
                          balance: option.caption,
                        });
                    }}
                    value={{
                      anotherValue: formatNumberWithCurrency(
                        currency,
                        transferFromAccountValue?.balance,
                      ),
                      value: transferFromAccountValue?.accountNumber,
                    }}
                    isUsedAnotherValue
                    isError={!!error}
                  />
                )}
              />
            </LabelBox>

            <LabelBox
              id='transferToAccount'
              label={TEXT.transferToAccount}
              className={styles.labelBox}
              error={errors.transferToAccount?.message}
              isContentLeft
              required
            >
              <Controller
                name='transferToAccount'
                rules={{
                  required: { value: true, message: TEXT.requiredValidation },
                }}
                control={control}
                render={({ field }) => (
                  <Input.Select
                    {...field}
                    placeholder={TEXT.transferToAccountPlaceholder}
                    options={[accountNumber]}
                    contentRight={false}
                    contentLeft={<Icon icon='ruble' widthAndHeight='36px' />}
                    white
                    onMySelect={field.onChange}
                    value={formatNumberWithCurrency(currency, balance)}
                    label={hideAccountNumber(accountNumber)}
                    disabled
                  />
                )}
              />
            </LabelBox>

            <LabelBox
              id='amount'
              label={TEXT.amount}
              className={styles.labelBox}
              error={errors.amount?.message}
              isContentLeft
              required
            >
              <Controller
                name='amount'
                rules={{
                  validate: {
                    checkMaxValue: (value) => {
                      const transferFromAccountBalance = getValues('transferFromAccount.balance');

                      if (typeof transferFromAccountBalance === 'undefined') return true;
                      return (
                        !value ||
                        value <= transferFromAccountBalance ||
                        TEXT.notEnoughMoneyValidation
                      );
                    },

                    noStartsWithZero: (value) =>
                      !value.toString().startsWith('0') || TEXT.noZeroValidation,
                  },
                  required: { value: true, message: TEXT.requiredValidation },
                }}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input.Text
                    id='amount'
                    placeholder={TEXT.amountPlaceholder}
                    size='s'
                    white
                    className={styles.input}
                    isError={!!error}
                    mask='*** *** ***'
                    isReverseMask
                    chars={/[0-9]/}
                    contentRight={CURRENCY[currency].text}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                  />
                )}
              />
            </LabelBox>
          </div>

          <Button
            type='button'
            theme='primary'
            className={styles.navigationBlock__button}
            onClick={() => hideModal()}
            disabled={!isValid}
          >
            {TEXT.button}
          </Button>
        </>
      )}
    </form>
  );
};
