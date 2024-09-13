import { useForm } from 'react-hook-form';
import { useCardFormLSApi } from './useCardFormLSApi';
import { getDefaultAccountSelectionValues } from '../helpers/getDefaultAccountSelectionValues/getDefaultAccountSelectionValues';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AccountSelectionFormArgs,
  AccountSelectionFormPageAccountTypeValue,
  OrderCardFormLSKeys,
} from '..';
import { cardOrderAccountSelectionFormScheme, useReactHookFormWatch } from '@/shared';
import { CardFormLSApi } from '../lib';
import { AccountInfo } from '../..';
import { useEffect } from 'react';

export const useAccountSelectionStepPageForm = (
  accounts: AccountInfo[] | undefined,
  productType: string,
  cardFormLSApi: CardFormLSApi,
) => {
  const {
    control,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<AccountSelectionFormArgs>({
    defaultValues: getDefaultAccountSelectionValues(cardFormLSApi, productType),
    resolver: yupResolver(cardOrderAccountSelectionFormScheme),
  });

  useEffect(() => {
    if (!cardFormLSApi.getValue(OrderCardFormLSKeys.ACCOUNT_TYPE)) {
      cardFormLSApi.setValue(
        OrderCardFormLSKeys.ACCOUNT_TYPE,
        AccountSelectionFormPageAccountTypeValue.EXISTING,
      );
    }
  }, []);

  useReactHookFormWatch(
    watch,
    (values, { name }) => {
      switch (name) {
        case 'accountType':
          cardFormLSApi.clearValue(OrderCardFormLSKeys.ACCOUNT_ID);
          cardFormLSApi.clearValue(OrderCardFormLSKeys.CURRENCY);
          setValue('currency', '');
          setValue('accountId', '');
          break;
        case 'accountId':
          if (values.accountId) {
            const account = accounts?.find((a) => a.id === values.accountId);

            if (account) {
              cardFormLSApi.setValue(OrderCardFormLSKeys.CURRENCY, account.currency);
              setValue('currency', account.currency);
            }
          }
          break;
      }
    },
    [accounts],
  );

  useCardFormLSApi(cardFormLSApi, watch, [
    {
      key: OrderCardFormLSKeys.ACCOUNT_TYPE,
      name: 'accountType',
    },
    {
      key: OrderCardFormLSKeys.ACCOUNT_ID,
      name: 'accountId',
    },
    {
      key: OrderCardFormLSKeys.CURRENCY,
      name: 'currency',
    },
    {
      key: OrderCardFormLSKeys.PAYMENT_SYSTEM,
      name: 'paymentSystem',
    },
  ]);

  return {
    control,
    isValid,
  };
};
