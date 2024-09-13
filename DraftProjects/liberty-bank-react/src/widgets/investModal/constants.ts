import { IImageProps, PATH_PAGE } from '@/shared';

export const TEXT = {
  title: 'Вы действительно хотите закрыть счет?',
  no: 'Нет',
  yes: 'Да',
} as const;

export const ICON: IImageProps = {
  image: 'close-bill',
  width: '244',
  height: '200',
};

export const CHECKBOX_TEXT = [
  'Я подтверждаю, что ознакомлен с ',
  'Порядком закрытия брокерского счета',
  ' и ограничением открытия нового брокерского счета не ранее 48 часов с момента\n закрытия текущего счета ',
];

export const URL_LINK = PATH_PAGE.investmentDocuments;
