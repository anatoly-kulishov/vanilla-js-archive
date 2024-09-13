import { CardFormLSApi } from './CardFormLSApi';
import { CardForm, OrderCardFormLSKeys } from '../../model/types';

describe('CardFormLSApi', () => {
  let cardFormLSApi: CardFormLSApi;

  beforeEach(() => {
    cardFormLSApi = new CardFormLSApi(CardForm.ORDER_CARD);
  });

  test('should return null initially', () => {
    expect(cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBeNull();
    expect(cardFormLSApi.getDate(OrderCardFormLSKeys.DELIVERY_DATE)).toBeNull();
  });

  test('should return null after clear value', () => {
    cardFormLSApi.setValue<string>(OrderCardFormLSKeys.PRODUCT_TYPE, 'Liberty Card Gold');
    expect(cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBe('Liberty Card Gold');

    cardFormLSApi.clearValue(OrderCardFormLSKeys.PRODUCT_TYPE);
    expect(cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBeNull();
  });

  test('should return null after clear form', () => {
    const date = new Date();

    cardFormLSApi.setValue<string>(OrderCardFormLSKeys.PRODUCT_TYPE, 'Liberty Card Gold');
    expect(cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBe('Liberty Card Gold');

    cardFormLSApi.setValue(OrderCardFormLSKeys.DELIVERY_DATE, date);
    expect(cardFormLSApi.getDate(OrderCardFormLSKeys.DELIVERY_DATE)).toEqual(date);

    cardFormLSApi.clearFormData([
      OrderCardFormLSKeys.PRODUCT_TYPE,
      OrderCardFormLSKeys.DELIVERY_DATE,
    ]);
    expect(cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)).toBeNull();
    expect(cardFormLSApi.getValue(OrderCardFormLSKeys.DELIVERY_DATE)).toBeNull();
  });
});
