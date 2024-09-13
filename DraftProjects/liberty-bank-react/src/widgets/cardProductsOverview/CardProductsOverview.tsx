import { FC, useMemo } from 'react';
import { CardProduct } from '@/entities';
import { CardType, CurrencyCode, ICreditCardProduct, IDebitCardProduct, InfoFrame } from '@/shared';
import { CardsType, TEXT, noDataIcon } from './constants';
import styles from './CardProductsOverview.module.scss';

const isCreditCardProduct = (
  card: IDebitCardProduct | ICreditCardProduct,
): card is ICreditCardProduct => (card as ICreditCardProduct).maxSum !== undefined;

interface ICardProductsOverview {
  cardsData: (IDebitCardProduct | ICreditCardProduct)[];
  filterCurrency: CurrencyCode | 'Все';
  type: CardsType;
}

export const CardProductsOverview: FC<ICardProductsOverview> = ({
  cardsData,
  filterCurrency,
  type,
}) => {
  const filteredCards = useMemo(() => {
    if (filterCurrency === TEXT['allCards']) {
      return cardsData;
    }

    return cardsData?.filter((card) => card.currency.includes(filterCurrency as CurrencyCode));
  }, [cardsData, filterCurrency]);

  return (
    <div className={styles['active-cards']}>
      {filteredCards?.length > 0 ? (
        <ul className={styles['cards-list']}>
          {filteredCards.map((card) => (
            <li key={isCreditCardProduct(card) ? card.id : card.typeName}>
              <CardProduct inList {...card} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.wrapper}>
          <InfoFrame title={TEXT[type]} icon={noDataIcon} cardType={CardType.dontOpen} />
        </div>
      )}
    </div>
  );
};
