import type { IIconProps } from '@/shared';

export const TITLE = 'Мои активы';
export const BUTTON_TEXT = 'Купить';

export const ASSETS_BUY_MODAL = {
  buyQuestion: 'Чтобы открыть доступ к покупке активов, необходимо пройти тестирование?',
  buyButtonTest: 'Пройти тест',
  buyButtonCancel: 'Вернуться назад',
} as const;

export const ASSETS: {
  icon: IIconProps;
  title: string;
  content: { title: string; sum: number }[];
}[] = [
  {
    icon: {
      icon: 'stocks',
      width: '24px',
      height: '24px',
      color: '#005AFE',
    },
    title: 'Акции',
    content: [
      { title: 'Cбербанк', sum: 275.78 },
      { title: 'Газпром', sum: 165.8 },
    ],
  },
  {
    icon: {
      icon: 'docs',
      width: '24px',
      height: '24px',
      color: '#005AFE',
    },
    title: 'Облигации',
    content: [
      { title: 'М.Видео выпуск 3', sum: 835 },
      { title: 'СПМК БО-02', sum: 952.9 },
      { title: 'МФК ЦФП выпуск 1', sum: 995.5 },
    ],
  },
  {
    icon: {
      icon: 'coins',
      width: '24px',
      height: '24px',
      color: '#005AFE',
    },
    title: 'Валюта',
    content: [{ title: 'Доллар США', sum: 90.57 }],
  },
];
