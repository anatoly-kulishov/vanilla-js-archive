import { OrderCardFormLSKeys } from '../..';
import { CardFormLSApi } from '../../lib';

export const getDefaultPostDeliveryValues = (cardFormLSApi: CardFormLSApi) => ({
  region: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.DELIVERY_REGION) ?? '',
  postCode: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.POST_CODE) ?? '',
  city: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.CITY) ?? '',
  street: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.STREET) ?? '',
  building: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.BUILDING) ?? '',
  apartment: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.APARTMENT) ?? '',
  floor: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.FLOOR) ?? '',
  entrance: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.ENTRANCE) ?? '',
});
