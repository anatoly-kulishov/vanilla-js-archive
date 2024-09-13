import { IInputTextProps } from '../InputText/types.ts';

export interface IInputSearchProps extends IInputTextProps {
  onSearch?: () => void;
}
