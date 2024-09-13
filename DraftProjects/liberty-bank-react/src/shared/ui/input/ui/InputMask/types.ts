import { IInputBaseProps } from '../InputBase/types';

export interface IInputMaskProps extends IInputBaseProps {
  chars?: RegExp;
  mask?: string;
  isReverseMask?: boolean;
}
