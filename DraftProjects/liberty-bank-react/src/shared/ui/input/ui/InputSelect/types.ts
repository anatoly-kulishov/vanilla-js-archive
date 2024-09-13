import type { IInputTextProps } from '../InputText/types.ts';
import type { ReactNode } from 'react';

export type TOption = string | TOptionObject;

interface TOptionObject {
  caption?: string;
  value: string;
  anotherValue?: string;
  selectedIconType?: 'left' | 'right';
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
}

export interface IInputSelectProps extends Omit<IInputTextProps, 'value' | 'readOnly'> {
  options: TOption[];
  onMySelect?: (selectedOption: TOption) => void;
  value?: TOption;
  isUsedAnotherValue?: boolean;
  defaultOptionSelected?: TOption;
  label?: string;
  enableSearch?: boolean;
}

export const isOptionObject = (option: TOption): option is TOptionObject =>
  typeof option !== 'string';
