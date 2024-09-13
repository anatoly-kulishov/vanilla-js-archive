import { FC, ReactNode, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  AMOUNT_MAX_VALUE,
  AMOUNT_MIN_VALUE,
  DEPOSIT_MAX_TERM,
  DEPOSIT_MIN_TERM,
  CREDIT_MIN_TERM,
  CREDIT_MAX_TERM,
  IFiltersFormFields,
  ProductsFilters,
} from '@/entities';
import { FilterButton, ICreditProduct, IDepositProduct } from '@/shared';
import { shouldDisplay } from './utils';

interface IFiltersForm {
  type: 'credit' | 'deposit';
  products: ICreditProduct[] | IDepositProduct[];
  children: ReactNode;
}

export const FiltersForm: FC<IFiltersForm> = ({ type, products, children }) => {
  const [isFiltersShow, setIsFiltersShow] = useState(false);

  const methods = useForm<IFiltersFormFields<(ICreditProduct | IDepositProduct)[]>>({
    shouldUnregister: true,
    mode: 'all',
    defaultValues: {
      actualProductsList: products,
    },
  });
  const { getValues, setValue, reset, watch } = methods;

  const onFilterButtonClick = () => {
    setIsFiltersShow((state) => !state);
    if (isFiltersShow) {
      reset({}, { keepDefaultValues: true });
    } else {
      setValue('currency', 'RUB');
      setValue('purpose', 'Любая');
      setValue('amount', '');
      setValue('term', '');
    }
  };

  const { currency, purpose, amount, term } = watch();

  useEffect(() => {
    const amountValue = Number(amount);
    const termValue = Number(term);

    const isAmountValid =
      amountValue >= AMOUNT_MIN_VALUE[type][currency] &&
      amountValue <= AMOUNT_MAX_VALUE[type][currency];
    const isTermValid =
      type === 'credit'
        ? termValue >= CREDIT_MIN_TERM && termValue <= CREDIT_MAX_TERM
        : termValue >= DEPOSIT_MIN_TERM && termValue <= DEPOSIT_MAX_TERM;

    const filterProductList = products.filter((product) =>
      shouldDisplay(product, getValues(), isAmountValid, isTermValid),
    );
    (currency || purpose || amount || term) && setValue('actualProductsList', filterProductList);
  }, [currency, purpose, amount, term]);

  return (
    <FormProvider {...methods}>
      {products?.length > 0 && <FilterButton onClick={onFilterButtonClick} label='Фильтры' />}
      {isFiltersShow && <ProductsFilters type={type} />}
      {children}
    </FormProvider>
  );
};
