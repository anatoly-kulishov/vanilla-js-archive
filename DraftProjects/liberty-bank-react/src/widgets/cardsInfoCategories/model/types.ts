import type { TSvgIconNames } from '../../../shared';
import { CardAction } from '../constants/constants';

export interface modalInfo {
  isModal: boolean;
  link: CardAction | null;
}

export interface LinkCardInfo {
  icon: TSvgIconNames;
  name: string;
  link?: string;
  modalType?: CardAction;
  hasSwitcher?: boolean;
}
