import { useEffect, useState } from 'react';
import { CurrencyValues, useGetCurrencyQuery } from '@/shared';

interface Odds {
  rubleInDollar: number;
  rubleInYuan: number;
  rubleInEuro: number;
}

export const useConversionCurrency = (selectedCurrency: CurrencyValues, funds: number) => {
  const [resultCurrency, setResultCurrency] = useState({ label: CurrencyValues.ruble, funds });
  const { data: currency, isLoading, isError } = useGetCurrencyQuery();

  function transformCurrency(odds: Odds) {
    switch (selectedCurrency) {
      case CurrencyValues.dollar: {
        setResultCurrency({
          label: CurrencyValues.dollar,
          funds: funds * odds.rubleInDollar,
        });
        break;
      }
      case CurrencyValues.euro: {
        setResultCurrency({
          label: CurrencyValues.euro,
          funds: funds * odds.rubleInEuro,
        });
        break;
      }
      case CurrencyValues.yuan: {
        setResultCurrency({
          label: CurrencyValues.yuan,
          funds: funds * odds.rubleInYuan,
        });
        break;
      }
    }
  }

  useEffect(() => {
    if (currency) {
      const odds = {
        rubleInDollar: 1 / +currency[2][1],
        rubleInYuan: 1 / +currency[0][1],
        rubleInEuro: 1 / +currency[1][1],
      };
      transformCurrency(odds);
    }
  }, [currency, selectedCurrency]);

  return { resultCurrency, isLoading, isError };
};
