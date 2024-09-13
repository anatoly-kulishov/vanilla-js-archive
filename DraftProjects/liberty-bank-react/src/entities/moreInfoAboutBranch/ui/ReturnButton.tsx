import { Icon, Text } from '@/shared';
import styles from './ReturnButton.module.scss';

interface Props {
  onClick: () => void;
}

export const ReturnButton = (props: Props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={styles.return_button}>
      <Icon icon={'arrow-left-black'} />
      <Text tag='p'>Вернуться к списку</Text>
    </div>
  );
};
