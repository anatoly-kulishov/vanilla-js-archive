import {
  Icon,
  IExchangeCurrency,
  Input,
  Text,
  TSvgIconNames,
  useSetCurrencyAmountMutation,
} from '@/shared';
import { useDebounce } from '@/shared/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import styles from './Converter.module.scss';
import { RUBLE } from '../constans';

interface IConverterProps {
  currency: IExchangeCurrency[];
}

type TCurrencyType = 'BYN' | 'RUB' | 'USD' | 'CNY' | 'EUR';
type TInput = 'sell' | 'buy';
type TInputCurrency = Record<TInput, ICurrencyData>;

interface ICurrencyData {
  amount: number;
  currencyType: TCurrencyType;
  readonly inputType: TInput;
}

function toNormalNumber(formattedNumber: string) {
  return formattedNumber
    ? parseFloat(formattedNumber.split(String.fromCharCode(160)).join('').replace(',', '.'))
    : 0;
}

function convertNumber(num: number) {
  return num ? Intl.NumberFormat('ru-RU').format(num) : '';
}

export const Converter = ({ currency: propCurrency }: IConverterProps) => {
  const currency = [...propCurrency, RUBLE];
  const [inputCurrency, setInputCurrency] = useState<TInputCurrency>({
    sell: {
      amount: 0,
      currencyType: currency[0].code as TCurrencyType,
      inputType: 'sell',
    },
    buy: {
      amount: 0,
      currencyType: currency[1].code as TCurrencyType,
      inputType: 'buy',
    },
  });
  const [countCurrentAmount, { data: amount, isError }] = useSetCurrencyAmountMutation();
  const iconSell = inputCurrency.sell.currencyType.toLocaleLowerCase();
  const iconBuy = inputCurrency.buy.currencyType.toLocaleLowerCase();

  const currencyCode = currency.map((item) => ({
    value: item.code,
    contentLeft: (
      <Icon icon={item.code.toLocaleLowerCase() as TSvgIconNames} widthAndHeight={'32px'} />
    ),
  }));
  const currencyIds = currency.reduce<Record<string, number>>(
    (acc, item) => ({ ...acc, [item.code]: item.id }),
    {},
  );
  const debouncedCurrencyAmount = useDebounce<number>(inputCurrency.sell.amount);

  const handleSelectCurrency = (value: TCurrencyType, name: 'sell' | 'buy') => {
    setInputCurrency((prevState) => {
      const newState: TInputCurrency = {
        ...prevState,
        [name]: {
          ...prevState[name],
          currencyId: currencyIds[value],
          currencyType: value,
        },
      };
      if (newState.sell.currencyType === newState.buy.currencyType) {
        if (name === 'sell') {
          newState.buy = {
            ...newState.buy,
            currencyType: prevState.sell.currencyType,
          };
        } else {
          newState.sell = {
            ...newState.sell,
            currencyType: prevState.buy.currencyType,
          };
        }
      }
      return newState;
    });
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const resultAmount = toNormalNumber(target.value);
    setInputCurrency((prevState) => ({
      ...prevState,
      [target.name]: {
        ...prevState[target.name as TInput],
        amount: resultAmount,
      },
    }));
  };

  const handelClickReversButton = () => {
    setInputCurrency((prevState) => ({
      sell: {
        ...prevState.sell,
        currencyType: prevState.buy.currencyType,
      },
      buy: {
        ...prevState.buy,
        currencyType: prevState.sell.currencyType,
      },
    }));
  };

  useEffect(() => {
    const sellAmount = debouncedCurrencyAmount;
    if (!sellAmount) {
      if (inputCurrency.buy.amount) {
        setInputCurrency((prevState) => {
          return { ...prevState, buy: { ...prevState.buy, amount: 0 } };
        });
      }
    } else if (debouncedCurrencyAmount)
      countCurrentAmount({
        baseAmount: sellAmount,
        targetCurrencyId: currencyIds[inputCurrency.buy.currencyType],
        baseCurrencyId: currencyIds[inputCurrency.sell.currencyType],
      });
  }, [debouncedCurrencyAmount, inputCurrency.sell.currencyType, inputCurrency.buy.currencyType]);

  useEffect(() => {
    if (amount?.targetAmount && !isError)
      setInputCurrency((prevState) => ({
        ...prevState,
        buy: {
          ...prevState.buy,
          amount: amount.targetAmount,
        },
      }));
    if (isError) {
      setInputCurrency((prevState) => ({
        sell: {
          ...prevState.sell,
          amount: 0,
        },
        buy: {
          ...prevState.buy,
          amount: 0,
        },
      }));
    }
  }, [amount, isError]);

  return (
    <div className={styles.container}>
      <div className={styles.currency_block}>
        <Text tag={'h4'} className={styles.currency_block__title}>
          Продать
        </Text>
        <div className={styles.currency_block__inputs}>
          <Icon icon={iconSell as TSvgIconNames} widthAndHeight={'32px'} />
          <Input.Select
            key={inputCurrency.sell.currencyType + 'sell'}
            options={currencyCode}
            value={inputCurrency.sell.currencyType}
            defaultValue={inputCurrency.sell.currencyType}
            className={styles.selector}
            style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            onMySelect={(value) =>
              handleSelectCurrency(
                (typeof value !== 'string' ? value.value : value) as TCurrencyType,
                inputCurrency.sell.inputType,
              )
            }
          />
          <Input.Text
            placeholder={'0'}
            inputMode={'decimal'}
            value={convertNumber(inputCurrency.sell.amount)}
            onInput={handleInput}
            className={styles.input}
            name={'sell'}
            autoComplete='off'
          />
        </div>
      </div>
      <div className={styles.icon} onClick={handelClickReversButton}>
        <Icon icon={'arrows-reversed'} widthAndHeight={'26px'} />
      </div>
      <div className={styles.currency_block}>
        <Text tag={'h4'} className={styles.currency_block__title}>
          Купить
        </Text>
        <div className={styles.currency_block__inputs}>
          <Icon icon={iconBuy as TSvgIconNames} widthAndHeight={'32px'} />
          <Input.Select
            key={inputCurrency.buy.currencyType + 'buy'}
            options={currencyCode}
            defaultValue={inputCurrency.buy.currencyType}
            value={inputCurrency.buy.currencyType}
            className={styles.selector}
            style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            onMySelect={(value) =>
              handleSelectCurrency(
                (typeof value !== 'string' ? value.value : value) as TCurrencyType,
                inputCurrency.buy.inputType,
              )
            }
          />
          <Input.Text
            placeholder={'0'}
            inputMode={'numeric'}
            value={convertNumber(inputCurrency.buy.amount)}
            onInput={handleInput}
            className={styles.input}
            name={'buy'}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
