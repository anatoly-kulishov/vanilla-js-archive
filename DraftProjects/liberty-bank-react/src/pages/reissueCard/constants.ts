export const TEXT = {
  defaultPageTitle: 'Перевыпустить карту',
  deliveryPageTitle: 'Доставка карты',
  back: 'Назад',
} as const;

export const PAGE_TITLES = {
  0: TEXT.defaultPageTitle,
  1: TEXT.deliveryPageTitle,
  2: TEXT.deliveryPageTitle,
  3: TEXT.defaultPageTitle,
} as const satisfies Record<0 | 1 | 2 | 3, string>;
