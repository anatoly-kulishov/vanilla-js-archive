import { CardBlock } from '@/entities';
import { ICard, ICreditCard } from '@/shared';
import { memo, useMemo } from 'react';
import styles from './ActiveCards.module.scss';
import { TEXT } from './constants';

interface ICardsOverviewProps {
  cardsData?: (ICard | ICreditCard)[];
  filterCurrency?: string;
}

export const CardsOverview = memo(function CardsOverview({
  cardsData,
  filterCurrency,
}: ICardsOverviewProps) {
  const filteredCards = useMemo(() => {
    if (filterCurrency === TEXT.allCards) {
      return cardsData;
    }

    return cardsData?.filter((card) => card.currency === filterCurrency);
  }, [cardsData, filterCurrency]);

  return (
    <div data-testid={'cards-overview'} className={styles['active-cards']}>
      {filteredCards && (
        <ul data-testid={'cards-list'} className={styles['cards-list']}>
          {filteredCards.map((card) => (
            <CardBlock key={card.id} {...card} />
          ))}
        </ul>
      )}
    </div>
  );
});
