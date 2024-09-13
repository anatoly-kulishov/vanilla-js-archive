import { IImageProps } from '@/shared';

export const TEXT = {
  title: 'У вас есть не сохраненные настройки.',
  substring: 'При уходе с этой страницы они не сохраняться.',
  imageText: 'Вы уверены что хотите уйти?',
  no: 'Не сохранять',
  yes: 'Сохранить',
} as const;

export const ICON: IImageProps = {
  image: 'close-bill',
  width: '244',
  height: '200',
};
