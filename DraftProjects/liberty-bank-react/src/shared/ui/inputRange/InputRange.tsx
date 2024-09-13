import {
  useState,
  ChangeEvent,
  HTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Text, InputErrorMessage } from '../';
import { formatNumberWithSpaces } from '../..';
import styles from './InputRange.module.scss';

interface IInputRange
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  minValue: number;
  maxValue: number;
  label: string;
  fieldValue: string;
  isError: boolean;
  errorMessage?: string;
  step?: number;
  size?: 'short' | 'long' | 'medium' | 'lengthy' | 'longest';
  required?: boolean;
  className?: string;
  dataTestId?: string;
  handleChange?: () => void;
  currentValue?: string;
}

export const InputRange = forwardRef<HTMLInputElement, IInputRange>(
  (
    {
      id,
      minValue,
      maxValue,
      label,
      fieldValue,
      isError,
      errorMessage,
      step,
      size = 'short',
      required = false,
      onChange,
      className,
      dataTestId,
      handleChange,
      currentValue,
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useState(minValue);

    useEffect(() => {
      setValue(Number(currentValue) || minValue);
    }, [currentValue, minValue]);

    const handleNumChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue, selectionStart } = e.target;
      const newValue = inputValue.replace(/\D/g, '');

      const previousLength = e.target.value.length;

      const numericValue = Number(newValue);
      await setValue(numericValue);

      if (onChange) {
        onChange(e);
      }
      if (handleChange) {
        handleChange();
      }

      const newLength = formatNumberWithSpaces(numericValue).length;
      const cursorPositionAdjustment = newLength - previousLength;

      requestAnimationFrame(() => {
        if (e.target.setSelectionRange) {
          const newCursorPosition = (selectionStart || 0) + cursorPositionAdjustment;
          e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      });
    };

    const handleRangeChange = async (e: ChangeEvent<HTMLInputElement>) => {
      await setValue(Number(e.target.value));
      if (onChange) {
        onChange(e);
      }
    };

    const placeHolderValue = () => {
      if (formatNumberWithSpaces(value) === '0') {
        return '0';
      } else {
        return '';
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

        <div className={classNames(styles.inputTextWrapper, { [styles.error]: isError })}>
          <div className={classNames(styles.inputNumWrapper, { [styles.error]: isError })}>
            <input
              className={classNames(styles.inputText, { [styles.error]: isError }, className)}
              id={id}
              type='text'
              value={formatNumberWithSpaces(value) === '0' ? '' : formatNumberWithSpaces(value)}
              placeholder={placeHolderValue()}
              autoComplete='off'
              required
              onChange={handleNumChange}
              ref={ref}
              data-testid={dataTestId}
              {...rest}
            />
          </div>
          <Text tag='span' weight='medium' className={styles.fieldValueText}>
            {fieldValue}
          </Text>
        </div>

        {errorMessage && (
          <InputErrorMessage message={errorMessage} classNameProp={styles.errorMessage} />
        )}

        <input
          type='range'
          value={value}
          min={minValue}
          max={maxValue}
          step={step}
          className={styles.range}
          onChange={handleRangeChange}
          onMouseUp={handleChange}
          {...rest}
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
    );
  },
);

InputRange.displayName = 'InputRange';
