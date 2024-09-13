import { IQuestionnaireListInfo, IQuestionnaireListQuestion, TFooterBtn } from './constants.types';

export const USER_ID: string = '033140e9-ea0a-40c3-a738-060283531147';
export const QUESTIONNAIRE_TITLE: string = 'Анкета физического лица';

export const QUESTIONNAIRE_LIST_ITEMS_INFO: IQuestionnaireListInfo[] = [
  {
    id: 1,
    title: 'Фамилия',
    tag: ['lastName'],
  },
  {
    id: 2,
    title: 'Имя',
    tag: ['firstName'],
  },
  {
    id: 3,
    title: 'Отчество',
    tag: ['middleName'],
  },
  {
    id: 4,
    title: 'Дата рождения',
    tag: ['birthDate'],
  },
  {
    id: 5,
    title: 'Гражданство',
    tag: ['citizenship'],
  },
  {
    id: 6,
    title: 'Серия и номер паспорта',
    tag: ['series', 'number'],
  },
  {
    id: 7,
    title: 'Кем выдан',
    tag: ['issuedBy', 'departmentCode'],
  },
  {
    id: 8,
    title: 'Дата выдачи',
    tag: ['dateOfIssue'],
  },
  {
    id: 9,
    title: 'Адрес по месту регистрации',
    tag: ['region', 'location', 'street', 'houseNumber', 'apartmentNumber'],
  },
  {
    id: 10,
    title: 'ИНН',
    tag: ['inn'],
  },
  {
    id: 11,
    title: 'Мобильный телефон',
    tag: ['mobilePhone'],
  },
  {
    id: 12,
    title: 'E-mail',
    tag: ['email'],
  },
];

export const QUESTIONNAIRE_LIST_ITEMS_QUESTION: IQuestionnaireListQuestion[] = [
  { id: 1, title: 'Вы являетесь налоговым резидентом РФ?', tag: 'residence' },
  { id: 2, title: 'У вас есть представитель?', tag: 'representative' },
  { id: 3, title: 'У Вас есть бенефициарный владелец?', tag: 'beneficialOwner' },
  { id: 4, title: 'Вы платите налоги за рубежом?', tag: 'abroadTax' },
  { id: 5, title: 'У вас есть выгодоприобретатель?', tag: 'beneficiary' },
];

export const FOOTER_BTN_TEXT: TFooterBtn = {
  back: 'Назад',
  accept: 'Все верно',
};
