import { AddressTypeIds, AddressTypeToIdMapping } from 'constants/address'

export function checkAddressType (address, addressTypeId) {
  return !!address?.AddressTypeId?.some(id => id === addressTypeId)
}

export function getInstallationAddress (orderState) {
  return orderState.Address?.find(address => checkAddressType(address, AddressTypeIds.Installation))
}

export function getAddressTypeId (addressType) {
  return AddressTypeToIdMapping[addressType]
}

export function getAddressByType (orderState, addressType) {
  return orderState.Address?.find(address => checkAddressType(address, getAddressTypeId(addressType)))
}
