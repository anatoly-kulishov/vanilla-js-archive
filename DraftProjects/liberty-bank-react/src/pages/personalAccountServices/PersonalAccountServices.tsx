import { Service } from '@/widgets';
import { FC } from 'react';
import styles from './PersonalAccountServices.module.scss';
import { SERVICES } from './constans';

const PersonalAccountServices: FC = () => {
  return (
    <div className={styles.services__container}>
      <Service services={SERVICES} />
    </div>
  );
};

export default PersonalAccountServices;
