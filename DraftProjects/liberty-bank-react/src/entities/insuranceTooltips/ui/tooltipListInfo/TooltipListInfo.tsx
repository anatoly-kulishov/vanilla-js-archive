import React from 'react';
import styles from './TooltipListInfo.module.scss';
import { Text } from '@/shared';

interface Props {
  text: [string, string][];
}

export const TooltipListInfo: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles['container']}>
      {text.map((item, index) => (
        <div key={index} className={styles['text-item']}>
          <Text tag='h4' weight='medium' className={styles['text-header']}>
            {item[0]}
          </Text>
          <Text tag='span' weight='regular' className={styles['text']}>
            {item[1]}
          </Text>
        </div>
      ))}
    </div>
  );
};
