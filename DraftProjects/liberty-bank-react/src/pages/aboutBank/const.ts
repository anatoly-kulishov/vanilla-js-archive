import type { TSvgIconNames } from '@/shared';

interface Item {
  title: string;
  icon: TSvgIconNames;
  link: string;
}

interface ItemsTab {
  title: string;
  value: Item[];
}

export const ITEMS_TAB: ItemsTab[] = [
  {
    title: 'Liberty today',
    value: [
      { title: 'Преимущества', icon: 'star-circle', link: '' },
      { title: 'Миссия и ценности', icon: 'target', link: '' },
      { title: 'Достижения', icon: 'achievements', link: '' },
    ],
  },
  {
    title: 'Раскрытие информации',
    value: [
      { title: 'Отчетность', icon: 'docs-circle', link: '' },
      { title: 'Лицензии', icon: 'license', link: '' },
    ],
  },
  {
    title: 'Финансовым организациям',
    value: [
      { title: 'Осуществляемые операции', icon: 'card', link: '' },
      { title: 'Тарифы и документы', icon: 'percent-white-circle', link: '' },
    ],
  },
];

export const TITLE = 'О банке';
