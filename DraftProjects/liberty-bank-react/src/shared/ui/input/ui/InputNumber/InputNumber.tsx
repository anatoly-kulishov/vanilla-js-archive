import { ChangeEventHandler, forwardRef, useEffect, useState } from 'react';
import type { IInputNumberProps } from './types.ts';
import { InputText } from '../InputText/InputText.tsx';
import { separation, handleMasking } from './utils.ts';

/**
 * Для корректной работы маски, в компонент рекомендуется передавать пропс
 * maxLength со значение длинны строки с маской. Например:
 *
 * <Input.Number
 *  ...
 *  mask={TEXT.cardFullMask}
 *  maxLength={TEXT.cardFullMask.length}
 * />
 */

export const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>((props, ref) => {
  const { value = '', thousandsSeparator, scale = 20, onChange, mask, ...rest } = props;
  const [inputValue, setInputValue] = useState<string>(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (thousandsSeparator && !mask) {
      setInputValue(separation(e.target.value, scale));
    } else if (!thousandsSeparator && mask) {
      setInputValue(handleMasking(e.target.value, mask));
    } else {
      setInputValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <InputText
      type={thousandsSeparator || mask ? 'text' : 'number'}
      value={inputValue}
      ref={ref}
      onChange={handleChange}
      {...rest}
    />
  );
});

InputNumber.displayName = 'InputNumber';
