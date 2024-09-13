import type { IImageProps } from '@/shared';

export const INFO_FRAME_TEXT = {
  noRepaidCreditsTitle: 'На данный момент у вас нет ни одного погашенного кредита',
  noIssuedCreditsTitle: 'На данный момент у Вас отсутствуют оформленные кредиты',
  goToUserCredits: 'Перейти в «Мои кредиты',
  goToBankCredits: 'Выбрать кредитный продукт',
} as const;

export const MESSAGE_ICON: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
} as const;
