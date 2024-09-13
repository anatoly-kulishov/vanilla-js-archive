import { ReactNode } from 'react';

export type TOption = string | TOptionObject;

interface TOptionObject {
  caption?: string;
  value: string;
  selectedIconType?: 'left' | 'right';
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
}
