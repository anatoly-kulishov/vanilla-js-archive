import { BackButton, PATH_PAGE, Text, Wrapper } from '@/shared';
import { SellAssets } from '@/widgets/sellAssets';
import { useNavigate } from 'react-router-dom';
import { BACK, BUTTON_TEXT, TABLE_TITLE, TITLE } from '../constants.ts';
import styles from './InvestmentAccClosureCurrency.module.scss';

export const MOCK_RAW_TABLE_DATA = {
  head: {
    columns: [
      {
        value: 'type',
        name: 'Тип операции',
        tcStyle: styles.first_column,
      },
      {
        value: 'currency',
        name: 'Валюта',
        tcStyle: styles.second_column,
      },
      {
        value: 'sum',
        name: 'Сумма',
        tcStyle: styles.third_column,
      },
    ],
  },
  content: [
    {
      type: 'Остаток на текущем счёте',
      currency: 'RUB',
      sum: '123.00',
    },
    {
      type: 'Продажа активов',
      currency: 'RUB',
      sum: '8 873.00',
    },
    {
      type: 'Комиссия',
      currency: 'RUB',
      sum: '0.00',
    },
    {
      type: 'Итого:',
      currency: 'RUB',
      sum: '8 996.00',
    },
  ],
  tBodyStyle: styles['currency-table'],
};

const InvestmentAccClosureCurrency = () => {
  const navigate = useNavigate();

  const navigatePage = () => navigate(PATH_PAGE.investmentAccClosureDeclaration);

  return (
    <Wrapper size='l'>
      <BackButton
        text={BACK}
        theme='blue'
        name='arrow-left-blue'
        height='24'
        width='24'
        className={styles['back-button']}
      />
      <div className={styles.body}>
        <Text tag='p' size='m' weight='medium'>
          {TITLE}
        </Text>
        <SellAssets
          title={TABLE_TITLE}
          tableData={MOCK_RAW_TABLE_DATA}
          useCalcWidth={false}
          button={{
            onClick: navigatePage,
            text: BUTTON_TEXT,
          }}
        />
      </div>
    </Wrapper>
  );
};

export default InvestmentAccClosureCurrency;
