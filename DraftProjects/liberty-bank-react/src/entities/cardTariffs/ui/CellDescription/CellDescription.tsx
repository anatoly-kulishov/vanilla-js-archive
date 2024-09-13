import { Text } from '@/shared';
import styles from './CellDescription.module.scss';

interface Props {
  text: string;
}

export const CellDescription = ({ text }: Props) => {
  return (
    <Text tag='p' size='xs' className={styles['cell-description']}>
      {text}
    </Text>
  );
};
