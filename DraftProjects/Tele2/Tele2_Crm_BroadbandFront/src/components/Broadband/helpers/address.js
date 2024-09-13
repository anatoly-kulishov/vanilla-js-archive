import { isNil } from 'lodash-es'

import { DadataSearchProperties } from 'constants/address'
import { AddressMainFields } from 'context/constants/address'
import { prepareHouseValueDadata, processEmptyData, processHouse } from './broadband'

export const getStreetLabel = (value, localityWithType, districtWithType) => {
  if (districtWithType && !localityWithType) {
    return value + ' | ' + districtWithType
  } else if (localityWithType) {
    return value + ' | ' + localityWithType
  } else {
    return value
  }
}

export function compareAddressSuggestion (item, formValue) {
  return (
    item.Key === formValue || item.Value === formValue || prepareHouseValueDadata(item?.SearchAccuracy) === formValue
  )
}

export function isAddressEmpty (address) {
  if (!address) {
    return true
  } else {
    return Object.values(address).filter(value => !isNil(value))?.length < 1
  }
}

/**
 * Clear less significant fields if superior field has changed
 * (e.g. if Region field has changed, clear City, Street and House fields)
 * @param {object} form antd form instance
 * @param {object} changedFields changed form fields
 */
export function clearAddressFieldsOnChange (form, changedFields, addressType) {
  const addressChanges = addressType in changedFields && changedFields[addressType]
  if (!addressChanges) return
  if ('Region' in addressChanges) {
    const fieldNames = ['Address', 'City', 'Street', 'House', 'FlatName']
    form.resetFields(fieldNames.map(name => [addressType, name]))
  }
  if ('City' in addressChanges) {
    const fieldNames = ['Street', 'House', 'FlatName']
    form.resetFields(fieldNames.map(name => [addressType, name]))
  }
  if ('Street' in addressChanges) {
    const fieldNames = ['House', 'FlatName']
    form.resetFields(fieldNames.map(name => [addressType, name]))
  }
  if ('House' in addressChanges) {
    const fieldNames = ['FlatName']
    form.resetFields(fieldNames.map(name => [addressType, name]))
  }
  if ('Address' in addressChanges) {
    const fieldNames = ['FlatName']
    form.resetFields(fieldNames.map(name => [addressType, name]))
  }
}

export function processAddressValue (address) {
  return processEmptyData([
    address?.DistrictType,
    address?.DistrictName,
    address?.CityType,
    address?.CityName,
    address?.LocalityType,
    address?.LocalityName,
    address?.StreetType,
    address?.StreetName,
    processHouse(address)
  ])
}

function findSuggestion (item, formValue) {
  if (item?.Key === formValue || item?.Value === formValue) {
    return true
  } else {
    for (const property of [item?.Key, item?.Value]) {
      const splittedValue = property?.split(' ')
      if (splittedValue?.length > 1) {
        return splittedValue[1] === formValue
      }
    }
  }
  return false
}

export function getSearchFunction (form, getAddressSuggestion, addressType, onSearchMade) {
  return (suggestionData, searchText, searchType) => {
    const searchParams = { query: searchText, searchType: searchType }
    const suggestionItems = suggestionData[addressType]
    const searchLengthLimit = searchType === 'House' ? 1 : 3

    const addressSearchTypes = Object.values(AddressMainFields)
    let previousTypeIndex = addressSearchTypes.indexOf(searchType) - 1
    let formValue = form.getFieldValue([addressType, addressSearchTypes[previousTypeIndex]])?.value
    while (!formValue && previousTypeIndex >= 0) {
      previousTypeIndex -= 1
      formValue = form.getFieldValue([addressType, addressSearchTypes[previousTypeIndex]])?.value
    }

    const previousSearchType = addressSearchTypes[previousTypeIndex]
    if (previousSearchType && previousSearchType in suggestionItems) {
      let suggestion = null
      if (suggestionItems[previousSearchType]?.length > 1) {
        suggestion = suggestionItems[previousSearchType]?.find(item => findSuggestion(item, formValue))?.SearchAccuracy
      } else if (suggestionItems[previousSearchType]?.length === 1) {
        suggestion = suggestionItems[previousSearchType][0]?.SearchAccuracy
      }

      if (!suggestion || searchText.length < searchLengthLimit) return
      const searchProperties = Object.fromEntries(
        Object.entries(suggestion)
          .filter(([key, value]) => !isNil(value) && DadataSearchProperties.has(key.toLowerCase()))
          .map(([key, value]) =>
            key.toLowerCase().includes('name') ? [key.replace(/Name/i, ''), value] : [key, value]
          )
      ) // TODO заплакать

      Object.assign(searchParams, searchProperties)
    }

    getAddressSuggestion({ searchParams, addressType })
    if (onSearchMade) {
      onSearchMade(true)
    }
  }
}

export function concatAndTrimStrings (strings, separator = ' ') {
  return strings
    ?.filter(item => !!item)
    ?.map(item => item?.trim())
    .join(separator)
}

export class EmptyFieldError extends Error {
  constructor (message) {
    super(message)
    this.name = 'EmptyFieldError'
  }
}

export function checkFields (form, fields) {
  const fieldsValues = Object.values(form.getFieldsValue(fields))
  fieldsValues.forEach(value => {
    if (!value) {
      throw new EmptyFieldError()
    }
  })
}
