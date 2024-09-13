export const CURRENCY_EXCHANGE = [
  { country: '(USD)', name: 'Доллар США', buy: 90.5, sale: 95.5, svg: 'usd' },
  { country: '(EUR)', name: 'Евро', buy: 97.5, sale: 102.5, svg: 'eur' },
  { country: '(RUB)', name: 'Белорусский рубль', buy: 12.9, sale: 13.5, svg: 'byn' },
  { country: '(CYN)', name: 'Китайский юань', buy: 90.5, sale: 95.5, svg: 'cny' },
] as const;

export const CURRENCY_CONVERTER = [
  { currency: 'EUR/USD', buy: 12.9, sale: 13.5, svg: 'byn' },
  { currency: 'EUR/BYN', buy: 12.9, sale: 13.5, svg: 'byn' },
  { currency: 'EUR/CYN', buy: 12.9, sale: 13.5, svg: 'byn' },
  { currency: 'USD/CYN', buy: 12.9, sale: 13.5, svg: 'byn' },
  { currency: 'EUR/USD', buy: 12.9, sale: 13.5, svg: 'byn' },
] as const;

export const RATE_ID: string = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee9';

export const RUBLE = {
  buy: 1,
  code: 'RUB',
  id: 1,
  name: 'Российский рубль',
  sale: 1,
  svg: 'rub',
};
