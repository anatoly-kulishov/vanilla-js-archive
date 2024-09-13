import { FC, memo } from 'react';
import styles from './SelectCurrency.module.scss';
import {
  CurrencyValues,
  setBriefcaseCurrency,
  setIsSettingsChanged,
  Text,
  SelectOptions,
} from '@/shared';
import { CURRENCY_VALUES, CURRENCY_TITLE } from '../constants';
import { useDispatch } from 'react-redux';

interface SelectCurrencyProps {
  briefcaseCurrency: CurrencyValues;
}

export const SelectCurrency: FC<SelectCurrencyProps> = memo(function SelectCurrency({
  briefcaseCurrency,
}) {
  const dispatch = useDispatch();

  const activeCurrency = CURRENCY_VALUES.indexOf(briefcaseCurrency);

  function selectCurrency(currency: CurrencyValues) {
    briefcaseCurrency === currency || dispatch(setIsSettingsChanged(true));
    switch (currency) {
      case CurrencyValues.ruble: {
        dispatch(setBriefcaseCurrency(CurrencyValues.ruble));
        break;
      }
      case CurrencyValues.dollar: {
        dispatch(setBriefcaseCurrency(CurrencyValues.dollar));
        break;
      }
      case CurrencyValues.euro: {
        dispatch(setBriefcaseCurrency(CurrencyValues.euro));
        break;
      }
      case CurrencyValues.yuan: {
        dispatch(setBriefcaseCurrency(CurrencyValues.yuan));
        break;
      }
    }
  }

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyBlock}>
        <Text tag={'p'} weight='medium' size='m' className={styles.currency__title}>
          {CURRENCY_TITLE}
        </Text>
        <SelectOptions
          options={CURRENCY_VALUES}
          optionsChange={selectCurrency}
          optionsType='one'
          activeTab={[activeCurrency]}
          className={styles.currency__options}
          textWidth='s'
        />
      </div>
    </div>
  );
});
