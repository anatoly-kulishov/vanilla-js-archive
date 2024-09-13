import {
  useState,
  useRef,
  forwardRef,
  FormEvent,
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react';
import styles from './MyInput.module.scss';
import classNames from 'classnames';
import { useCombinedRef } from '../..';

export interface IInput
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: string;
  label?: string | null;
  className?: string;
  type: string;
  name?: string;
  maxLength?: number;
  id?: string;
  defaultValue?: string;
  iconButton?: ReactNode;
  size?: 'm' | 's' | 'l';
  readOnly?: boolean;
}

export const MyInput = forwardRef<HTMLInputElement, IInput>(
  (
    {
      placeholder,
      onChange,
      onInput,
      value,
      type = 'select',
      maxLength,
      className,
      id,
      defaultValue,
      size = 'm',
      readOnly,
      iconButton,
    },
    ref,
  ): JSX.Element => {
    const initialValue = value || defaultValue;
    const [valueInput, setValueInput] = useState<string | undefined>(initialValue);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefCombine = useCombinedRef(ref, inputRef);

    useEffect(() => {
      if (inputRef.current && initialValue) {
        setValueInput(initialValue);
        inputRef.current.size = initialValue.length || 1;
      }
    }, [initialValue]);

    const boxClasses = classNames(styles.inputWrapper, {
      [styles[size]]: size,

      [className as string]: className,
    });
    const inputClasses = classNames(styles.input);
    const buttonClasses = classNames(styles.buttonInput);

    const handleChangeValue: (e: FormEvent<HTMLInputElement>) => void = (e) => {
      setValueInput(e.currentTarget.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleOnInputValue: (e: FormEvent<HTMLInputElement>) => void = (e) => {
      setValueInput(e.currentTarget.value);
      if (onInput) {
        onInput(e);
      }
    };

    const getInput = (): JSX.Element => (
      <input
        maxLength={maxLength}
        type={type}
        onChange={handleChangeValue}
        onInput={handleOnInputValue}
        className={inputClasses}
        ref={inputRefCombine}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={valueInput}
        id={id}
        readOnly={readOnly}
      />
    );

    return (
      <div className={boxClasses}>
        {getInput()}
        {iconButton && <div className={buttonClasses}>{iconButton}</div>}
      </div>
    );
  },
);

MyInput.displayName = 'MyInput';
