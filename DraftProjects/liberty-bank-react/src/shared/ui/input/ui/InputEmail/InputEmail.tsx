import { forwardRef } from 'react';
import type { IInputEmailProps } from './types.ts';
import { InputText } from '../InputText/InputText.tsx';

export const InputEmail = forwardRef<HTMLInputElement, IInputEmailProps>((props, ref) => (
  <InputText type={'email'} ref={ref} {...props} />
));

InputEmail.displayName = 'InputEmail';
