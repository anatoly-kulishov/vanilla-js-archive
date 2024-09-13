import { FC } from 'react';
import styles from './CountIndicator.module.scss';

interface ICountIndicatorProps {
  count: number;
}

export const CountIndicator: FC<ICountIndicatorProps> = ({ count }) => (
  <div className={styles.indicator}>{count}</div>
);
