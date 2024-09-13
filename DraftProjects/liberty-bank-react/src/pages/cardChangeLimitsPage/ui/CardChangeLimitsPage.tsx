import { BackButton } from '@/shared';
import { ChangeCardLimitForm } from '@/widgets';
import classNames from 'classnames';
import styles from './CardChangeLimitsPage.module.scss';

export const CardChangeLimitsPage = () => {
  return (
    <div className={classNames(styles.cardChangeLimitsPage)}>
      <BackButton
        className={styles.backButton}
        text={'Назад'}
        theme='blue'
        height='24'
        width='24'
      />
      <ChangeCardLimitForm />
    </div>
  );
};
