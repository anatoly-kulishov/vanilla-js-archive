export const NOTHING_FOUND_OPTION = [{ label: 'Ничего не найдено', value: undefined }]

export const RUSSIAN_PASSPORT_ID = 1

export const RUSSIAN_FEDERATION = 'РОССИЯ'

export const RUSSIAN_FEDERATION_PASSPORT = 'Паспорт гражданина РФ'

export const FORM_IDS = {
  DOCUMENT_DATA_FORM: 1,
  MIGRATION_CONTACT_FORM: 2
}

export const FIRST_STEP_FIELDS = {
  SIGNATORY: 'Signatory',
  DOCUMENT_TYPE: 'DocumentType',
  DOCUMENT_NAME: 'DocumentName',
  LAST_NAME: 'Surname',
  FIRST_NAME: 'Name',
  MIDDLE_NAME: 'Patronymic',
  SEX: 'Gender',
  BIRTH_DATE: 'BirthDate',
  BIRTH_PLACE: 'BirthPlace',
  CITIZENSHIP: 'Сitizenship',
  CITIZENSHIP_ID: 'СitizenshipId',
  DOCUMENT_NUMBER: 'DocumentNumber',
  DOCUMENT_SERIES: 'DocumentSeries',
  DOCUMENT_DATE: 'IssueDate',
  DOCUMENT_CODE: 'DepartmentCode',
  DOCUMENT_ADDRESS: 'IssuedBy',
  REGISTRATION_ADDRESS: 'RegistrationAddress',
  CONTACT_NUMBER: 'ContactNumber',
  EMAIL: 'Email'
}

export const SECONDS_STEP_FIELDS = {
  APPROVED_STAYING_DOCUMENT: 'ApprovedStayingDocument',
  MIGRATION_CARD_NUMBER: 'Number',
  ARRIVING_DATE: 'DocumentStartDate',
  DEPARTURE_DATE: 'DocumentEndDate'
}

export const REGISTRATION_ADDRESS_FIELDS = {
  POST_INDEX: 'PostIndex',
  REGION: 'Region',
  CITY: 'City',
  STREET: 'Street',
  HOUSE: 'House',
  FLAT: 'Flat'
}

export const FORM_FIELDS = {
  ...FIRST_STEP_FIELDS,
  ...SECONDS_STEP_FIELDS,
  ...REGISTRATION_ADDRESS_FIELDS
}

export const ERROR_MESSAGE = {
  PATTERN: 'Недопустимое значение',
  MIN_LENGTH: 'Минимальное допустимое количество символов',
  MAX_LENGTH: 'Превышена допустимая длина',
  REQUIRED: 'Обязательный параметр',
  FIELD_RESTRICTIONS: 'Ограчения поля',
  INVALID_IDENTITY_DOCUMENT: 'Паспорт недействителен',
  INVALID_STAYING_DOCUMENT: 'Дата окончания действия документа меньше текущей даты'
}

export const MANUAL_REGISTRATION_ADDRESS_FIELDS_RULES = [
  {
    id: 1,
    nameRu: 'Индекс',
    nameEn: REGISTRATION_ADDRESS_FIELDS.POST_INDEX,
    isRequired: false,
    maxLength: 512
  },
  {
    id: 2,
    nameRu: 'Регион',
    nameEn: REGISTRATION_ADDRESS_FIELDS.REGION,
    isRequired: true,
    maxLength: 512
  },
  {
    id: 3,
    nameRu: 'Населенный пункт',
    nameEn: REGISTRATION_ADDRESS_FIELDS.CITY,
    isRequired: true,
    maxLength: 512
  },
  {
    id: 4,
    nameRu: 'Улица',
    nameEn: REGISTRATION_ADDRESS_FIELDS.STREET,
    isRequired: true,
    maxLength: 512
  },
  {
    id: 5,
    nameRu: 'Дом, корпус, строение',
    nameEn: REGISTRATION_ADDRESS_FIELDS.HOUSE,
    isRequired: true,
    maxLength: 512
  },
  {
    id: 6,
    nameRu: 'Квартира',
    nameEn: REGISTRATION_ADDRESS_FIELDS.FLAT,
    isRequired: false,
    maxLength: 512
  }
]
