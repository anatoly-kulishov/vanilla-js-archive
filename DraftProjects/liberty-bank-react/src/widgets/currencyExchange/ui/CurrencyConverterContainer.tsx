import { FC, ReactNode } from 'react';
import styles from './CurrencyConverterContainer.module.scss';
import classNames from 'classnames';

interface CurrencyConverterContainerProps {
  children: ReactNode;
  isLast: boolean;
}

export const CurrencyConverterContainer: FC<CurrencyConverterContainerProps> = ({
  children,
  isLast,
}) => {
  return (
    <div
      className={classNames(styles.currencyConverterContainer, {
        [styles['isLast']]: isLast,
      })}
    >
      {children}
      <div className={styles.border_line} />
    </div>
  );
};
