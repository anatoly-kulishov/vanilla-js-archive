import type { ReactNode } from 'react';
import type { IInputMaskProps } from '../InputMask/types';

export interface IInputTextProps extends Omit<IInputMaskProps, 'size'> {
  size?: 'l' | 's' | 'm';
  label?: string;
  placeholder?: string;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  clearable?: {
    onClear?: () => void;
    hide?: boolean;
  };
  isError?: boolean;
  className?: string;
  required?: boolean;
  white?: boolean;
}
