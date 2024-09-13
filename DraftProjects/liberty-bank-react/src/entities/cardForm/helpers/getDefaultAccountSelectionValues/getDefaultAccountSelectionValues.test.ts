import { OrderCardFormLSKeys, orderCardFormLSApi } from '../../model';
import { getDefaultAccountSelectionValues } from './getDefaultAccountSelectionValues';

const productType = 'Liberty Card Gold';
const anotherProductType = 'Liberty Card Child';
const defaultResult = {
  accountType: 'EXISTING',
  accountId: undefined,
  currency: undefined,
  paymentSystem: undefined,
};
const expectedResult = {
  accountType: 'NEW',
  accountId: 'some-id',
  currency: 'RUB',
  paymentSystem: 'VISA',
};

describe('getDefaultAccountSelectionValues', () => {
  test('should set a product type if product type not in storage', () => {
    expect(orderCardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBeNull();
    getDefaultAccountSelectionValues(orderCardFormLSApi, productType);
    expect(orderCardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBe(productType);
  });

  test('should return valid data from storage', () => {
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.PRODUCT_TYPE, productType);
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.ACCOUNT_TYPE,
      expectedResult.accountType,
    );
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.ACCOUNT_ID, expectedResult.accountId);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.CURRENCY, expectedResult.currency);
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.PAYMENT_SYSTEM,
      expectedResult.paymentSystem,
    );

    expect(getDefaultAccountSelectionValues(orderCardFormLSApi, productType)).toEqual(
      expectedResult,
    );
  });

  test('should return default value if the type name is different from what is in the storage', () => {
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.PRODUCT_TYPE, productType);
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.ACCOUNT_TYPE,
      expectedResult.accountType,
    );
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.ACCOUNT_ID, expectedResult.accountId);
    orderCardFormLSApi.setValue<string>(OrderCardFormLSKeys.CURRENCY, expectedResult.currency);
    orderCardFormLSApi.setValue<string>(
      OrderCardFormLSKeys.PAYMENT_SYSTEM,
      expectedResult.paymentSystem,
    );

    expect(getDefaultAccountSelectionValues(orderCardFormLSApi, anotherProductType)).toEqual(
      defaultResult,
    );
  });
});
