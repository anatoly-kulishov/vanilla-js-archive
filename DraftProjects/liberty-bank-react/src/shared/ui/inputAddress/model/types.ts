import { HTMLAttributes } from 'react';

type Option = {
  type: string;
  value: string;
  node: JSX.Element;
};

export type AddressOptionsType = {
  region?: string;
  city?: string;
  street?: string;
};

export interface InputAddressProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  addressOptions: AddressOptionsType;
  value?: string;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  onMySelect?: (value: string | Option) => void;
  size?: 'm' | 's' | 'l';
  name?: string;
  isCurrency?: boolean;
  dir?: string;
  label?: string;
  white?: boolean;
  optionsLimit?: number;
  required?: boolean;
  isError?: boolean;
}
