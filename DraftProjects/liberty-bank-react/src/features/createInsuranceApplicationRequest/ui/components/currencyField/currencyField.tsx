import classNames from 'classnames';
import styles from '../../../shared/styles/styles.module.scss';
import { RadioButton, Text } from '@/shared';
import { HC_CONTRACT, HC_CURRENCIES } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';

type CurrencyType = 'rub' | 'usd' | 'eur';
interface PropsType {
  currencies: CurrencyType[];
}

export const CurrencyField: FC<PropsType> = ({ currencies }) => {
  const { control } = useFormContext();
  return (
    <div className={classNames(styles['form__field'])} id='currencyField'>
      <label htmlFor='currencyField' className={styles['form__field-label']}>
        <Text tag='p' size='s' weight='medium'>
          {HC_CONTRACT.chooseCurrency}
        </Text>
      </label>
      <div className={classNames(styles['form__row'])}>
        {currencies.map((currency) => (
          <Controller
            key={currency}
            control={control}
            name='contractCurrency'
            render={({ field: { name, onChange, value } }) => (
              <RadioButton
                name={name}
                value={HC_CURRENCIES[currency]}
                label={HC_CURRENCIES[currency]}
                onChange={onChange}
                checked={value === HC_CURRENCIES[currency]}
                className={styles['radio-group']}
                size='s'
              />
            )}
          />
        ))}
      </div>
    </div>
  );
};
