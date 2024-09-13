import { TSvgIconNames, TSvgImageNames } from '@/shared';

export const PAGES = [
  {
    id: 1,
    label: 'О Банке',
    link: '/about-bank',
  },
  {
    id: 2,
    label: 'Точки пополнения и Банкоматы',
    link: '/bank_branch',
  },
  {
    id: 3,
    label: 'Курсы валют',
    link: '/exchange-rates',
  },
  {
    id: 4,
    label: 'Контакты',
    link: '/contacts',
  },
  {
    id: 5,
    label: 'Помощь',
    link: '/help',
  },
  {
    id: 6,
    label: 'Новости',
    link: '/news',
  },
] as const;

interface IC<Icon> {
  id: number;
  href: string;
  icon: Icon;
}

export const ICON: IC<TSvgIconNames>[] = [
  {
    id: 1,
    href: 'https://vk.com/',
    icon: 'vk',
  },
  {
    id: 2,
    href: 'https://ok.ru/',
    icon: 'classmates',
  },
  {
    id: 3,
    href: 'https://twitter.com/',
    icon: 'twitter',
  },
  {
    id: 4,
    href: 'https://www.youtube.com/',
    icon: 'youtube',
  },
  {
    id: 5,
    href: 'https://web.telegram.org/a/',
    icon: 'telegram',
  },
];

export const APPLICATIONS: IC<TSvgImageNames>[] = [
  {
    id: 1,
    href: 'https://google.com/',
    icon: 'appStore',
  },
  {
    id: 2,
    href: 'https://google.com/',
    icon: 'googlePlay',
  },
];

export const DATA = {
  telefon: '8 800 666-99-98',
  title: 'для звонков по России',
  application: 'Наше приложение',
};

export const COOKIE = `АО «Liberty Bank» использует файлы «cookie», с целью персонализации сервисов и повышения
удобства пользования веб-сайтом. «Cookie» представляют собой небольшие файлы, содержащие
информацию о предыдущих посещениях веб-сайта. Если вы не хотите использовать файлы
«cookie», измените настройки браузера.`;

export const LICENSE =
  '© 2023, АО «Liberty Bank», официальный сайт, универсальная лицензия ЦБ РФ № 2475';
