import type { IImageProps } from '@/shared';

export const TEXT = {
  title: 'На данный момент у вас отсутствуют кредитные заявки',
  btnText: 'Выбрать кредитный продукт',
} as const;

export const MESSAGE_ICON: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
};
