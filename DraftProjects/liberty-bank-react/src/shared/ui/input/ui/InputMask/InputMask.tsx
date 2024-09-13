import { forwardRef } from 'react';
import { InputBase } from '../InputBase/InputBase';
import { IInputMaskProps } from './types';
import { applyMask } from './utils';

export const InputMask = forwardRef<HTMLInputElement, IInputMaskProps>((props, ref) => {
  const { mask, isReverseMask, chars, value, ...rest } = props;

  const clearValue = () => {
    if (!chars) return value;
    const str = String(value ?? '');
    return str.match(new RegExp(chars, 'g'))?.join('') ?? '';
  };

  const getValue = () => {
    const clearedValue = clearValue();
    if (!mask) return clearedValue;
    return applyMask(mask, String(clearedValue), isReverseMask);
  };

  return <InputBase ref={ref} value={getValue()} maxLength={mask?.length || -1} {...rest} />;
});

InputMask.displayName = 'InputMask';
