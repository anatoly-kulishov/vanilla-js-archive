import { useState, useCallback, useEffect } from 'react'
import { getFoundAddress } from 'webseller/helpers/daData'

const noErrorConfig = { type: 'any' }

const createErrorConfig = (errorMessage) => ({
  validator () {
    return Promise.reject(new Error(errorMessage))
  }
})

export const validateCitizenshipSearch = ({
  queryCitizenship,
  foundCitizenships
}) => {
  if (!queryCitizenship) {
    return createErrorConfig('Гражданство не введено')
  }

  const hasFoundCitizenships = foundCitizenships?.length > 0
  if (!hasFoundCitizenships) {
    return createErrorConfig('Гражданство не найдено')
  }
  const foundCitizenship = foundCitizenships.find((citizenship) => citizenship?.nameRu === queryCitizenship)
  if (!foundCitizenship) {
    return createErrorConfig('Выберите гражданство из списка')
  }

  return noErrorConfig
}

export const hasAllRequiredAddressFields = (foundAddress, isGeneratedFoundAddresses) => {
  const { Region, City, House, Locality, Stead } = foundAddress?.SearchAccuracy || {}
  const defaultRequiredFieldsCondition = (City || Locality) && (House || Stead)

  return isGeneratedFoundAddresses ? defaultRequiredFieldsCondition : defaultRequiredFieldsCondition && Region
}

export const validateAddressSearch = ({
  queryAddress,
  foundAddresses,
  isGeneratedFoundAddresses
}) => {
  if (!queryAddress) {
    return createErrorConfig('Адрес не введен')
  }

  const hasFoundAddresses = foundAddresses?.length > 0
  if (!hasFoundAddresses) {
    return createErrorConfig('Адрес не найден')
  }

  const foundAddress = getFoundAddress(queryAddress, foundAddresses)
  if (!foundAddress) {
    return createErrorConfig('Выберите адрес из списка')
  }

  const hasAllRequiredFields = hasAllRequiredAddressFields(foundAddress, isGeneratedFoundAddresses)
  if (!hasAllRequiredFields) {
    return createErrorConfig('Адрес введен не полностью')
  }

  return noErrorConfig
}

export const useSearchInputValidation = ({ form, fieldName, results, isLoading }) => {
  const [query, setQuery] = useState(() => form.getFieldValue(fieldName))

  useEffect(() => {
    if (query && results && !isLoading) {
      form?.validateFields([fieldName])
    }
  }, [query, isLoading, results])

  const onChangeQuery = useCallback((value) => {
    setQuery(value)
  }, [])

  return { query, onChangeQuery }
}
