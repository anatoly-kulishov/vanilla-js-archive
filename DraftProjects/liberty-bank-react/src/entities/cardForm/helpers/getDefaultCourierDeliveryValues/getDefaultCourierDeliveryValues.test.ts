import { OrderCardFormLSKeys, orderCardFormLSApi } from '../../model';
import { getDefaultCourierDeliveryValues } from './getDefaultCourierDeliveryValues';

const date = new Date();
const defaultResult = {
  deliveryCity: undefined,
  deliveryStreet: undefined,
  deliveryBuilding: undefined,
  deliveryDate: undefined,
  deliveryTime: undefined,
  deliveryApartment: undefined,
  deliveryFloor: undefined,
  deliveryEntrance: undefined,
};
const expectedResult = {
  deliveryCity: 'Москва',
  deliveryStreet: 'Пушкина',
  deliveryBuilding: '12',
  deliveryDate: date,
  deliveryTime: '15-45',
  deliveryApartment: '48',
  deliveryFloor: '7',
  deliveryEntrance: '1',
};

describe('getDefaultCourierDeliveryValues', () => {
  test('should return default value if the storage is empty', () => {
    expect(getDefaultCourierDeliveryValues(orderCardFormLSApi)).toEqual(defaultResult);
  });

  test('should return valid data from storage', () => {
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.CITY, expectedResult.deliveryCity);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.STREET, expectedResult.deliveryStreet);
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.BUILDING,
      expectedResult.deliveryBuilding,
    );
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.DELIVERY_DATE, date.toISOString());
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.DELIVERY_TIME,
      expectedResult.deliveryTime,
    );
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.APARTMENT,
      expectedResult.deliveryApartment,
    );
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.FLOOR, expectedResult.deliveryFloor);
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.ENTRANCE,
      expectedResult.deliveryEntrance,
    );

    expect(getDefaultCourierDeliveryValues(orderCardFormLSApi)).toEqual(expectedResult);
  });
});
