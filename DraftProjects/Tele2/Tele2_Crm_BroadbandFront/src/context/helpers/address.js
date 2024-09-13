import { get } from 'lodash-es'
import { checkAddressType, getAddressByType, getAddressTypeId } from 'helpers/address'
import { filterSuggestionData } from './stateAddress'
import { processAddressValue } from 'components/Broadband/helpers/address'

export function parseAddressData (addressData, addressTypeId, addressProperties) {
  const address = {}
  for (const propertyName of Object.values(addressProperties)) {
    address[propertyName] = get(addressData, propertyName, null)
  }
  address.AddressTypeId = [addressTypeId]
  return address
}

export function parseRecheckAddressToSuggestion (data, addressPart) {
  if (data?.length < 1) {
    return []
  }

  const searchAccuracy = data[0].SearchAccuracy

  if (addressPart === 'Address') {
    return [
      {
        Key: processAddressValue(searchAccuracy),
        Value: processAddressValue(searchAccuracy),
        SearchAccuracy: searchAccuracy
      }
    ]
  }

  return [
    {
      Key: get(searchAccuracy, addressPart + 'Id', data[0].Key),
      Value: get(searchAccuracy, addressPart + 'Name', data[0].Value),
      SearchAccuracy: searchAccuracy
    }
  ]
}

export function parseRecheckAddressToState (state, data, addressType) {
  const { DaData } = data
  if (DaData?.length < 1) {
    return state.orderState
  }

  const suggestionData = DaData[0].SearchAccuracy
  const prevAddressState = getAddressByType(state.orderState, addressType)
  const newAddressState = {
    ...prevAddressState,
    ...filterSuggestionData(suggestionData),
    OrponId: null
  }

  const addresses =
    state.orderState.Address?.filter(addressItem => !checkAddressType(addressItem, getAddressTypeId(addressType))) ?? []
  addresses.push(newAddressState)

  const orderState = { ...state.orderState, Address: addresses }
  return orderState
}
