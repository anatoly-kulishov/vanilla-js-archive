import { OrderCardFormLSKeys, orderCardFormLSApi } from '../../model';
import { getDefaultPostDeliveryValues } from './getDefaultPostDeliveryValues';

const defaultResult = {
  city: '',
  street: '',
  building: '',
  apartment: '',
  floor: '',
  postCode: '',
  region: '',
  entrance: '',
};
const expectedResult = {
  city: 'Москва',
  street: 'Пушкина',
  building: '12',
  apartment: '48',
  floor: '7',
  postCode: '121000',
  region: 'Москва',
  entrance: '1',
};

describe('getDefaultPostDeliveryValues', () => {
  test('should return default value if the storage is empty', () => {
    expect(getDefaultPostDeliveryValues(orderCardFormLSApi)).toEqual(defaultResult);
  });

  test('should return valid data from storage', () => {
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.CITY, expectedResult.city);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.STREET, expectedResult.street);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.BUILDING, expectedResult.building);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.APARTMENT, expectedResult.apartment);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.FLOOR, expectedResult.floor);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.POST_CODE, expectedResult.postCode);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.DELIVERY_REGION, expectedResult.region);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.ENTRANCE, expectedResult.entrance);

    expect(getDefaultPostDeliveryValues(orderCardFormLSApi)).toEqual(expectedResult);
  });
});
