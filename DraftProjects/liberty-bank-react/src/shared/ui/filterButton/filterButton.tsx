import { FC } from 'react';
import { Button, Icon, Text } from '../..';
import styles from './filterButton.module.scss';

interface IFilterButton {
  onClick: () => void;
  label: string;
}

export const FilterButton: FC<IFilterButton> = ({ onClick, label }) => {
  return (
    <Button type='button' theme='icon' className={styles.button} onClick={onClick}>
      <Icon icon='filterIcon' width='30px' height='25px' stroke='#005AFE' />
      <Text tag='p' size='s'>
        {label}
      </Text>
    </Button>
  );
};
