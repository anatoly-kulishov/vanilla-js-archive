import React, { FC } from 'react';
import { Button, formatDate, Icon, StatusLabel, Text, TSvgIconNames } from '@/shared';
import { calculateDuration, POLICY, STATUS, STATUS_TEXT } from '../constants.ts';
import styles from './PolicyCard.module.scss';

interface IProps {
  name: string;
  startDate: string;
  endDate: string;
  icon: string;
  insuranceItem: string;
  amount: number;
  status: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onTouch: (e: React.MouseEvent<HTMLElement>) => void;
}

export const PolicyCard: FC<IProps> = ({
  name,
  status,
  startDate,
  endDate,
  icon,
  insuranceItem,
  amount,
  onClick,
  onTouch,
}) => {
  return (
    <div className={styles['policy-card']}>
      <div className={styles['policy-card__content']}>
        <div className={styles['policy-card__header']}>
          <div className={styles['policy-card__insuranceItem']}>
            <Icon icon={icon as TSvgIconNames} widthAndHeight={'64px'} />
            <div className={styles['policy-card__insuranceSubject']}>
              <Text
                className={styles['policy-card__insuranceSubject_type']}
                tag='p'
                size='m'
                weight='medium'
              >
                {`${name}`}
              </Text>
              <Text
                className={styles['policy-card__insuranceSubject_subject']}
                tag='p'
                size='s'
                weight='medium'
              >
                {insuranceItem}
              </Text>
            </div>
          </div>
          <StatusLabel
            type={status ? STATUS[status] : 'error'}
            text={status ? STATUS_TEXT[status] : 'Неактивный'}
            size='m'
          />
        </div>
        <div className={styles['policy-card__header']}>
          <div>
            <Text className={styles['policy-card__header_data']} tag='p' size='m' weight='medium'>
              {calculateDuration(startDate, endDate)}
            </Text>
            <Text className={styles['policy-card__header_const']} tag='p' weight='regular'>
              {POLICY.duration}
            </Text>
          </div>
          <div>
            <Text className={styles['policy-card__header_data']} tag='p' size='m' weight='medium'>
              {amount}
            </Text>
            <Text className={styles['policy-card__header_const']} tag='p' weight='regular'>
              {POLICY.amount}
            </Text>
          </div>
          <div>
            <Text className={styles['policy-card__header_data']} tag='p' size='m' weight='medium'>
              {formatDate(endDate)}
            </Text>
            <Text className={styles['policy-card__header_const']} tag='p' weight='regular'>
              {POLICY.completion}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles['policy-card__buttons']}>
        <Button
          theme='secondary'
          width='max'
          className={styles['policy-card__button']}
          onClick={onClick}
        >
          {POLICY.showPolicy}
        </Button>
        {status === 'ACTIVE' && (
          <Button
            theme='primary'
            width='max'
            className={styles['policy-card__button']}
            onClick={onTouch}
          >
            {POLICY.reportEvent}
          </Button>
        )}
      </div>
    </div>
  );
};
