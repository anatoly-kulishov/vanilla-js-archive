import { RADIO_INFO } from '@/widgets/insuranceEditOrder/constant';

type CurrenciesType = 'usd' | 'eur' | 'rub';

export const CURRENCIES: CurrenciesType[] = ['usd', 'eur'];

export const PROPERTIES: RADIO_INFO[] = [
  {
    name: 'baggage',
    title: 'Страхование багажа',
  },
  {
    name: 'travelCancellation',
    title: 'Отмена поездки',
  },
];

export const COUNTRY_GROUP = {
  label: 'Страна прибытия',
  options: ['СНГ', 'США', 'Шенгенская зона', 'Таиланд', 'Индонезия', 'Остальные страны'],
};

export const DURATION = {
  title: 'Дата поездки',
  type: 'DatePicker',
  maxMonths: 12,
};

export const ABOARD_COUNTRY_GROUP = {
  СНГ: 'CIS',
  США: 'USA',
  'Шенгенская зона': ' SCHENGEN_AREA',
  Таиланд: 'THAILAND',
  Индонезия: 'INDONESIA',
  'Остальные страны': 'OTHER_COUNTRIES',
};
export const SPORT_ACTIVITY_GROUP = {
  'Не предполагается': 'NOT_SUPPOSED',
  'Активный отдых': 'OUTDOOR_ACTIVITY',
  'Экстремальный отдых': 'EXTREME',
  Альпинизм: 'ALPINISM',
};
