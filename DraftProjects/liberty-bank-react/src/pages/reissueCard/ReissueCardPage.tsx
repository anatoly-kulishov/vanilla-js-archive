import { ReissueCardFormLSKeys, reissueCardFormLSApi } from '@/entities/cardForm';
import { ReissueCard } from '@/features/reissueCard';
import { BackButton } from '@/shared';
import { Text } from '@/shared/ui/text/Text';
import { useState } from 'react';
import styles from './ReissueCardPage.module.scss';
import { PAGE_TITLES, TEXT } from './constants';

const ReissueCardPage = () => {
  const [currentIndex, setCurrentIndex] = useState(
    reissueCardFormLSApi.getValue(ReissueCardFormLSKeys.PAGE_INDEX) ?? 0,
  );

  let title: string = TEXT.defaultPageTitle;

  if (currentIndex in PAGE_TITLES) {
    title = PAGE_TITLES[currentIndex as keyof typeof PAGE_TITLES];
  }

  return (
    <div className={styles['reissue-card-page']}>
      <BackButton
        className={styles['reissue-card-page__back-button']}
        text={TEXT.back}
        theme='blue'
        height='24'
        width='24'
      />
      <Text tag='h2' size='m' weight='medium' className={styles['reissue-card-page__title']}>
        {title}
      </Text>
      <div className={styles['reissue-card-page__form-wrapper']}>
        <ReissueCard currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
};

export default ReissueCardPage;
