import { PATH_PAGE } from '@/shared';

export const Title = 'Кабинет инвестора';

export const NAV_BODY_ITEM = [
  {
    id: 1,
    label: 'Портфель',
    link: PATH_PAGE.investmentLK.briefcase.start,
  },
  {
    id: 2,
    label: 'Каталог',
    link: PATH_PAGE.investmentLK.catalog.start,
  },
  {
    id: 3,
    label: 'Аналитика',
    link: PATH_PAGE.investmentLK.analytics.start,
  },
  {
    id: 4,
    label: 'Новости',
    link: PATH_PAGE.investmentLK.news.start,
  },
  {
    id: 5,
    label: 'Обучение',
    link: PATH_PAGE.investmentLK.education.start,
  },
  {
    id: 6,
    label: 'Дополнительные опции',
    link: PATH_PAGE.investmentLK.settings,
  },
] as const;
