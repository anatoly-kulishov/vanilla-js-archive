import { Button, IBankBranch, IExchangeCurrency, TSvgIconNames } from '@/shared';
import { FC, useState } from 'react';
import { CurrencyConverterContainer } from '.';
import { Converter } from './Converter.tsx';
import { CurrencyExchange } from './CurrencyExchange';
import styles from './CurrencyExchangeItem.module.scss';
import { DescriptionBank } from './DescriptionBank';

interface ICurrencyExchangeItemProps {
  bankBranch: IBankBranch;
  isLast?: boolean;
}

export const CurrencyExchangeItem: FC<ICurrencyExchangeItemProps> = (props) => {
  const { bankBranch, isLast = false } = props;
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [visibleConverter, setVisibleConverter] = useState<boolean>(false);
  const exchangeCurrency: IExchangeCurrency[] = bankBranch.currencyExchangeRates
    .map(({ buyingRate, sellingRate, code, name, id, compareCurrencyExchange }) => ({
      buy: Number(buyingRate.toFixed(1)),
      sale: Number(sellingRate.toFixed(1)),
      svg: code.toLowerCase() as TSvgIconNames,
      name,
      country: `(${code})`,
      code,
      id,
      compareCurrencyExchange,
    }))
    .filter((item) => item.svg === 'rub' || item.svg === 'usd' || item.svg === 'eur');

  const handleClick = () => {
    setVisibleConverter(!visibleConverter);
    setIsButtonPressed(!isButtonPressed);
  };
  return (
    <CurrencyConverterContainer isLast={isLast}>
      <DescriptionBank
        address={
          bankBranch.branchAddress ? `г. ${bankBranch.cityName}, ${bankBranch.branchAddress}` : ''
        }
        title={bankBranch.title}
      />
      <div className={styles.currencyExchangeItem_block}>
        <CurrencyExchange items={exchangeCurrency} />
        <Button
          className={isButtonPressed ? styles.button_pressed : styles.button}
          onClick={handleClick}
          theme='tertiary'
        >
          Конвертер валют
        </Button>
        {visibleConverter && <Converter currency={exchangeCurrency} />}
      </div>
    </CurrencyConverterContainer>
  );
};
