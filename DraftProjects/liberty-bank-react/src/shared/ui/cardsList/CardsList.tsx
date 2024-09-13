import { FC } from 'react';
import { ServiceCard, TSvgIconNames } from '..';
import styles from './CardsList.module.scss';

interface ICard {
  id: TSvgIconNames;
  title: string;
  description: string;
  icon: TSvgIconNames;
}

export interface ICardsList {
  cards: ICard[];
}

export const CardsList: FC<ICardsList> = ({ cards }) => {
  return (
    <div className={styles.wrapper}>
      {cards.map((item) => (
        <ServiceCard
          key={item.id}
          title={item.title}
          description={item.description}
          iconName={item.icon}
        />
      ))}
    </div>
  );
};
