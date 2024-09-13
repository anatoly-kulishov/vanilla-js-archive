import { PATH_PAGE } from '@/shared';

export const NAV_BODY_ITEM = [
  {
    id: 1,
    label: 'Главная',
    link: PATH_PAGE.root,
  },
  {
    id: 2,
    label: 'Карты',
    link: PATH_PAGE.cards,
  },
  {
    id: 3,
    label: 'Счета',
    link: PATH_PAGE.myBills,
  },
  {
    id: 4,
    label: 'Переводы',
    link: PATH_PAGE.transfers.home,
  },
  {
    id: 5,
    label: 'Платежи',
    link: PATH_PAGE.payments,
  },
  {
    id: 6,
    label: 'Кредиты',
    link: PATH_PAGE.credits,
  },
  {
    id: 7,
    label: 'Депозиты',
    link: PATH_PAGE.deposits,
  },
  {
    id: 8,
    label: 'Страхование',
    link: PATH_PAGE.insurance,
  },
  {
    id: 9,
    label: 'Инвестиции',
    link: PATH_PAGE.investment,
  },
  {
    id: 10,
    label: 'Бонусы',
    link: PATH_PAGE.bonuses,
  },
] as const;
