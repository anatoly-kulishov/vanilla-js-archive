import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationScheme } from '../model/validationScheme';
import { CreateAccountFormArgs } from '../model/types';

export const useCreateAccountForm = (customerId: string) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateAccountFormArgs>({
    defaultValues: {
      isMain: false,
      accountType: 'PAYMENT',
      currency: '',
      customerId: customerId,
    },
    resolver: yupResolver(validationScheme),
  });

  return { control, isValid, handleSubmit };
};
