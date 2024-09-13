import { Image, TPngImageNames, Tabs, Text, getCatalogFilter } from '@/shared';
import { Link } from 'react-router-dom';
import { BondsList } from './catalogLists/BondsList';
import { CurrencyList } from './catalogLists/CurrencyList';
import { StocksList } from './catalogLists/StocksList';
import { CATALOG_POPULAR, TICKER_URL } from '../constants';
import styles from './InvestmentLKcatalogMain.module.scss';
import { SelectAssetsFilter } from '@/features';
import { useSelector } from 'react-redux';

const InvestmentLKcatalogMain = () => {
  const catalogFilter = useSelector(getCatalogFilter);

  const tabs = [
    {
      label: 'Акции',
      content: <StocksList catalogFilter={catalogFilter} />,
    },
    {
      label: 'Облигации',
      content: <BondsList catalogFilter={catalogFilter} />,
    },
    {
      label: 'Валюта',
      content: <CurrencyList catalogFilter={catalogFilter} />,
    },
  ];
  const lastTickers: TPngImageNames[] = localStorage.getItem('lastTickers')
    ? JSON.parse(localStorage.getItem('lastTickers') || '')
    : [];

  return (
    <div className={styles['catalog-container-div']}>
      <div className={styles['catalog-widgets-div']}>
        <div className={styles['widget-popular']}>
          <Text tag='h3' weight='bold' size='l'>
            Популярные позиции:{' '}
          </Text>
          <ul className={styles['catalog-list-popular']}>
            {CATALOG_POPULAR.map((el, i) => (
              <li key={i} className={styles['catalog-item-popular']}>
                <Link to={`${TICKER_URL}${el}`}>
                  <Image image={el} height='32' width='32' className={styles['']} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['widget-last']}>
          <Text tag='h3' weight='bold' size='l'>
            Вы недавно смотрели:{' '}
          </Text>
          <ul className={styles['catalog-list-last']}>
            {lastTickers.map((el, i: number) => (
              <li key={i} className={styles['catalog-item-last']}>
                <Link to={`${TICKER_URL}${el}`}>
                  <Image
                    image={el as TPngImageNames}
                    height='40'
                    width='40'
                    className={styles['']}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles['catalog-filters']}>
        <Text tag='h3'>Отображать данные</Text>
        <SelectAssetsFilter catalogFilter={catalogFilter} inline={true} buttonTextWidth='m' />
      </div>

      <Tabs tabs={tabs} marginBottom='m' />
    </div>
  );
};

export default InvestmentLKcatalogMain;
