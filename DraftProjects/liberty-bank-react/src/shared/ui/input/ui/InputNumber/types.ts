import type { IInputTextProps } from '../InputText/types.ts';

export interface IInputNumberProps extends Omit<IInputTextProps, 'type'> {
  value?: string | number;
  scale?: number;
  thousandsSeparator?: boolean;
}
