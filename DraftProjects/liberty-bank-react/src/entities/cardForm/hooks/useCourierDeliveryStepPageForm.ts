import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { getDefaultCourierDeliveryValues } from '../helpers/getDefaultCourierDeliveryValues/getDefaultCourierDeliveryValues';
import { cardOrderCourierDeliveryFormSchema } from '@/shared';
import { CourierDeliveryFormArgs, OrderCardFormLSKeys } from '..';
import { CardFormLSApi } from '../lib';
import { useCardFormLSApi } from './useCardFormLSApi';

export const useCourierDeliveryStepPageForm = (cardFormLSApi: CardFormLSApi) => {
  const {
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<CourierDeliveryFormArgs>({
    defaultValues: getDefaultCourierDeliveryValues(cardFormLSApi),
    resolver: yupResolver(cardOrderCourierDeliveryFormSchema),
    mode: 'onBlur',
  });

  useCardFormLSApi(cardFormLSApi, watch, [
    {
      key: OrderCardFormLSKeys.CITY,
      name: 'deliveryCity',
    },
    {
      key: OrderCardFormLSKeys.STREET,
      name: 'deliveryStreet',
    },
    {
      key: OrderCardFormLSKeys.BUILDING,
      name: 'deliveryBuilding',
    },
    {
      key: OrderCardFormLSKeys.DELIVERY_DATE,
      name: 'deliveryDate',
    },
    {
      key: OrderCardFormLSKeys.DELIVERY_TIME,
      name: 'deliveryTime',
    },
    {
      key: OrderCardFormLSKeys.APARTMENT,
      name: 'deliveryApartment',
    },
    {
      key: OrderCardFormLSKeys.FLOOR,
      name: 'deliveryFloor',
    },
    {
      key: OrderCardFormLSKeys.ENTRANCE,
      name: 'deliveryEntrance',
    },
  ]);

  return {
    control,
    isValid,
    errors,
  };
};
