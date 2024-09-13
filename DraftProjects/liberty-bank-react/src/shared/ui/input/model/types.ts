import type { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { IIconProps } from '../..';

export interface InputBoxProps {
  children: ReactNode;
  className?: string;
  dataTestid?: string;
}

export interface IInput
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value?: string | null;
  label?: string | null;
  isError?: boolean;
  className?: string;
  type: string;
  name?: string;
  maxLength?: number;
  resetField?: () => void;
  resetMask?: () => void;
  handleSearch?: () => void;
  white?: boolean;
  required?: boolean;
  id?: string;
  defaultValue?: string;
  wrappDataTestid?: string;
  size?: 'm' | 's' | 'l';
  textAlign?: string;
  readOnly?: boolean;
  iconButton?: ReactNode;
  disabled?: boolean;
  svg?: IIconProps;
  dataTestId?: string;
  paintedWIthDark?: boolean;
}

export interface ILabelBox {
  id: string;
  label: string;
  children: ReactElement;
  required?: boolean;
  fieldValue?: string;
  className?: string;
  isContentLeft?: boolean;
  error?: string;
}
