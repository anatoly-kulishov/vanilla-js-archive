import { FC, memo, useEffect, useState } from 'react';
import styles from './AnimatedTicker.module.scss';

interface AnimatedTickerProps {
  currentValue: number;
  children: React.ReactNode;
  style?: React.CSSProperties | string;
}

export const AnimatedTicker: FC<AnimatedTickerProps> = memo(function AnimatedTicker({
  currentValue,
  children,
  style = '',
}) {
  const [value, setValue] = useState<number>(0);
  const [change, setChange] = useState<string>('');

  useEffect(() => {
    if (value) {
      if (currentValue - value > 0) {
        setChange('positiveBG');
      } else {
        if (currentValue - value < 0) {
          setChange('negativeBG');
        } else {
          setChange('');
        }
      }
    }
    setTimeout(() => setChange(''), 1500);
    setValue(currentValue);
  }, [currentValue]);

  return <div className={styles[change] + ` ${style}`}>{children}</div>;
});
