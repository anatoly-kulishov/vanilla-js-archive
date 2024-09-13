import { FC } from 'react';
import styles from './InsuranceCategory.module.scss';
import { Icon, Text, TSvgIconNames } from '../..';
import { Link } from 'react-router-dom';

interface IInsuranceCategoryProps {
  name: string;
  icon: TSvgIconNames;
  link: string;
}

export const InsuranceCategory: FC<IInsuranceCategoryProps> = ({ icon, name, link }) => {
  return (
    <Link to={link}>
      <div className={styles['category']}>
        <div className={styles['frame']}>
          <Icon icon={icon} widthAndHeight={'56px'} />
          <Text className={styles['name']} tag='p' size='s' weight='medium'>
            {name}
          </Text>
        </div>
      </div>
    </Link>
  );
};
