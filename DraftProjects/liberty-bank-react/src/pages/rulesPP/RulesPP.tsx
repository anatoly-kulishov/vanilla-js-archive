import { FC } from 'react';
import styles from './RulesPP.module.scss';
import { BackButton, Text } from '@/shared';
import { RULES_PP_TEXT } from './const';

const RulesPP: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <BackButton text='Назад' />
        <Text tag='h1' className={styles.title} weight='bold'>
          Политика конфиденциальности
        </Text>
        <Text tag='p' size='s' weight='regular' className={styles.text}>
          {RULES_PP_TEXT}
        </Text>
      </div>
    </main>
  );
};

export default RulesPP;
