import { OrderCardFormLSKeys } from '../..';
import { CardFormLSApi } from '../../lib';

export const getDefaultCourierDeliveryValues = (cardFormLSApi: CardFormLSApi) => ({
  deliveryCity: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.CITY) ?? undefined,
  deliveryStreet: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.STREET) ?? undefined,
  deliveryBuilding: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.BUILDING) ?? undefined,
  deliveryDate: cardFormLSApi.getDate(OrderCardFormLSKeys.DELIVERY_DATE) ?? undefined,
  deliveryTime: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.DELIVERY_TIME) ?? undefined,
  deliveryApartment: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.APARTMENT) ?? undefined,
  deliveryFloor: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.FLOOR) ?? undefined,
  deliveryEntrance: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.ENTRANCE) ?? undefined,
});
