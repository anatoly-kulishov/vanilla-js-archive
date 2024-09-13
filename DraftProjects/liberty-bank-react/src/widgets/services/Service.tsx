import { Button, Icon, Text, TSvgIconNames } from '@/shared';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Service.module.scss';

interface IServicesProps {
  services: readonly IService[];
}

interface IService {
  svg: string;
  label: string;
  id: number;
  to: string;
}

export const Service: FC<IServicesProps> = ({ services }) => {
  return (
    <div className={styles.serviceBlock}>
      <Text className={styles.text} tag='h3' weight='medium'>
        Услуги
      </Text>
      <div className={styles.serviceBlock__items}>
        {services.map((service) => (
          <Link to={service.to} className={styles.serviceBlock__item} key={service.id}>
            <Text tag='h3' weight='bold'>
              {service.label}
            </Text>
            <Icon icon={service.svg as TSvgIconNames} width='60' height='44' />
          </Link>
        ))}
      </div>
      <Button className={styles.serviceBlock_btn} size='m' width='max' theme='primary'>
        Добавить услугу
      </Button>
    </div>
  );
};
