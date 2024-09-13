import { forwardRef } from 'react';
import type { IInputEmailProps } from './types.ts';
import { InputText } from '../InputText/InputText.tsx';

export const InputTel = forwardRef<HTMLInputElement, IInputEmailProps>((props, ref) => (
  <InputText type={'tel'} ref={ref} chars={/\d/} {...props} />
));

InputTel.displayName = 'InputTel';
