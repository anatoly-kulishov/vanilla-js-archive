import type { IImageProps } from '@/shared';

export type CardsType = 'Все' | 'Дебетовая' | 'Кредитная';

export const TEXT = {
  ['Все']: 'На данный момент отсутствуют действующие карты',
  ['Дебетовая']: 'На данный момент отсутствуют действующие дебетовые карты',
  ['Кредитная']: 'На данный момент отсутствуют действующие кредитные карты',
  allCards: 'Все',
} as const;

export const noDataIcon: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
} as const;
