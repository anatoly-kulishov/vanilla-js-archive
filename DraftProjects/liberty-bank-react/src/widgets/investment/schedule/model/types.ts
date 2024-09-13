export type Candles = [number, string][] | [];

export type SearchCandlesParams = {
  'iss.only': string;
  'candles.columns': string;
  interval: Interval;
  from?: string;
  till?: string;
};

export type CandlesFilter = 'Д' | 'М' | 'Г';
export type SheduleSize = 'small' | 'big';

/* @
    1 - 1 минута
    10 - 10 минут
    60 - 1 час
    24 - 1 день
    7 - 1 неделя
    31 - 1 месяц
    4 - 1 квартал
*/
export type Interval = '1' | '10' | '60' | '24' | '7' | '31' | '4';
