import { FIRST_STEP_FIELDS } from 'webseller/constants/form'
import { createDateFromString } from 'webseller/helpers'
import { DateFormat } from 'webseller/constants'

export const prepareFormDataForSaleSim = (personalData) => ({
  [FIRST_STEP_FIELDS.LAST_NAME]: personalData.ClientInfo?.Surname,
  [FIRST_STEP_FIELDS.FIRST_NAME]: personalData.ClientInfo?.Name,
  [FIRST_STEP_FIELDS.MIDDLE_NAME]: personalData.ClientInfo?.Patronymic,
  [FIRST_STEP_FIELDS.SEX]: personalData.ClientInfo?.GenderId.toString(),
  [FIRST_STEP_FIELDS.BIRTH_DATE]: createDateFromString(personalData.ClientInfo?.BirthDate, DateFormat.VIEW_DATE),
  [FIRST_STEP_FIELDS.BIRTH_PLACE]: personalData.ClientInfo?.BirthPlace,
  [FIRST_STEP_FIELDS.DOCUMENT_NUMBER]: personalData.ClientIdentityCard?.Number,
  [FIRST_STEP_FIELDS.DOCUMENT_SERIES]: personalData.ClientIdentityCard?.Series,
  [FIRST_STEP_FIELDS.DOCUMENT_DATE]: createDateFromString(personalData.ClientIdentityCard?.IssuedDate, DateFormat.VIEW_DATE),
  [FIRST_STEP_FIELDS.DOCUMENT_CODE]: personalData.ClientIdentityCard?.IssuedCode,
  [FIRST_STEP_FIELDS.DOCUMENT_ADDRESS]: personalData.ClientIdentityCard?.IssuedBy
})
