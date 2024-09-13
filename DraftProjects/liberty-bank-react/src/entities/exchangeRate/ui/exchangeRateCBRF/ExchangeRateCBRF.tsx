import { FC, useEffect, useState } from 'react';
import { CurrencyConverterContainer, CurrencyExchange, DescriptionBank } from '@/widgets';
import {
  IBankBranch,
  IExchangeCurrency,
  TSvgIconNames,
  useLazyExchangeRatesQuery,
  Input,
  Text,
} from '@/shared';
import styles from '../exchangeRateOnline/ExchangeRateOnline.module.scss';
import { getFormattedDate, getFormattedTime } from '../../constants';

type ExchangeCurrencyWithoutBuyAndSale = Omit<IExchangeCurrency, 'buy' | 'sale'>;

export const ExchangeRateCBRF: FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentTimeString = getFormattedTime(currentDate);

  const [loadExchangeRates, { data: exchangeRates, isSuccess }] = useLazyExchangeRatesQuery();
  const setTitle = (date: Date): string => {
    const formattedDate = getFormattedDate(date, 'ru-RU');
    return `Курсы валют ЦБРФ, актуально на ${formattedDate}`;
  };

  const [bankBranch, setBankBranch] = useState<IBankBranch>({
    title: setTitle(currentDate),
    currencyExchangeRates: [],
  });

  useEffect(() => {
    const formattedDate = getFormattedDate(currentDate, 'sv-SE');
    loadExchangeRates({
      date: formattedDate,
      time: currentTimeString,
    });
    if (isSuccess && exchangeRates) {
      setBankBranch({
        currencyExchangeRates: exchangeRates,
        title: setTitle(currentDate),
      });
    }
  }, [isSuccess, exchangeRates, currentDate]);

  const exchangeCurrency: ExchangeCurrencyWithoutBuyAndSale[] = bankBranch.currencyExchangeRates
    .map(({ code, name, id, rateCBRF, compareCurrencyExchange }) => ({
      rateCBRF,
      svg: code.toLowerCase() as TSvgIconNames,
      name,
      country: `(${code})`,
      code,
      id,
      compareCurrencyExchange,
    }))
    .filter((item) => item.svg === 'rub' || item.svg === 'usd' || item.svg === 'eur');

  return (
    <>
      <div className={styles.filtersContainer}>
        <Input.Date
          value={currentDate}
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
        />
      </div>
      <CurrencyConverterContainer isLast={true}>
        <DescriptionBank
          address={
            bankBranch.branchAddress ? `г. ${bankBranch.cityName}, ${bankBranch.branchAddress}` : ''
          }
          time={currentTimeString}
          title={bankBranch.title}
        />

        <div className={styles.currencyExchangeItem_block}>
          {isSuccess && <CurrencyExchange showConverter={false} items={exchangeCurrency} />}
        </div>
        <div className={styles['info-container']}>
          <Text className={styles['info-heading']} tag='h2' weight='medium'>
            Важная информация
          </Text>
          <Text className={styles.info} tag='p'>
            На сайте Liberty Bank вы можете узнать официальный курс российского рубля по отношению к
            доллару США, евро. Мы ежедневно публикуем актуальную информацию по изменению котировок,
            согласно установленному курсу валют Центрального Банка РФ, отображаем динамику изменения
            на бирже по сравнению с предыдущим днем. ЦБРФ не осуществляет обмен валют, однако
            установленный курс является четким ориентиром для всех банков страны при установлении
            стоимости покупки и продажи валюты. А его динамика позволяет сориентироваться в
            экономической ситуации и сохранить ваши денежные средства.
          </Text>
        </div>
      </CurrencyConverterContainer>
    </>
  );
};
