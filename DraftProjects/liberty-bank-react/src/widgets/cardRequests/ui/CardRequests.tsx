import { FC } from 'react';
import { BankProductRequest } from '@/entities';
import { CardType, ICreditCardRequest, InfoFrame } from '@/shared';
import { INFO_FRAME_TEXT, MESSAGE_ICON } from '../constants';
import styles from './CardRequests.module.scss';

interface ICardRequests {
  cardRequests: ICreditCardRequest[];
}

export const CardRequests: FC<ICardRequests> = ({ cardRequests }) => {
  return (
    <div className={styles.container}>
      {cardRequests.length ? (
        <ul className={styles.list}>
          {cardRequests.map((card: ICreditCardRequest) => (
            <BankProductRequest key={card.id} request={card} />
          ))}
        </ul>
      ) : (
        <div className={styles.frame_wrapper}>
          <InfoFrame icon={MESSAGE_ICON} title={INFO_FRAME_TEXT} cardType={CardType.dontOpen} />
        </div>
      )}
    </div>
  );
};
