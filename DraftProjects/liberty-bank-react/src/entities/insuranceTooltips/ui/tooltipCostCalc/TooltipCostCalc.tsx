import React from 'react';
import styles from './TooltipCostCalc.module.scss';
import { Button, Text } from '@/shared';

interface Props {
  text?: [string, string][];
  handleClick?: () => void;
}

export const TooltipCostCalc: React.FC<Props> = ({ text, handleClick }) => {
  return (
    <>
      {text?.length && (
        <Text tag='span' weight='regular' className={styles['text-item']}>
          {text}
        </Text>
      )}
      <Button
        theme='primary'
        type='button'
        width='max'
        onClick={handleClick}
        className={styles['btn']}
      >
        Рассчитать ₽
      </Button>
    </>
  );
};
