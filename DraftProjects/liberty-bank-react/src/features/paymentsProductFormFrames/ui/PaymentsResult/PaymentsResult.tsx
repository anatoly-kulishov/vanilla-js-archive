import styles from './PaymentsResult.module.scss';
import { Icon, TSvgIconNames, Text } from '@/shared';
import { Icons, TITLES } from './const';

export const PaymentsResult = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['wrapper__block']}>
        <Text tag='h1' size='xl' weight='medium' className={styles['wrapper__title']}>
          {TITLES.result}
        </Text>
        <Text tag='h5' size='s' weight='regular' className={styles['wrapper__titles']}>
          {TITLES.date}
        </Text>
        <Text tag='h1' size='xl' weight='semibold'>
          {TITLES.sum}
        </Text>
      </div>
      <div className={styles['wrapper__block']}>
        <Text tag='h5' size='s' weight='regular' className={styles['wrapper__titles']}>
          {TITLES.card}
        </Text>
        <Text tag='h1' size='m' weight='semibold'>
          {TITLES.cardNumber}
        </Text>
      </div>
      <div className={styles['wrapper__icons']}>
        {Icons.map((item) => {
          return (
            <div className={styles['wrapper__icon']} key={item.text}>
              <Icon icon={item.icon as TSvgIconNames} />
              <Text tag='h5' size='s' weight='regular' className={styles['wrapper__titles']}>
                {item.text}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
