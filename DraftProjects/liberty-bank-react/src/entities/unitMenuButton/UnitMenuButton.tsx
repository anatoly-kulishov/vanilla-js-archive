import { FC } from 'react';
import { Text, Icon } from '@/shared';
import styles from './UnitMenuButton.module.scss';
import { Link } from 'react-router-dom';

interface UnitMenuButtonProps {
  text: string;
  href: string;
}
const UnitMenuButton: FC<UnitMenuButtonProps> = ({ text, href }) => {
  return (
    <Link to={href} className={styles.title}>
      <Text tag='h3' weight='medium'>
        {text}
      </Text>
      <Icon icon={'arrow-right-dark'} />
    </Link>
  );
};

export default UnitMenuButton;
