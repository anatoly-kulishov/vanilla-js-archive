import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  OrderCardFormLSKeys,
  PostDeliveryFormArgs,
  cardOrderPostDeliveryFormScheme,
} from '../model';
import { getDefaultPostDeliveryValues } from '../helpers/getDefaultPostDeliveryValues/getDefaultPostDeliveryValues';
import { CardFormLSApi } from '../lib';
import { useCardFormLSApi } from './useCardFormLSApi';

export const usePostDeliveryStepPageForm = (cardFormLSApi: CardFormLSApi) => {
  const {
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<PostDeliveryFormArgs>({
    defaultValues: getDefaultPostDeliveryValues(cardFormLSApi),
    resolver: yupResolver(cardOrderPostDeliveryFormScheme),
    mode: 'onBlur',
  });

  useCardFormLSApi(cardFormLSApi, watch, [
    {
      key: OrderCardFormLSKeys.DELIVERY_REGION,
      name: 'region',
    },
    {
      key: OrderCardFormLSKeys.POST_CODE,
      name: 'postCode',
    },
    {
      key: OrderCardFormLSKeys.CITY,
      name: 'city',
    },
    {
      key: OrderCardFormLSKeys.STREET,
      name: 'street',
    },
    {
      key: OrderCardFormLSKeys.BUILDING,
      name: 'building',
    },
    {
      key: OrderCardFormLSKeys.APARTMENT,
      name: 'apartment',
    },
    {
      key: OrderCardFormLSKeys.FLOOR,
      name: 'floor',
    },
    {
      key: OrderCardFormLSKeys.ENTRANCE,
      name: 'entrance',
    },
  ]);

  return {
    control,
    isValid,
    errors,
  };
};
