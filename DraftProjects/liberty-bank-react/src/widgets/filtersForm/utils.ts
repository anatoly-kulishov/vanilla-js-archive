import { IFiltersFormFields, TextCreditPurpose, TextDepositPurpose } from '@/entities';
import { CreditPurpose, DepositPurpose, ICreditProduct, IDepositProduct } from '@/shared';

const filterByCreditPurpose = (itemValue?: CreditPurpose, filterValue?: TextCreditPurpose) => {
  switch (itemValue) {
    case 'ANY':
      return true;
    case 'MORTGAGE':
      return filterValue === 'Покупка недвижимости' || filterValue === 'Любая';
    case 'AUTO':
      return filterValue === 'Покупка авто' || filterValue === 'Любая';
    case 'PRODUCT':
      return filterValue === 'Покупка товара' || filterValue === 'Любая';
    default:
      throw new Error(`Обработка значения ${itemValue} не предусмотрена`);
  }
};
const filterByDepositPurpose = (itemValue?: DepositPurpose, filterValue?: TextDepositPurpose) => {
  switch (itemValue) {
    case 'MULTIFUNCTIONAL':
      return true;
    case 'ACCUMULATION':
      return filterValue === 'Для накопления' || filterValue === 'Любая';
    case 'PAYMENT':
      return filterValue === 'Для расчёта' || filterValue === 'Любая';
    default:
      throw `Обработка значения ${itemValue} не предусмотрена`;
  }
};

const filterByValue = (itemValue: number, filterValue: string, type: 'min' | 'max') => {
  return (
    !filterValue ||
    (type === 'min' ? itemValue <= Number(filterValue) : itemValue >= Number(filterValue))
  );
};

const isCreditProduct = (product: ICreditProduct | IDepositProduct): product is ICreditProduct =>
  (product as ICreditProduct).creditPurpose !== undefined;

export const shouldDisplay = (
  product: ICreditProduct | IDepositProduct,
  values: IFiltersFormFields<(ICreditProduct | IDepositProduct)[]>,
  isAmountValid: boolean,
  isTermValid: boolean,
): boolean => {
  if (isCreditProduct(product)) {
    const matchesCurrency = product.currencyCodeList.includes(values.currency);
    const matchesPurpose = filterByCreditPurpose(
      product.creditPurpose,
      values.purpose as TextCreditPurpose,
    );
    const matchesAmountMin =
      !isAmountValid || !product.minSum || filterByValue(product.minSum, values.amount, 'min');
    const matchesAmountMax =
      !isAmountValid || !product.maxSum || filterByValue(product.maxSum, values.amount, 'max');
    const matchesTermMin =
      !isTermValid ||
      !product.minPeriodMonths ||
      filterByValue(product.minPeriodMonths, values.term, 'min');
    const matchesTermMax =
      !isTermValid ||
      !product.maxPeriodMonths ||
      filterByValue(product.maxPeriodMonths, values.term, 'max');

    return (
      matchesCurrency &&
      matchesPurpose &&
      matchesAmountMin &&
      matchesAmountMax &&
      matchesTermMin &&
      matchesTermMax
    );
  } else {
    const matchesCurrency = product.currencyCodes.includes(values.currency);
    const matchesPurpose = filterByDepositPurpose(
      product.depositPurpose,
      values.purpose as TextDepositPurpose,
    );
    const matchesAmountMin =
      !isAmountValid ||
      !product.amountMin ||
      filterByValue(product.amountMin, values.amount, 'min');
    const matchesAmountMax =
      !isAmountValid ||
      !product.amountMax ||
      filterByValue(product.amountMax, values.amount, 'max');
    const matchesTermMin =
      !isTermValid ||
      !product.minDurationMonths ||
      filterByValue(product.minDurationMonths, values.term, 'min');
    const matchesTermMax =
      !isTermValid ||
      !product.maxDurationMonths ||
      filterByValue(product.maxDurationMonths, values.term, 'max');

    return (
      matchesCurrency &&
      matchesPurpose &&
      matchesAmountMin &&
      matchesAmountMax &&
      matchesTermMin &&
      matchesTermMax
    );
  }
};
