import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { IInputSMSProps } from './types';
import styles from './InputSMS.module.scss';
import { InputText } from '../InputText/InputText';

export const InputSMS: FC<IInputSMSProps> = (props) => {
  const { length = 6, onChange: onChangeProp, ...rest } = props;

  const ref = useRef<HTMLInputElement[] | null[]>([null]);
  const [value, setValue] = useState(new Array(length).fill(''));

  useEffect(() => {
    setValue(new Array(length).fill(''));
  }, [length]);

  const updateValue = (value: string, index: number) =>
    setValue((state) => state.map((e, i) => (index === i ? value : e)));

  const addValue = (value: string) =>
    setValue((state) => {
      const nextState = state.filter((item) => item !== '');

      if (nextState.length < state.length) {
        if (value.match(/[1-9]/)) nextState.push(value);
        state.forEach((_, index) => (index > nextState.length - 1 ? nextState.push('') : null));
      }

      return nextState;
    });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    addValue(e.target.value);
    const i = value.filter((item) => item !== '').length;

    if (e.target.value.match(/[1-9]/) && i + 1 <= length) ref.current[i + 1]?.focus();

    const newValue = [...value];
    newValue[i] = e.target.value;

    onChangeProp?.({ ...e, target: { ...e.target, value: newValue.join('') } });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (i === length - 1 && value[i]) {
        ref.current[i]?.focus();
        updateValue('', i);
        return;
      }

      ref.current[i - 1]?.focus();
      updateValue('', i - 1);
    }
  };

  return (
    <div className={styles.inputSMS}>
      {value.map((e, i) => (
        <InputText
          key={i}
          value={e}
          ref={(e) => (ref.current[i] = e)}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e, i)}
          maxLength={1}
          className={styles.item}
          dataTestId={`inputBase-${i + 1}`}
          {...rest}
        />
      ))}
    </div>
  );
};
