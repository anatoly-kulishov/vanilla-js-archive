import type { IImageProps } from '@/shared';

export const CREDIT_PRODUCT_LIST_TEXT = {
  noData: 'Отсутствуют кредитные продукты по выбранным фильтрам',
  title: 'Кредиты',
} as const;

export const noDataIcon: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
} as const;
