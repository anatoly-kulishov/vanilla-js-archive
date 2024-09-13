import { CurrencyCode } from '@/shared';
import { createInputPlaceholder } from './utils';

export type TextDepositPurpose = 'Любая' | 'Для накопления' | 'Для расчёта';
export type TextCreditPurpose =
  | 'Любая'
  | 'Покупка недвижимости'
  | 'Покупка авто'
  | 'Покупка товара';

export const currency: CurrencyCode[] = ['RUB', 'USD', 'EUR'];
export const depositPurpose: TextDepositPurpose[] = ['Любая', 'Для накопления', 'Для расчёта'];
export const creditPurpose: TextCreditPurpose[] = [
  'Любая',
  'Покупка недвижимости',
  'Покупка авто',
  'Покупка товара',
];

export const TEXT_FILTER = {
  creditAmount: 'Сумма кредита',
  depositAmount: 'Сумма депозита',
  creditTerm: 'Срок кредита',
  depositTerm: 'Срок депозита',
  months: 'мес.',
  buttonApplied: 'Применить',
} as const;

export const CREDIT_MIN_TERM = 12;
export const CREDIT_MAX_TERM = 240;
export const DEPOSIT_MIN_TERM = 1;
export const DEPOSIT_MAX_TERM = 60;

export const TERM_PLACEHOLDER = {
  credit: createInputPlaceholder(CREDIT_MIN_TERM, CREDIT_MAX_TERM),
  deposit: createInputPlaceholder(DEPOSIT_MIN_TERM, DEPOSIT_MAX_TERM),
} as const;

export const AMOUNT_MIN_VALUE = {
  credit: {
    RUB: 50_000,
    EUR: 3_000,
    USD: 3_000,
  },
  deposit: {
    RUB: 1_000,
    EUR: 3_000,
    USD: 3_000,
  },
} as const;

export const AMOUNT_MAX_VALUE = {
  credit: {
    RUB: 500_000_000,
    EUR: 100_000,
    USD: 100_000,
  },
  deposit: {
    RUB: 10_000_000,
    EUR: 1_000_000,
    USD: 1_000_000,
  },
} as const;

export const AMOUNT_PLACEHOLDER = {
  credit: {
    RUB: createInputPlaceholder(AMOUNT_MIN_VALUE.credit.RUB, AMOUNT_MAX_VALUE.credit.RUB),
    EUR: createInputPlaceholder(AMOUNT_MIN_VALUE.credit.EUR, AMOUNT_MAX_VALUE.credit.EUR),
    USD: createInputPlaceholder(AMOUNT_MIN_VALUE.credit.USD, AMOUNT_MAX_VALUE.credit.USD),
  },
  deposit: {
    RUB: createInputPlaceholder(AMOUNT_MIN_VALUE.deposit.RUB, AMOUNT_MAX_VALUE.deposit.RUB),
    EUR: createInputPlaceholder(AMOUNT_MIN_VALUE.deposit.EUR, AMOUNT_MAX_VALUE.deposit.EUR),
    USD: createInputPlaceholder(AMOUNT_MIN_VALUE.deposit.USD, AMOUNT_MAX_VALUE.deposit.USD),
  },
} as const;
