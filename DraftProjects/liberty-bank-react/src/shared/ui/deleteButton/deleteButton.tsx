import React, { FC } from 'react';
import { Icon } from '..';
import styles from './deleteButton.module.scss';

interface Props {
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export const DeleteButton: FC<Props> = ({ onClick }) => {
  return (
    <button className={styles['delete-button']} onClick={onClick}>
      <Icon icon={'trash'} color={'#005AFE'} />
    </button>
  );
};
