import { InputHTMLAttributes } from 'react';

export interface IInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  dataTestId?: string;
}
