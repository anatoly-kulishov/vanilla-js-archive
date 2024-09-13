import type { IImageProps } from '@/shared';

export const INFO_FRAME_TEXT = {
  title: 'История депозитов пуста',
  goToUserDeposits: 'Перейти в "Мои депозиты"',
  goToBankDeposits: 'Перейти в "Депозитные продукты"',
} as const;

export const MESSAGE_ICON: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
} as const;
