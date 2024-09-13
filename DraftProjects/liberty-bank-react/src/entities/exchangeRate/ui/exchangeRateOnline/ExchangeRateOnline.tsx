import { FC, useEffect, useState } from 'react';
import { CurrencyExchangeItem } from '@/widgets';
import { IBankBranch, Input, useLazyExchangeRatesQuery } from '@/shared';
import styles from './ExchangeRateOnline.module.scss';

export const ExchangeRateOnline: FC = () => {
  const [date, onChangeDate] = useState<Date>(new Date());
  const [loadExchangeRates, { data: exchangeRates, isSuccess }] = useLazyExchangeRatesQuery();
  const setTitle = (date: Date): string => {
    if (!date) return 'Курсы валют в Liberty Bank, услуга Автообмен на сегодня';

    const formattedDate = date.toLocaleString('ru-RU', {
      day: 'numeric',
      year: 'numeric',
      month: 'numeric',
    });
    return `Курсы валют в Liberty Bank, услуга Автообмен на ${formattedDate}`;
  };

  const [bankBranch, setBankBranch] = useState<IBankBranch>({
    title: setTitle(date),
    currencyExchangeRates: [],
  });

  useEffect(() => {
    const formattedDate =
      date?.toLocaleString('sv-SE', {
        day: 'numeric',
        year: 'numeric',
        month: 'numeric',
      }) ?? '2023-12-06';
    loadExchangeRates({ date: formattedDate, time: '17:00' });
    if (isSuccess && exchangeRates) {
      setBankBranch({
        currencyExchangeRates: exchangeRates,
        title: setTitle(date),
      });
    }
  }, [exchangeRates, isSuccess, date]);

  return (
    <>
      <div className={styles.filtersContainer}>
        <Input.Date value={date} onChange={(e) => onChangeDate(new Date(e.target.value))} />
      </div>
      {isSuccess && <CurrencyExchangeItem bankBranch={bankBranch} isLast={true} />}
    </>
  );
};
