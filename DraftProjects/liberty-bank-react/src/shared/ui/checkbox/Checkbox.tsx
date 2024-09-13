import classNames from 'classnames';
import styles from './Checkbox.module.scss';
import { FC } from 'react';

export interface ICheckbox {
  name: string;
  checked: boolean;
  onChange: () => void;
  required?: boolean;
}

export const Checkbox: FC<ICheckbox> = ({ name, checked, onChange, required }) => {
  return (
    <>
      <input
        name={name}
        value={name}
        checked={checked}
        required={required}
        onChange={onChange}
        className={styles.checkbox}
        id={name}
        type='checkbox'
      />
      <label className={classNames(styles.label, { [styles.active]: checked })} htmlFor={name} />
    </>
  );
};
