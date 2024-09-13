export const INS_BUTTON = 'Страхование';
export const BACK_BUTTON = 'Назад';
export const SEND_CALCULATE_BUTTON = 'Рассчитать';
export const GENERAL_INFO = 'Общие сведения';
export const ADD_DRIVER = 'Добавить водителя';

type PropertiesType = {
  [key: string]: string;
};

export interface DriverFrameProps {
  index: number;
}

export const CHECKBOX_TITLES: PropertiesType = {
  riskTheft: 'Страхование от угона',
  riskFire: 'Страхование от пожара',
  riskNature: 'Страхование от природных бедствий',
  securitySystem: 'Наличие охранной системы',
  risk: 'Наличие страховых случаев по домашнему имуществу',
  travelCancellation: 'Страхование на случай отмены поездки',
  baggage: 'Страхование багажа',
  riskWater: 'Страхование от аварий систем водоснабжения и канализации',
  riskOther: 'Страхование от внешних воздействий',
};

export const CHECKBOX_VALUES = ['riskTheft', 'riskFire', 'riskNature'];
export const CHECKBOX_HOME_CONTENTS_VALUES = ['securitySystem', 'risk'];
export const CHECKBOX_ABOARD_VALUES = ['travelCancellation', 'baggage'];
export const CHECKBOX_HOME_VALUES = ['riskFire', 'riskOther', 'riskWater', 'riskNature'];

export const TERM_MONTHS = [
  '1 месяц',
  '2 месяца',
  '3 месяца',
  '4 месяца',
  '5 месяцев',
  '6 месяцев',
  '7 месяцев',
  '8 месяцев',
  '9 месяцев',
  '10 месяцев',
  '11 месяцев',
  '12 месяцев',
];

export const ABOARD_COUNTRY_GROUP_VALUES = {
  СНГ: 'CIS',
  США: 'USA',
  'Шенгенская зона': 'schengenArea',
  Таиланд: 'Thailand',
  Индонезия: 'Indonesia',
  'Остальные страны': 'otherCountries',
};

export const SPORT_ACTIVITY_GROUP_VALUES = {
  'Не предполагается': 'notSupposed',
  'Активный отдых': 'outdoorActivity',
  'Экстремальный отдых': 'extreme',
  Альпинизм: 'alpinism',
};

export const ABOARD_COUNTRY_GROUP = {
  label: 'Страна поездки',
  options: Object.keys(ABOARD_COUNTRY_GROUP_VALUES),
};
export const SPORT_ACTIVITY_GROUP = {
  label: 'Предполагаемый активный отдых',
  options: Object.keys(SPORT_ACTIVITY_GROUP_VALUES),
};

export const INSURANCE_SUM_GROUP = {
  label: 'Страховая сумма полиса',
  options: ['20000', '50000', '70000', '100000'],
};
