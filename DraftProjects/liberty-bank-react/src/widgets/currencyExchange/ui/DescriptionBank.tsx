import { FC } from 'react';
import { Icon, Text } from '@/shared';
import styles from './DescriptionBank.module.scss';

interface IDescriptionBankProps {
  title: string;
  address: string;
  time?: string;
}

export const DescriptionBank: FC<IDescriptionBankProps> = (props) => {
  const { address, time, title } = props;
  return (
    <div className={styles.descriptionBank__container}>
      <Text tag='h2' weight='medium'>
        {title}
      </Text>
      {address && <Text tag='span'>{address}</Text>}
      {time && (
        <div className={styles.descriptionBank_clock}>
          <Icon icon={'clock'} color={'#005afe'} />
          <Text className={styles.clock_text} tag='span' weight='bold'>
            {time}
          </Text>
        </div>
      )}
    </div>
  );
};
