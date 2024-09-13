import { ReactNode } from 'react';

export interface SelectOptionContentProps {
  selected?: boolean;
  isInContainer?: boolean;
}
export type SelectOptionContent = (props: SelectOptionContentProps) => ReactNode;

export interface SelectOption {
  value: string;
  content?: SelectOptionContent | undefined;
}
