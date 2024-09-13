import { FC } from 'react';
import styles from './Rules.RBS.module.scss';
import { BackButton, Text } from '@/shared';
import { RULES_RBS_TEXT } from './const';

const RulesRBS: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <BackButton text='Назад' />
        <Text tag='h1' className={styles.title} weight='bold'>
          Правила пользования СДБО
        </Text>
        <Text tag='p' size='s' weight='regular' className={styles.text}>
          {RULES_RBS_TEXT}
        </Text>
      </div>
    </main>
  );
};

export default RulesRBS;
