import { AccountInfo } from '@/entities';
import { IMenuLink } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { MENU } from '../constants';

interface IButtonNavigate {
  name: string;
  text: string;
}

export const useAddNavigationFunctions = (bill: AccountInfo): Record<string, IMenuLink[]> => {
  const navigate = useNavigate();

  const handleMenuClick = (button: IButtonNavigate) => {
    navigate(button.name, { state: { key: { bill } } });
  };

  return {
    ACTIVE: MENU.ACTIVE.map((button) => ({ ...button, onClick: () => handleMenuClick(button) })),
    BLOCKED: MENU.BLOCKED.map((button) => ({ ...button, onClick: () => handleMenuClick(button) })),
    CLOSED: MENU.CLOSED.map((button) => ({ ...button, onClick: () => handleMenuClick(button) })),
    MAIN: MENU.MAIN.map((button) => ({ ...button, onClick: () => handleMenuClick(button) })),
  };
};
