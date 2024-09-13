import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useReactHookFormWatch, CurrencyCode } from '@/shared';
import { createValidationSchema } from '../../lib/createValidationSchema/createValidationSchema';
import { TransferBetweenOwnsFormArgs, TransferOption } from '../../model/types';

export const useTransferBetweenOwnsForm = (allOptions: TransferOption[]) => {
  const [currentEssenceCurrency, setCurrentEssenceCurrency] = useState<undefined | CurrencyCode>(
    undefined,
  );
  const validationSchema = createValidationSchema(allOptions);

  const { control, handleSubmit, watch, setValue, formState, trigger } =
    useForm<TransferBetweenOwnsFormArgs>({
      defaultValues: { essenceFrom: '', essenceTo: '', amount: '' },
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

            setCurrentEssenceCurrency(currency);
            trigger(['amount', 'essenceTo']);
            if (values.essenceFrom === values.essenceTo) {
              setValue('essenceTo', '');
            }
          } else {
            setCurrentEssenceCurrency(undefined);
          }
          break;
        case 'essenceTo':
          if (values.essenceTo) {
            if (values.essenceTo === values.essenceFrom) {
              setValue('essenceFrom', '');
            }
          }
          break;
        default:
          break;
      }
    },
    [allOptions],
  );

  return { control, handleSubmit, currentEssenceCurrency, formState };
};
