import { ERROR_MESSAGE } from 'webseller/constants/form'
import { dateFormat } from 'screens/History/HistoryContext/constants'

export const getDocumentValidationRules = (fieldsRules, fieldName, additionalOptions) => {
  const dataField = fieldsRules?.find(field => field.nameEn === fieldName)

  if (!dataField) return []

  return [
    additionalOptions || { type: 'any' },
    { required: dataField?.isRequired, message: ERROR_MESSAGE.REQUIRED },
    dataField?.minLength ? { min: dataField.minLength, message: ERROR_MESSAGE.MIN_LENGTH } : { type: 'any' },
    dataField?.maxLength ? { max: dataField.maxLength, message: ERROR_MESSAGE.MAX_LENGTH } : { type: 'any' },
    dataField?.dataType && dataField.dataType !== dateFormat
      ? { pattern: dataField?.dataType, message: ERROR_MESSAGE.PATTERN }
      : { type: 'any' }
  ]
}

export const onMapApprovedStayingDocs = data => {
  return data?.map(doc => ({
    label: doc.name, // Название документа, подтверждающего права на пребывание в РФ
    value: doc.id // Идентификатор документа, подтверждающего права на пребывание в РФ
  }))
}

export const getRequiredFieldsMap = (fieldsRules) => fieldsRules?.reduce((fieldsAcc, field) => {
  fieldsAcc[field.nameEn] = field.isRequired
  return fieldsAcc
}, {}) || {}
