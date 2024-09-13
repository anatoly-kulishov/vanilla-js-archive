import { CURRENCY, IImageProps } from '@/shared';

export const FILTER_TEXT: (keyof typeof CURRENCY | 'Все')[] = ['Все', 'RUB', 'USD', 'EUR'];

export const NOT_HAVE_CARDS: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
};

export const TEXT = {
  allCardsLabel: 'Все',
  debitCardsLabel: 'Дебетовая',
  creditCardsLabel: 'Кредитная',
  notHaveCards: 'На данный момент у Вас отсутствуют карточные продукты',
  openCard: 'Открыть карточный продукт',
};
