import { FC } from 'react';
import { Button, Text } from '@/shared';
import { SHORT_INFORMATION_ABOUT_DEPOSIT_TEXT } from './constants';
import styles from './ShortInformationAboutDeposit.module.scss';

interface IShortInformationAboutDeposit {
  name: string;
  productDetails: string;
  maxInterestRate: number;
}

export const ShortInformationAboutDeposit: FC<IShortInformationAboutDeposit> = ({
  name,
  productDetails,
  maxInterestRate,
}) => {
  return (
    <div className={styles.container}>
      <Text tag='h2' size='m' weight='medium' className={styles.title}>
        {name}
      </Text>
      <Text tag='p' size='xs' className={styles.detailInfo}>
        {productDetails}
        <Text tag='span' weight='medium' className={styles.detailInfo__name}>
          {name}
        </Text>
      </Text>

      <Text tag='h3' size='s' className={styles.condition}>
        {SHORT_INFORMATION_ABOUT_DEPOSIT_TEXT.before}
        <Text tag='span' size='m' weight='medium' className={styles.condition__description}>
          {maxInterestRate}%
        </Text>
      </Text>
      <Text tag='p' className={styles.interestRate}>
        {SHORT_INFORMATION_ABOUT_DEPOSIT_TEXT.interestRate}
      </Text>

      <Button theme='secondary' className={styles.btn}>
        {SHORT_INFORMATION_ABOUT_DEPOSIT_TEXT.showMore}
      </Button>
    </div>
  );
};
