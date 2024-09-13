import { FC } from 'react';
import { Icon } from '..';
import styles from './Spinner.module.scss';

interface ISpinner {
  width?: string;
  height?: string;
}

export const Spinner: FC<ISpinner> = ({ width = '50', height = '50' }) => {
  return (
    <div className={styles.spinnerContainer}>
      <Icon icon={'spinner'} width={width} height={height} name={'spinner'} />
    </div>
  );
};
