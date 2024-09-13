import { ChangeEvent, forwardRef, useEffect, useId, useState } from 'react';
import { InputBase } from '../InputBase/InputBase';
import { IInputCheckboxProps } from './types';
import { Icon } from '@/shared';
import styles from './InputCheckbox.module.scss';

export const InputCheckbox = forwardRef<HTMLInputElement, IInputCheckboxProps>((props, ref) => {
  const { width, height, type, checked: checkedProp, onChange: onChangeProp, ...rest } = props;

  const isCheckedProp = typeof checkedProp === 'boolean';
  const id = useId();

  const [checked, setChecked] = useState(isCheckedProp ? checkedProp : false);

  useEffect(() => setChecked(checkedProp || false), [checkedProp]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChangeProp?.(e);
  };

  const getIcon = () => {
    const isActive = isCheckedProp ? checkedProp : checked;

    if (type === 'radio')
      return (
        <Icon
          width={width ? String(width) : '16px'}
          height={height ? String(height) : '16px'}
          icon={isActive ? 'radio-button-on' : 'radio-button-off'}
        />
      );

    return <Icon icon={isActive ? 'checkboxActive' : 'checkbox'} />;
  };

  return (
    <>
      <InputBase
        id={id}
        ref={ref}
        onChange={onChange}
        checked={isCheckedProp ? checkedProp : checked}
        hidden
        type='checkbox'
        {...rest}
      />
      <label htmlFor={id} className={styles.label}>
        {getIcon()}
      </label>
    </>
  );
});

InputCheckbox.displayName = 'InputCheckbox';
