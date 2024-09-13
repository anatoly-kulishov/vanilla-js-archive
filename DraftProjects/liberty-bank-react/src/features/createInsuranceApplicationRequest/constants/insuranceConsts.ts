import type { TSvgIconNames } from '@/shared';

export const PHONE_LABEL = 'Мобильный телефон';
export const EMAIL_LABEL = 'E-mail';
export const PASSPORT_LABEL = 'Серия и номер паспорта';
export const ID_LABEL = 'Номер документа';
export const REQUIRED_FIELD_ERROR = 'Это поле обязательно для заполнения';
export const INVALID_PHONE_ERROR = 'Неверный формат телефона';
export const INVALID_EMAIL_ERROR = 'Неверный формат электронной почты';
export const INVALID_PASSPORT_ERROR = 'Неверный формат паспорта';

export type CurrencyTypes = 'RUB' | 'USD' | 'EUR';

type CurrencyIconTypes = {
  [key in CurrencyTypes]: TSvgIconNames;
};

export const CURRENCY_ICONS: CurrencyIconTypes = {
  EUR: 'euro-small',
  USD: 'dollar-small',
  RUB: 'ruble-small',
};
