import { formatMonth } from '@/shared/lib/formatMonth';

export const HC_PRODUCT_ID = 9;

export const HC_BACK_BTN = 'Назад';
export const HC_TITLE = 'Заявка на страхование домашнего имущества';

export const HC_MONTHS = Array.from({ length: 120 }, (_, month) => formatMonth(month));

export const TERM_YEARS = [
  '1 год',
  '2 года',
  '3 года',
  '4 года',
  '5 лет',
  '6 лет',
  '7 лет',
  '8 лет',
  '9 лет',
  '10 лет',
];

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

export const HC_CURRENCIES = {
  rub: 'RUB',
  usd: 'USD',
  eur: 'EUR',
};

export const HC_CURRENCIES_CODES = {
  RUB: 643,
  USD: 840,
  EUR: 978,
};

export const HC_CONTRACT = {
  title: 'Данные договора',
  chooseCurrency: 'Выберите валюту',
  insuranceTerm: 'Срок страхования (укажите в месяцах)',
  startDate: 'Дата начала действия',
};

export const HC_CLIENT = {
  title: 'Данные клиента',
  dateOfBirth: 'Дата рождения',
  documentType: 'Тип документа',
  dateOfIssue: 'Дата выдачи',
  validityTerm: 'Срок действия',
};

export const HC_LOCATION = {
  title: 'Информация о местонахождении объекта страхования',
  addressTitle: 'Введите адрес нахождения объекта страхования',
  city: 'Город',
  house: 'Дом',
  floorsNum: 'Этажность дома',
  street: 'Улица',
  apartment: 'Квартира',
  entrance: 'Подъезд',
  alarmTitle: 'Наличие охранных средств',
  alarmTrue: 'Да',
  alarmFalse: 'Нет',
  buildingMaterial: 'Материал постройки',
};

export const HC_BUILDING_MATERIAL = {
  'Керамические блоки': 'CERAMIC_BLOCK',
  Бетон: 'CONCRETE',
  Кирпич: 'BRICK',
  'Железобетонные плиты': 'REINFORCED_CONCRETE_SLAB',
  'Керамзитобетонные панели': 'EXPANDED_CLAY_CONCRETE_PANEL',
  'Пено- и газобетонные блоки': 'FOAM_AERATED_CONCRETE_BLOCK',
  'Бревно и брус': 'TIMBER',
  'Деревянный каркас': 'WOODEN_FRAME',
};

export const HC_PROPERTY = {
  title: 'Информация об имуществе',
  objectName: 'Объект страхования',
  price: 'Оценочная стоимость объекта',
  type: 'Тип имущества',
  documentsTitle: 'При сумме страхования более 30 000 $',
};

export const HC_DROPZONE_SUBLABEL = 'Файлы jpg, png, pdf не более 5 МБ';

export const PASSPORT_RUS = 'Паспорт РФ';
export const RESIDENT_CARD = 'Вид на жительство';
export const REFUGEE_CERTIFICATE = 'Удостоверение беженца';
export const HC_DOCUMENT_TYPE = [PASSPORT_RUS, RESIDENT_CARD, REFUGEE_CERTIFICATE];

export const HC_APPLICATION = {
  title: 'Заявка на страхование домашнего имущества',
};

export const HC_FORM_BACK = 'Назад';

export const HC_FORM_APPEND = 'Добавить объект';

export const HC_FORM_APPEND_PERSON = 'Добавить попутчика';

export const HC_FORM_NEXT = 'Далее';

export const HC_FORM_SUBMIT = 'Оформить заявку';

export const HC_TYPE_OF_PROPERTY = {
  Мебель: 'FURNITURE',
  'Бытовая электроника': 'HOUSEHOLD_APPLIANCES',
  Электроника: 'ELECTRONIC',
  Одежда: 'CLOTH',
  'Спортивное оборудование': 'SPORT_EQUIPMENT',
  'Детские игрушки, вещи': 'CHILDREN_THING_TOY',
  Декор: 'INTERIOR_ACCESSORIES',
};

export const HC_ADDRESS = {
  title: 'Адрес регистрации',
};

export const HC_DURATION = {
  startDate: 'Начало',
  endDate: 'Завершение',
  showInputLabel: 'Срок страхования',
};

export const HC_APARTAMETS = {
  title: 'Общие данные о квартире',
};

export const HC_HOME = {
  title: 'Общие данные о доме',
  subtitle: 'Адрес строения',
  buildingArea: 'Площадь строения',
  actualCost: 'Действительная стоимость',
  insuranceAmount: 'Страховая сумма',
  insuranceSum: 'Стоимость страхования',
};

export const DOCUMENTS_TITLE = 'Загрузка документов';

export const RESULT_TITLE = 'Результат';
