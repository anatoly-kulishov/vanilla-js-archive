import { FC } from 'react';
import styles from './ActivePolicies.module.scss';
import { Button, Image, PATH_PAGE, Text } from '@/shared';
import { BTN_TEXT, TITLE } from '../constants';
import { useNavigate } from 'react-router-dom';

interface ActivePoliciesProps {
  className?: string;
}

export const ActivePolicies: FC<ActivePoliciesProps> = ({ className }: ActivePoliciesProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH_PAGE.insuranceProducts);
  };

  return (
    <div className={className}>
      <div className={styles['container']}>
        <Image image={'question-lady'} width='139.33' height='176' />
        <div className={styles['no-policies-info']}>
          <Text tag='h3' className={styles['info-text']}>
            {TITLE}
          </Text>
          <Button type='button' className={styles['btn-primary']} width='max' onClick={handleClick}>
            {BTN_TEXT}
          </Button>
        </div>
      </div>
    </div>
  );
};
