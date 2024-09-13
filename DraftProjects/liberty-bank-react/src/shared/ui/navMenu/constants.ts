import { PATH_PAGE } from '../..';

export const PAGES = [
  {
    id: 1,
    label: 'О Банке',
    link: PATH_PAGE.aboutBank,
  },
  {
    id: 2,
    label: 'Точки пополнения и Банкоматы',
    link: PATH_PAGE.bankBranch,
  },
  {
    id: 3,
    label: 'Курсы валют',
    link: PATH_PAGE.exchangeRates,
  },
  {
    id: 4,
    label: 'Контакты',
    link: PATH_PAGE.contacts,
  },
  {
    id: 5,
    label: 'Помощь',
    link: PATH_PAGE.help,
  },
  {
    id: 6,
    label: 'Новости',
    link: PATH_PAGE.news,
  },
  {
    id: 7,
    label: 'Работа',
    link: PATH_PAGE.work,
  },
] as const;
