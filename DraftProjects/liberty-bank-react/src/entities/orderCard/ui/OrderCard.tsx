import React, { FC } from 'react';
import { Button, IInsuranceOrders, StatusLabel, Text } from '@/shared';
import { ORDER_STATUS, STATUS_TYPE } from '../constants.ts';
import styles from './OrderCard.module.scss';

interface OrderCardProps extends IInsuranceOrders {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const OrderCard: FC<OrderCardProps> = ({ submissionDate, status, productName, onClick }) => {
  const getDate = (str: string) => {
    return str.split(' ')[0].split('-').reverse().join('.');
  };

  return (
    <div className={styles['order-card']}>
      <div className={styles['order-card__content']}>
        <div className={styles['order-card__header']}>
          <div className={styles['order-card__insuranceItem']}>
            <div className={styles['order-card__insuranceSubject']}>
              <Text
                className={styles['order-card__insuranceSubject_type']}
                tag='p'
                size='m'
                weight='medium'
              >
                {`${productName}`}
              </Text>
              <Text
                className={styles['order-card__insuranceSubject_subject']}
                tag='p'
                size='s'
                weight='medium'
              >
                {getDate(submissionDate)}
              </Text>
            </div>
          </div>
          <StatusLabel type={STATUS_TYPE[status]} text={ORDER_STATUS[status]} size='m' />
        </div>
      </div>
      <Button
        theme='secondary'
        width='max'
        className={styles['order-card__button']}
        onClick={onClick}
      >
        {'Показать заявку'}
      </Button>
    </div>
  );
};
