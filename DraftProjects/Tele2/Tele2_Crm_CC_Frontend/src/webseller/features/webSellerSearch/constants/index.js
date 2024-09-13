import {
  DOCUMENT_NUMBER_REGEXP,
  ICC_MASK_REGEXP,
  INN_REGEXP, OGRN_REGEXP,
  PERSONAL_ACCOUNT_NAME_REGEXP,
  PHONE_WITH_MASK_REGEXP,
  SUPERVISOR_DOCUMENT_NUMBER_REGEXP
} from 'webseller/constants/regexp'

export const WebSellerSearchMainTabsKeys = {
  MSISDN: 'Msisdn',
  LOCAL_PHONE_NUMBER: 'LocalPhoneNumber',
  ICC: 'Icc',
  PERSONAL_ACCOUNT_NAME: 'PersonalAccountName'
}

export const WebSellerSearchMainTabsName = {
  MSISDN: 'MSISDN',
  LOCAL_PHONE_NUMBER: 'Городской номер',
  ICC: 'ICC',
  PERSONAL_ACCOUNT_NAME: 'Лицевой счет'
}

export const WebSellerSearchSubTabsKeys = {
  DOCUMENT_NUMBER: 'DocumentNumber',
  INN: 'Inn',
  CLIENT_NAME: 'ClientName',
  OGRN: 'Ogrn',
  MANAGER_IDENTITY_DOCUMENT: 'ManagerIdentityDocument'
}

export const WebSellerSearchSubTabsName = {
  DOCUMENT_NUMBER: 'Номер документа',
  INN: 'ИНН',
  CLIENT_NAME: 'Название компании',
  OGRN: 'ОГРН',
  MANAGER_IDENTITY_DOCUMENT: 'Номер документа руководителя'
}

export const FORM_ITEM_RULES = {
  FORM_ITEM_REQUIRED: { required: true, message: 'Обязательный параметр' },
  PHONE_MASK: { pattern: PHONE_WITH_MASK_REGEXP, message: 'Введите корректный номер' },
  ICC_MASK: { pattern: ICC_MASK_REGEXP, message: 'Длина данного поля 20 символов (Допустимы только цифры)' },
  PERSONAL_ACCOUNT_NAME_MASK: { pattern: PERSONAL_ACCOUNT_NAME_REGEXP, message: 'Длина данного поля 10 символов' },
  DOCUMENT_NUMBER_MASK: { pattern: DOCUMENT_NUMBER_REGEXP, message: 'Длина данного поля от 5 до 12 символов (Допустимы только цифры)' },
  INN_MASK: { pattern: INN_REGEXP, message: 'Длина данного поля от 10 до 12 символов (Допустимы только цифры)' },
  CLIENT_NAME_MASK: { min: 2, message: 'Длина данного поля от 2 до 50 символов' },
  OGRN_MASK: { pattern: OGRN_REGEXP, message: 'Длина данного поля от 13 или 15 символов (Допустимы только цифры)' },
  SUPERVISOR_DOCUMENT_NUMBER_MASK: { pattern: SUPERVISOR_DOCUMENT_NUMBER_REGEXP, message: 'Длина данного поля от 5 или 12 символов (Допустимы только цифры)' }
}

export const SEARCH_MODALS_MAP = {
  NONE: 'NONE',
  INFO: 'INFO',
  MESSAGE_WITH_ACTION: 'MESSAGE_WITH_ACTION',
  MESSAGE_WITHOUT_ACTION: 'MESSAGE_WITHOUT_ACTION'
}
