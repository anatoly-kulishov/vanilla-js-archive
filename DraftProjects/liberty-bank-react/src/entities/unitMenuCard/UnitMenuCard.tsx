import { FC } from 'react';
import { Text } from '@/shared';
import styles from './UnitMenuCard.module.scss';

interface ICard {
  svg: JSX.Element;
  text: string;
}

interface IProps {
  card: ICard;
  key: number;
}

const UnitMenuCard: FC<IProps> = ({ card, key }) => {
  return (
    <li key={key} className={styles['card']}>
      {card.svg}
      <Text tag='p' weight='medium'>
        {card.text}
      </Text>
    </li>
  );
};

export default UnitMenuCard;
