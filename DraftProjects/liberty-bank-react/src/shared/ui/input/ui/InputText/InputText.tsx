import { ChangeEvent, forwardRef, MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './InputText.module.scss';
import classNames from 'classnames';
import { Icon, useCombinedRef } from '@/shared';
import { IInputTextProps } from './types.ts';
import { InputMask } from '../InputMask/InputMask.tsx';

export const InputText = forwardRef<HTMLInputElement, IInputTextProps>((props, refProp) => {
  const {
    size = 'm',
    label,
    placeholder,
    contentLeft,
    contentRight,
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
    clearable,
    isError,
    className,
    required,
    disabled,
    white = false,
    ...rest
  } = props;

  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    if (valueProp) setValue(valueProp);
  }, [valueProp]);

  const ref = useRef<HTMLInputElement>(null);

  const classes = classNames(
    styles.inputText,
    styles['size-' + size],
    focus && styles.focus,
    value && styles.hasValue,
    isError && styles.isError,
    white && styles.white,
    className,
  );

  const onClick = () => {
    if (!disabled) {
      !focus && setFocus(true);
      ref.current?.focus();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeProp?.(e);
  };

  const onClear = (e: MouseEvent) => {
    e.stopPropagation();
    setValue('');
    clearable?.onClear?.();
    setFocus(false);
  };

  const onFocus = () => !disabled && setFocus(true);
  const onBlur = () => setFocus(false);

  const isShowClearButton = clearable && (!!valueProp || !!value) && (!clearable.hide || focus);

  return (
    <div className={classes} {...{ onClick, onFocus, onBlur }}>
      {contentLeft}
      <div className={classNames(styles.body, label && styles.label)}>
        {label && <label className={required ? styles.required : ''}>{label}</label>}
        <InputMask
          value={valueProp ?? value}
          {...{ onChange, placeholder, ...rest }}
          ref={useCombinedRef(ref, refProp)}
          disabled={disabled}
        />
      </div>
      {isShowClearButton && <Icon icon='clear' onClick={onClear} />}
      {contentRight}
    </div>
  );
});

InputText.displayName = 'InputText';
