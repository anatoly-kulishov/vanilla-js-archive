import { FC } from 'react';
import styles from './InsuranceCard.module.scss';
import { BTN_TEXT } from '../constants';
import { Button, Text } from '@/shared';

interface InsuranceCardProps {
  name: string;
  imgName: string;
  onButtonClick: () => void;
  style?: React.CSSProperties;
}

export const InsuranceCard: FC<InsuranceCardProps> = ({ name, imgName, onButtonClick, style }) => {
  return (
    <div className={styles['cardContainer']} style={{ background: style?.backgroundColor }}>
      <div className={styles['imgFrame']} style={{ padding: style?.padding }}>
        <img
          src={imgName}
          style={{ transform: style?.transform, transformOrigin: style?.transformOrigin }}
        />
      </div>
      <div className={styles['infoFrame']}>
        <Text className={styles['title']} tag='p' size='xl' weight='bold'>
          {name}
        </Text>
        <Button className={styles['button']} theme='secondary' onClick={onButtonClick}>
          {BTN_TEXT}
        </Button>
      </div>
    </div>
  );
};
