import { FC } from 'react';
import { Button, Text } from '@/shared';
import styles from './PersonalAccountLegalInfo.module.scss';

const LEGAL_INFO = [
  { id: 1, name: 'Правила пользования СДБО', to: '/rulesRBS' },
  { id: 2, name: 'Политика конфиденциальности', to: '/rulesGDPR' },
  { id: 3, name: 'Политика обработки персональных данных', to: '/rulesPP' },
];

const PersonalAccountLegalInfo: FC = () => {
  return (
    <div className={styles.info__block}>
      <Text tag='h3' weight='medium'>
        Правовая информация
      </Text>
      {LEGAL_INFO.map((item) => (
        <Button key={item.id} href={item.to} size='s' theme='tertiary'>
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default PersonalAccountLegalInfo;
