import { FC } from 'react';
import { Button, CURRENCY, CurrencyCode, Text } from '@/shared';
import { CLOSE_DEPOSIT_SUM_TEXT } from './constants';
import style from './ClosingDepositSumWindow.module.scss';

interface IClosingDepositSumWindow {
  sum: number;
  currencyCode: CurrencyCode;
}

export const ClosingDepositSumWindow: FC<IClosingDepositSumWindow> = ({ sum, currencyCode }) => {
  return (
    <div className={style.container}>
      <Text tag='span' size='ml' weight='medium' className={style.title}>
        {CLOSE_DEPOSIT_SUM_TEXT.title}
      </Text>
      <div className={style.details}>
        <Text tag='h1' weight='bold'>
          {sum.toLocaleString('ru-RU')}
          {CURRENCY[currencyCode].text}
        </Text>
      </div>
      <div className={style.doubleBtn}>
        <Button
          onClick={() => {}}
          type='button'
          theme='secondary'
          size='m'
          width='max'
          className={style.btn}
        >
          {CLOSE_DEPOSIT_SUM_TEXT.btnCancel}
        </Button>
        <Button
          onClick={() => {}}
          type='button'
          theme='primary'
          size='m'
          width='max'
          className={style.btn}
        >
          {CLOSE_DEPOSIT_SUM_TEXT.btnView}
        </Button>
      </div>
    </div>
  );
};
