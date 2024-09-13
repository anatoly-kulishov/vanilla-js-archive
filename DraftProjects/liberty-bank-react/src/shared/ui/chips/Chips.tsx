import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Chips.module.scss';

interface IChipsProps extends InputHTMLAttributes<HTMLInputElement> {
  values: string[];
  type: 'radio' | 'checkbox';
  defaultCheck?: string;
  viewType?: 'buttons' | 'dots';
}

export const Chips = forwardRef<HTMLInputElement, IChipsProps>(
  ({ values, type, onChange, defaultCheck, viewType = 'buttons', ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    };

    const wrapper = classNames(styles.wrapper, {
      [styles.buttons]: viewType === 'buttons',
      [styles.dots]: viewType === 'dots',
    });

    return (
      <div className={wrapper}>
        {values.map((val) => (
          <div key={val} className={styles.currency}>
            <input
              id={val}
              className={styles.radio}
              type={type}
              value={val}
              ref={ref}
              onChange={handleChange}
              defaultChecked={defaultCheck === val}
              {...props}
            />
            <label htmlFor={val}>{val}</label>
          </div>
        ))}
      </div>
    );
  },
);

Chips.displayName = 'Chips';
