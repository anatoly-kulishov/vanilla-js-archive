import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CurrencyCode, useReactHookFormWatch } from '@/shared';
import { createValidationSchema } from '../../lib/createValidationSchema/createValidationSchema';
import { TransferOption, TransferByCardNumberFormArgs } from '../../model/types';

export const useTransferByCardNumberForm = (allOptions: TransferOption[]) => {
  const [currentEssenceCurrency, setCurrentEssenceCurrency] = useState<undefined | CurrencyCode>(
    undefined,
  );
  const validationSchema = createValidationSchema(allOptions);

  const {
    watch,
    control,
    handleSubmit,
    trigger,
    formState: { isValid },
  } = useForm<TransferByCardNumberFormArgs>({
    defaultValues: {
      essenceFrom: '',
      recipientCard: '',
      amount: '',
      comment: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  useReactHookFormWatch(
    watch,
    (values, { name }) => {
      switch (name) {
        case 'essenceFrom':
          if (values.essenceFrom) {
            const currency = allOptions.find((o) => o.value === values.essenceFrom)?.additionalData
              .currency;

            trigger(['amount']);
            setCurrentEssenceCurrency(currency);
          } else {
            setCurrentEssenceCurrency(undefined);
          }
          break;
        default:
          break;
      }
    },
    [allOptions],
  );

  return {
    watch,
    control,
    handleSubmit,
    trigger,
    isValid,
    currentEssenceCurrency,
  };
};
