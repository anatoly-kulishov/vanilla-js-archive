import { ChangeEvent, InputHTMLAttributes, forwardRef, useId } from 'react';
import classNames from 'classnames';
import styles from './Switch.module.scss';

interface ISwitch extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  checked?: boolean;
  label?: string;
  onChange?: (() => void) | ((e: ChangeEvent<HTMLInputElement>) => void);
}

export const Switch = forwardRef<HTMLInputElement, ISwitch>(
  ({ name, checked, onChange, label }, ref) => {
    const id = useId();

    return (
      <>
        <input
          name={name}
          checked={checked}
          onChange={onChange}
          className={styles['switch-checkbox']}
          id={id}
          type='checkbox'
          ref={ref}
        />
        <label
          className={classNames(styles['switch-label'], { [styles.active]: checked })}
          htmlFor={id}
        >
          <span className={styles['switch-button']} />
        </label>
        {label && <span>{label}</span>}
      </>
    );
  },
);

Switch.displayName = 'Switch';
