import { IInputTextProps } from '../InputText/types';

export interface IInputDateProps extends Omit<IInputTextProps, 'value'> {
  value?: Date;
}
