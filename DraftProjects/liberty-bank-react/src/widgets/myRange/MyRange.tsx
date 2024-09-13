import classNames from 'classnames';
import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, forwardRef, useState } from 'react';

import { InputErrorMessage, Text, formatNumberWithSpaces } from '@/shared';
import styles from './MyRange.module.scss';

interface IInputRange
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  minValue: number;
  maxValue: number;
  fieldValue: string;
  isError: boolean;
  label: string;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  step?: number;
  size?: 'short' | 'long' | 'medium' | 'lengthy' | 'longest';
  required?: boolean;
  className?: string;
}

export const MyRange = forwardRef<HTMLInputElement, IInputRange>(
  (
    {
      id,
      minValue,
      maxValue,
      fieldValue,
      step,
      size = 'short',
      onChange,
      setIsError,
      isError,
      label,
      required,
      className,
    },
    ref,
  ) => {
    const [value, setValue] = useState(minValue);

    const handleNumChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = Number(e.target.value.replace(/\D/g, ''));
      if (inputValue < minValue || inputValue > maxValue) {
        setIsError(true);
      } else {
        setIsError(false);
      }
      setValue(inputValue);
      if (onChange) {
        onChange(e);
      }
    };

    const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
      setIsError(false);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={classNames(styles.inputWrapper, styles[size])}>
        <div className={styles.labelWithStar}>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          {required && <span className={styles.star}>*</span>}
        </div>

        <div className={classNames(styles.inputWrapper, styles[size])}>
          <div className={classNames(styles.inputTextWrapper, { [styles.error]: isError })}>
            <div className={classNames(styles.inputNumWrapper, { [styles.error]: isError })}>
              <input
                className={classNames(styles.inputText, { [styles.error]: isError }, className)}
                id={id}
                type='text'
                value={formatNumberWithSpaces(value)}
                autoComplete='off'
                onChange={handleNumChange}
                ref={ref}
              />
            </div>
            <Text tag='span' weight='medium' className={styles.fieldValueText}>
              {fieldValue}
            </Text>
          </div>

          {isError && (
            <InputErrorMessage
              message={'Введена недопустимая сумма'}
              classNameProp={styles.errorMessage}
            />
          )}

          <input
            type='range'
            value={value}
            min={minValue}
            max={maxValue}
            step={step}
            className={styles.range}
            onChange={handleRangeChange}
          />
          <div className={styles.minMaxWrapper}>
            <Text tag='span' size='s' className={styles.minMaxText}>
              {formatNumberWithSpaces(minValue)}
            </Text>
            <Text tag='span' size='s' className={styles.minMaxText}>
              {formatNumberWithSpaces(maxValue)}
            </Text>
          </div>
        </div>
      </div>
    );
  },
);

MyRange.displayName = 'MyRange';
