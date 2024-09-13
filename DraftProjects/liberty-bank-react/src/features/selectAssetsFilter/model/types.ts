import type { ReactNode } from 'react';

export type SelectedOption = string | OptionObject;

interface OptionObject {
  caption?: string;
  value: string;
  selectedIconType?: 'left' | 'right';
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
}
