import { IItemsProps, PATH_PAGE, removeTokensFromStorage } from '@/shared';

export const arrayUserButtonData: IItemsProps[] = [
  {
    to: PATH_PAGE.customer.personalDate,
    label: 'Личные данные',
    icon: 'personalData',
  },
  { to: PATH_PAGE.customer.security, label: 'Безопасность', icon: 'security' },
  {
    to: PATH_PAGE.customer.notification,
    label: 'Уведомления',
    icon: 'notification',
  },
  {
    to: PATH_PAGE.customer.legalInformation,
    label: 'Правовая информация',
    icon: 'legalInfo',
  },
  {
    to: PATH_PAGE.customer.servicePackages,
    label: 'Пакеты сервисов',
    icon: 'servicePack',
  },
  { to: PATH_PAGE.customer.service, label: 'Услуги', icon: 'services' },
  {
    to: PATH_PAGE.customer.contactWithTheBank,
    label: 'Связь с банком',
    icon: 'connection-with-bank',
  },
  {
    to: PATH_PAGE.customer.logout,
    label: 'Выйти',
    icon: 'exit',
    onClick: () => {
      removeTokensFromStorage();
    },
  },
];
