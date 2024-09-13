import { Link } from 'react-router-dom';
import { Text, Icon, TSvgIconNames } from '../../../../shared';
import styles from './TransferActionItem.module.scss';

interface Props {
  href: string;
  icon: TSvgIconNames;
  title: string;
}

export const TransferActionItem = ({ href, icon, title }: Props) => {
  return (
    <Link to={href} className={styles.link}>
      <Icon icon={icon} width='32' height='32' />
      <Text tag='p' weight='medium' size='s' className={styles.text}>
        {title}
      </Text>
    </Link>
  );
};
