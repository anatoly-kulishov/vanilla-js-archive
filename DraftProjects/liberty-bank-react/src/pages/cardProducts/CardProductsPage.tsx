import { useEffect, useState } from 'react';
import { CardProductsOverview } from '@/widgets';
import {
  FilterButtons,
  ICreditCardProduct,
  IDebitCardProduct,
  IDebitCardProductsResponse,
  Spinner,
  Tabs,
  useGetCardProductsQuery,
  useGetCreditCardProductsQuery,
} from '@/shared';
import { FILTER_TEXT, TEXT } from './constants';
import styles from './CardProductsPage.module.scss';

const isDebitCardProducts = (
  cards: IDebitCardProductsResponse | IDebitCardProduct[],
): cards is IDebitCardProduct[] => !!(cards as IDebitCardProduct[]).length;

function CardProductsPage() {
  const { data: debitCards, isLoading: isDebitCardsLoading } = useGetCardProductsQuery();
  const { data: creditCards, isLoading: isCreditCardsLoading } = useGetCreditCardProductsQuery();

  const [filterCurrency, setFilterCurrency] = useState(FILTER_TEXT[0]);
  const [allCards, setAllCards] = useState<(IDebitCardProduct | ICreditCardProduct)[]>([]);

  useEffect(() => {
    if (debitCards && isDebitCardProducts(debitCards)) {
      if (creditCards) {
        setAllCards([...debitCards, ...creditCards]);
      } else {
        setAllCards([...debitCards]);
      }
    } else {
      creditCards && setAllCards([...creditCards]);
    }
  }, [debitCards, creditCards]);

  const tabs = [
    {
      label: TEXT.allCardsLabel,
      content: (
        <CardProductsOverview
          cardsData={allCards}
          filterCurrency={filterCurrency}
          type={TEXT.allCardsLabel}
        />
      ),
    },
    {
      label: TEXT.debitCardsLabel,
      content: (
        <CardProductsOverview
          cardsData={debitCards && isDebitCardProducts(debitCards) ? debitCards : []}
          filterCurrency={filterCurrency}
          type={TEXT.debitCardsLabel}
        />
      ),
    },
    {
      label: TEXT.creditCardsLabel,
      content: (
        <CardProductsOverview
          cardsData={creditCards || []}
          filterCurrency={filterCurrency}
          type={TEXT.creditCardsLabel}
        />
      ),
    },
  ];

  return (
    <div className={styles.products}>
      {isDebitCardsLoading && isCreditCardsLoading && <Spinner />}
      <Tabs
        tabs={tabs}
        theme='minimalistic'
        filter={<FilterButtons filter={FILTER_TEXT} filterChange={setFilterCurrency} />}
      />
    </div>
  );
}

export default CardProductsPage;
