import { isNil } from 'lodash-es'

import { AddressTypes } from 'constants/address'
import { checkAddressType, getAddressByType, getAddressTypeId } from 'helpers/address'
import {
  AddressExtraFields,
  AddressMainFields,
  EmptyMainProperties,
  CommonAddressProperties,
  AllAddressFields,
  AddressSuggestionMapping,
  InstallationAddressProperties,
  SuggestionAddressProperties
} from '../constants/address'

// Filter extra fields
function processExtraFields (changedFields) {
  const changedEntries = Object.entries(changedFields).filter(([field]) => field in AddressExtraFields)
  const isExtraFieldsChanged = changedEntries.length > 0
  if (!isExtraFieldsChanged) {
    return {}
  }
  return Object.fromEntries(changedEntries)
}

// Get significant changed field and its value
// (e.g. if Region and City has changed simultaneusly and City value is not empty -> return City)
function getChangedField (changedFields) {
  const mainFieldsNames = Object.values(AddressMainFields)
  let fieldName = null
  let fieldValue = null
  for (const field of mainFieldsNames.reverse()) {
    if (field in changedFields) {
      const changedField = changedFields[field]
      fieldName = field
      // Address field is presented as string, then we need to check type of changed field for correct value
      fieldValue = typeof changedField === 'object' ? changedField?.value : changedField
      if (!isNil(fieldValue)) break
    }
  }
  return { fieldName, fieldValue }
}

// Get empty main address properties
function getEmptyMainProperties (addressType) {
  const emptyMainProperties = {
    ...EmptyMainProperties
  }

  // OrponId needed only for installation address
  if (addressType === AddressTypes.Installation) {
    emptyMainProperties[InstallationAddressProperties.OrponId] = null
  }
  return emptyMainProperties
}

export function filterSuggestionData (suggestionData) {
  const filteredEntries = Object.entries(suggestionData).filter(([key]) => key in SuggestionAddressProperties)
  return Object.fromEntries(filteredEntries)
}

function getPrecedingFieldName (fieldName) {
  const addressMainFields = Object.values(AddressMainFields)
  const precedingIndex = addressMainFields.indexOf(fieldName) - 1
  const precedingFieldName = precedingIndex > -1 ? addressMainFields[precedingIndex] : null
  return precedingFieldName
}

function getPrecedingFieldValue (state, fieldName, addressType) {
  const prevAddressItem = getAddressByType(state.orderState, addressType)
  const typedPropertyName = fieldName + 'WithType'
  if (typedPropertyName in prevAddressItem) {
    return prevAddressItem[typedPropertyName]
  }
  const mapping = AddressSuggestionMapping[fieldName]
  const values = mapping.Value.map(mappingValue => {
    if (typeof mappingValue === 'string') {
      return prevAddressItem?.hasOwnProperty(mappingValue) ? prevAddressItem[mappingValue] : null
    } else {
      for (const name of mappingValue) {
        return prevAddressItem?.hasOwnProperty(name) && !isNil(prevAddressItem[name]) ? prevAddressItem[name] : null
      }
    }
  })
  const filteredValues = values?.filter(val => !isNil(val))
  return filteredValues?.length > 0 ? filteredValues.join(' ') : null
}

function processMainFields (state, changedFields, addressType) {
  // Check if any main fields has changed
  const isMainFieldsChanged = Object.keys(changedFields).some(field => field in AddressMainFields)
  if (!isMainFieldsChanged) {
    return {}
  }

  // Get name and value of the changed field (Region/City/Street/House)
  let { fieldName, fieldValue } = getChangedField(changedFields)
  // if value is null/undefined, clear state using preceding suggestion data
  if (isNil(fieldValue)) {
    fieldName = getPrecedingFieldName(fieldName)
    fieldValue = fieldName ? getPrecedingFieldValue(state, fieldName, addressType) : null
  }

  // find value in suggestions data by form field value
  const addressSuggestionData = state.addressSuggestion[addressType]
  const suggestionItems = addressSuggestionData?.hasOwnProperty(fieldName) ? addressSuggestionData[fieldName] : null
  const suggestionData = suggestionItems?.find(
    item => item.Value === fieldValue || item.Key === fieldValue
  )?.SearchAccuracy

  // Combine empty address item with changes
  const mainFieldsChanges = {
    ...getEmptyMainProperties(addressType),
    [CommonAddressProperties.AddressTypeId]: [getAddressTypeId(addressType)]
  }
  if (suggestionData) {
    Object.assign(mainFieldsChanges, filterSuggestionData(suggestionData))
  }
  return mainFieldsChanges
}

// Process changes in address
export function processAddress (state, changedFields, addressType) {
  // Check if any address fields has changed
  // Only one address type can be changed at a time, because they are on different forms
  const prevAddressesProperty = state.orderState?.Address
  const isAddressChanged =
    addressType in changedFields &&
    Object.keys(changedFields[addressType]).some(fieldName => fieldName in AllAddressFields)
  if (!isAddressChanged) {
    return { Address: prevAddressesProperty }
  }

  const changedAddressFields = changedFields[addressType]

  // Process address fields and overwrite previous
  const mainFieldsChanges = processMainFields(state, changedAddressFields, addressType)
  const extraFieldsChanges = processExtraFields(changedAddressFields)

  // Combine previous address item with changes
  const previousAddressItem = getAddressByType(state.orderState, addressType)
  const newAddressItem = { ...previousAddressItem, ...mainFieldsChanges, ...extraFieldsChanges }

  // Filter out previos address item and replace with new one
  const addresses =
    prevAddressesProperty?.filter(addressItem => !checkAddressType(addressItem, getAddressTypeId(addressType))) ?? []
  addresses.push(newAddressItem)
  return { Address: addresses }
}
