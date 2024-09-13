import { useEffect } from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import {
  RadioButton,
  Text,
  getAccessToken,
  getCustomerId,
  useGetAllAccountsQuery,
  useGetGroupedCardProductsQuery,
  maskStringAsterisks,
} from '@/shared';
import { StepPage } from '@/widgets/stepForm';
import {
  ACCOUNT_SELECTION_STEP_PAGE_TEXT,
  AccountSelectionFormPageAccountTypeValue,
  CardOrderStepFormAdditionalData,
  accountTypes,
} from '../../../model';
import { useAccountSelectionStepPageForm } from '../../../hooks/useAccountSelectionStepPageForm';
import { InputSelect } from '../../inputSelect/InputSelect';
import { groupingDebitCardProduct } from '../../../lib';
import styles from './AccountSelectionStepPage.module.scss';

export const AccountSelectionStepPage: StepPage<CardOrderStepFormAdditionalData> = ({
  additionalData: { cardFormLSApi, productType },
  setCanGoNext,
  setIsFormLoading,
}) => {
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const {
    data: myAccounts,
    isLoading: isAccountsLoading,
    accountOptions,
  } = useGetAllAccountsQuery(
    {
      customerId: customerId,
      statuses: 'ACTIVE',
      size: 50,
    },
    {
      selectFromResult: (result) => ({
        ...result,
        accountOptions: result.data?.accounts.map((a) => ({
          id: a.id,
          accountNumber: a.accountNumber,
          accountName: a.accountName,
          accountCurrency: a.currency,
          accountBallance: a.balance,
        })),
      }),
    },
  );
  const { control, isValid } = useAccountSelectionStepPageForm(
    myAccounts?.accounts,
    productType,
    cardFormLSApi,
  );
  const { data: cardProduct, isError } = useGetGroupedCardProductsQuery(productType);

  useEffect(() => {
    setIsFormLoading(isAccountsLoading);
  }, [isAccountsLoading]);

  useEffect(() => {
    setCanGoNext(isValid);
  }, [isValid]);

  // TODO: Добавить обработчик ошибок

  if (cardProduct && !isError) {
    const groupedCard = groupingDebitCardProduct(cardProduct);

    return (
      <div className={styles['account-selection-step-page']}>
        <div className={styles['account-selection-step-page__box-wrapper']}>
          <Text tag={'p'}>{ACCOUNT_SELECTION_STEP_PAGE_TEXT.ACCOUNT_TYPE_TITLE}</Text>
          <div className={styles['account-selection-step-page__account-radio-box']}>
            {accountTypes.map((accountType) => (
              <Controller
                key={accountType.value}
                control={control}
                name='accountType'
                render={({ field: { name, onChange, value } }) => (
                  <RadioButton
                    name={name}
                    value={accountType.value}
                    label={accountType.label}
                    size='s'
                    checked={value === accountType.value}
                    onChange={onChange}
                  />
                )}
              />
            ))}
          </div>
        </div>
        <Controller
          control={control}
          name='accountType'
          render={({ field: { value: accountTypeValue } }) => {
            switch (accountTypeValue) {
              case AccountSelectionFormPageAccountTypeValue.EXISTING:
                return (
                  <div className={styles['account-selection-step-page__box-wrapper']}>
                    <Text tag={'p'}>{ACCOUNT_SELECTION_STEP_PAGE_TEXT.ACCOUNT_TITLE}</Text>
                    <div className={styles['account-selection-step-page__account-select-box']}>
                      <Controller
                        control={control}
                        name='accountId'
                        render={({ field: { name, onChange, value } }) => {
                          return (
                            <InputSelect
                              name={name}
                              emptyOptionsText={
                                ACCOUNT_SELECTION_STEP_PAGE_TEXT.NO_SUITABLE_ACCOUNTS
                              }
                              options={
                                accountOptions
                                  ?.filter((a) => {
                                    return groupedCard.currencies.includes(a.accountCurrency);
                                  })
                                  .map((a) => ({
                                    value: a.id,
                                    text:
                                      a.accountName === a.accountNumber
                                        ? maskStringAsterisks(a.accountNumber, 4)
                                        : a.accountName,
                                    currency: a.accountCurrency,
                                    balance: a.accountBallance,
                                  })) ?? []
                              }
                              value={value ?? ''}
                              setValue={onChange}
                              placeholder={ACCOUNT_SELECTION_STEP_PAGE_TEXT.SELECT_ACCOUNT}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              default:
                return (
                  <div
                    className={classNames(styles['account-selection-step-page__box-wrapper'], {
                      [styles['account-selection-step-page__box-wrapper_width_50']]:
                        groupedCard.currencies.length === 1,
                    })}
                  >
                    <Text tag={'p'}>{ACCOUNT_SELECTION_STEP_PAGE_TEXT.CURRENCY_TITLE}</Text>
                    <div className={styles['account-selection-step-page__paymentSystem-radio-box']}>
                      {groupedCard.currencies.map((currency) => (
                        <Controller
                          key={currency}
                          control={control}
                          name='currency'
                          render={({ field: { name, onChange, value } }) => {
                            return (
                              <RadioButton
                                name={name}
                                value={currency}
                                label={currency}
                                size='s'
                                checked={value === currency}
                                onChange={onChange}
                              />
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
            }
          }}
        />
        <div
          className={classNames(styles['account-selection-step-page__box-wrapper'], {
            [styles['account-selection-step-page__box-wrapper_width_50']]:
              groupedCard.paymentSystems.length === 1,
          })}
        >
          <Text tag={'p'}>{ACCOUNT_SELECTION_STEP_PAGE_TEXT.PAYMENT_SYSTEM_TITLE}</Text>
          <div className={styles['account-selection-step-page__paymentSystem-radio-box']}>
            {groupedCard.paymentSystems.map((paymentSystem) => (
              <Controller
                key={paymentSystem}
                control={control}
                name='paymentSystem'
                render={({ field: { name, onChange, value } }) => (
                  <RadioButton
                    name={name}
                    value={paymentSystem}
                    label={ACCOUNT_SELECTION_STEP_PAGE_TEXT[paymentSystem]}
                    size='s'
                    checked={value === paymentSystem}
                    onChange={onChange}
                  />
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};
