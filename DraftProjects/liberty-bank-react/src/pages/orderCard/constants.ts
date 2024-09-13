export const TEXT = {
  defaultPageTitle: 'Заказать дебетовую карту',
  deliveryPageTitle: 'Доставка карты',
  back: 'Назад',
} as const;

export const PAGE_TITLES: Record<number, string> = {
  0: TEXT.defaultPageTitle,
  1: TEXT.deliveryPageTitle,
  2: TEXT.deliveryPageTitle,
  3: TEXT.defaultPageTitle,
} as const;
