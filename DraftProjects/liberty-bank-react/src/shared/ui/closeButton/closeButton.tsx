import { Icon } from '..';
import React, { FC } from 'react';
import styles from './closeButton.module.scss';

interface Props {
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export const CloseButton: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles['close-button']}>
      <Icon icon={'close-button'} widthAndHeight={'28px'} color={'rgba(216, 223, 234, 1)'} />
    </button>
  );
};
