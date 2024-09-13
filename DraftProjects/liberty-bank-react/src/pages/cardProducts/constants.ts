import { CardsType } from '@/widgets';
import { CurrencyCode } from '@/shared';

export const FILTER_TEXT: (CurrencyCode | 'Все')[] = ['Все', 'RUB', 'USD', 'EUR'];

export const TEXT: { [key: string]: CardsType } = {
  allCardsLabel: 'Все',
  debitCardsLabel: 'Дебетовая',
  creditCardsLabel: 'Кредитная',
} as const;
