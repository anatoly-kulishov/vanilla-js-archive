import {
  DetailedHTMLProps,
  forwardRef,
  FormEvent,
  HTMLAttributes,
  useState,
  FocusEvent,
  MouseEvent,
  useRef,
} from 'react';
import styles from './inputText.module.scss';
import { Button, Icon } from '..';
import classNames from 'classnames';
import { useCombinedRef } from '../..';

interface IInputTextProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  placeholder?: string;
  value?: string;
  id?: string;
  resetField?: () => void;
  valueChange?: (newValue: string) => void;
}

export const InputText = forwardRef<HTMLTextAreaElement, IInputTextProps>(
  (props, ref): JSX.Element => {
    const { placeholder = 'Ваше сообщение', value, id, valueChange, resetField, ...rest } = props;
    const [focus, setFocus] = useState<boolean>(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const textAreaRefCombine = useCombinedRef(ref, textAreaRef);

    const handleChangeValue: (e: FormEvent<HTMLTextAreaElement>) => void = (e) => {
      valueChange?.(e.currentTarget.value);
    };

    const handleClickClearText: () => void = () => {
      resetField?.();

      if (textAreaRef.current) {
        textAreaRef.current.value = '';
        textAreaRef.current.blur();
      }

      valueChange?.('');
      setFocus(false);
    };

    const handleFocus: () => void = () => {
      setFocus(true);
    };

    const handleFocusLabel: (e: MouseEvent<HTMLLabelElement>) => void = () => {
      setFocus(true);
      textAreaRef.current?.focus();
    };

    const handleFocusDisable: (e: FocusEvent<HTMLTextAreaElement>) => void = (e) => {
      e.preventDefault();
      setFocus(false);
    };

    return (
      <div className={classNames(styles.inputText, { [styles['inputText_focus']]: focus })}>
        <div className={styles.labelContainer}>
          <label htmlFor={id} className={styles.label} onClick={handleFocusLabel}>
            {placeholder}
          </label>
          {value && (
            <Button theme='icon' className={styles.closeButton} onClick={handleClickClearText}>
              <Icon icon={'clear'} fill='none' />
            </Button>
          )}
        </div>
        <textarea
          className={styles.text}
          value={value}
          id={id}
          ref={textAreaRefCombine}
          onChange={handleChangeValue}
          onFocus={handleFocus}
          onBlur={handleFocusDisable}
          {...rest}
        />
      </div>
    );
  },
);

InputText.displayName = 'inputText';
