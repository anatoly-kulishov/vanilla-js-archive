import { SelectedPaymentCard } from '@/entities/selectedPaymentCard';
import { BackButton, Text } from '../../shared';
import styles from './SelectedPayments.module.scss';
import { PAYMENTS_CARDS, PAYMENT_HEADER, PAYMENT_PLUS } from './constants';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentsCreateFavoriteModal } from '../paymentsCreateFavoriteModal/ui/PaymentsCreateFavoriteModal';
import { PaymentsFavoriteModal } from '../paymentsFavoriteModal/ui/PaymentsFavoriteModal';
import classNames from 'classnames';

interface SelectedPaymentsProps {
  type: 'all' | 'limit';
  limit?: number;
}

export const SelectedPayments: FC<SelectedPaymentsProps> = ({ type = 'all', limit = 2 }) => {
  const navigate = useNavigate();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCreatePaymentModalOpen, setIsCreatePaymentModalOpen] = useState(false);
  const [paymentFavoriteInfo, setPaymentFavoriteInfo] = useState({
    number: '',
    cardType: '',
    title: '',
  });

  const titleHandle = () => {
    navigate('/payments/selected');
  };

  const actionPaymentHandler = (card: (typeof PAYMENTS_CARDS)[0]) => {
    setIsPaymentModalOpen((prev) => !prev);
    setPaymentFavoriteInfo({
      cardType: card.cardType,
      number: card.describtion,
      title: card.cardName,
    });
  };

  const createPaymentHandler = () => {
    setIsCreatePaymentModalOpen((prev) => !prev);
  };

  return (
    <div>
      <div className={styles['container']}>
        {type === 'limit' ? (
          <div className={styles['container__header']} onClick={titleHandle}>
            <Text className={styles['container__text']} tag='h4' weight='medium'>
              {PAYMENT_HEADER}
            </Text>
            {PAYMENTS_CARDS.length > 0 && (
              <span className={styles['container__count']}>{PAYMENTS_CARDS.length}</span>
            )}
          </div>
        ) : (
          <BackButton
            text={PAYMENT_HEADER}
            theme={'blue'}
            className={styles['backBtn']}
            width='24'
            height='24'
            name='arrow-left-blue'
          />
        )}

        <div
          className={classNames(styles['container__cards'], {
            [styles['container__all']]: type === 'all',
          })}
        >
          {type === 'limit'
            ? PAYMENTS_CARDS.slice(0, limit).map((card) => (
                <SelectedPaymentCard
                  key={card.cardName}
                  paymentName={card.cardName}
                  description={card.describtion}
                  width='selected'
                  onClick={() => actionPaymentHandler(card)}
                />
              ))
            : PAYMENTS_CARDS.map((card) => (
                <SelectedPaymentCard
                  key={card.cardName}
                  paymentName={card.cardName}
                  description={card.describtion}
                  width='selected'
                  onClick={() => actionPaymentHandler(card)}
                />
              ))}
          {type === 'all' && (
            <SelectedPaymentCard
              key={PAYMENT_PLUS}
              icon='plus'
              paymentName={PAYMENT_PLUS}
              width='selected'
              onClick={createPaymentHandler}
            />
          )}
        </div>
      </div>
      {isCreatePaymentModalOpen && (
        <PaymentsCreateFavoriteModal
          isModalOpen={isCreatePaymentModalOpen}
          setIsModalOpen={setIsCreatePaymentModalOpen}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentsFavoriteModal
          isModalOpen={isPaymentModalOpen}
          setIsModalOpen={setIsPaymentModalOpen}
          paymentFavoriteInfo={paymentFavoriteInfo}
        />
      )}
    </div>
  );
};
