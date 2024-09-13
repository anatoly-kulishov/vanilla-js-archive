import { AccountSelectionFormPageAccountTypeValue, OrderCardFormLSKeys } from '../..';
import { CardFormLSApi } from '../../lib';

export const getDefaultAccountSelectionValues = (
  cardFormLSApi: CardFormLSApi,
  productType: string,
) => {
  if (!cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE)) {
    cardFormLSApi.setValue(OrderCardFormLSKeys.PRODUCT_TYPE, productType);
  } else if (cardFormLSApi.getValue(OrderCardFormLSKeys.PRODUCT_TYPE) !== productType) {
    cardFormLSApi.clearFormData(Object.values(OrderCardFormLSKeys));
  }

  return {
    accountType:
      cardFormLSApi.getValue<AccountSelectionFormPageAccountTypeValue>(
        OrderCardFormLSKeys.ACCOUNT_TYPE,
      ) ?? AccountSelectionFormPageAccountTypeValue.EXISTING,
    accountId: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.ACCOUNT_ID) ?? undefined,
    currency: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.CURRENCY) ?? undefined,
    paymentSystem: cardFormLSApi.getValue<string>(OrderCardFormLSKeys.PAYMENT_SYSTEM) ?? undefined,
  };
};
