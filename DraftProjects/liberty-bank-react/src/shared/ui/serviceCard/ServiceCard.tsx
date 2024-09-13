import { FC } from 'react';
import { Icon, Text, TSvgIconNames } from '..';
import { iconData } from './constants';
import styles from './ServiceCard.module.scss';

interface IServiceCard {
  title: string;
  description: string;
  iconName: TSvgIconNames;
}

export const ServiceCard: FC<IServiceCard> = ({ title, description, iconName }) => {
  return (
    <div className={styles.wrapper}>
      <Icon icon={iconName} width={iconData.width} height={iconData.height} />
      <Text tag='span' size='m' weight='medium' className={styles.title}>
        {title}
      </Text>
      <Text tag='span' size='s' className={styles.description}>
        {description}
      </Text>
    </div>
  );
};
