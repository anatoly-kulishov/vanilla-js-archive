import { joinToString } from './index'

export const getCityWithLocality = ({ address, withType }) => {
  const requiredFields = [
    { mainKey: 'City', typeKey: 'CityType' },
    { mainKey: 'Locality', typeKey: 'LocalityType' }
  ]

  return joinAddressFields({ requiredFields, address, withType })
}

export const getRegionWithDistrict = ({ address, withType }) => {
  const requiredFields = [
    { mainKey: 'Region', typeKey: 'RegionType' },
    { mainKey: 'District', typeKey: 'DistrictType' }
  ]

  return joinAddressFields({ requiredFields, address, withType })
}

export const joinAddressFields = ({ requiredFields, address, withType = true }) => {
  const addressFields = requiredFields.map(({ mainKey, typeKey }) => {
    const mainValue = address[mainKey]
    const typeValue = address[typeKey]

    return withType ? joinToString([typeValue, mainValue], ' ') : mainValue
  })

  return joinToString(addressFields, ', ')
}

export const getHouseOrStead = ({ address, withType }) => {
  const keys = {
    mainKey: 'House',
    mainKeyType: 'HouseType',
    fallbackKey: 'Stead',
    fallbackKeyType: 'SteadType'
  }

  return getAddressFieldWithFallback({ keys, address, withType })
}

export const getStreetOrLocality = ({ address, withType }) => {
  const keys = {
    mainKey: 'Street',
    mainKeyType: 'StreetType',
    fallbackKey: 'Locality',
    fallbackKeyType: 'LocalityType'
  }

  return getAddressFieldWithFallback({ keys, address, withType })
}

const getAddressFieldWithFallback = ({ keys, address, withType }) => {
  const { mainKey, mainKeyType, fallbackKey, fallbackKeyType } = keys

  const mainValue = address[mainKey]
  const mainValueType = address[mainKeyType]
  const fallbackValue = address[fallbackKey]
  const fallbackValueType = address[fallbackKeyType]

  const main = withType ? joinToString([mainValueType, mainValue]) : mainValue
  const fallback = withType ? joinToString([fallbackValueType, fallbackValue]) : fallbackValue

  return mainValue || fallbackValue ? main || fallback : undefined
}

export const getFoundAddressesFromDaData = (foundAddresses) => foundAddresses?.Data?.DaData

export const getFoundAddress = (queryAddress, foundAddresses) => foundAddresses.find((address) => address.SearchAccuracy?.FullAddress === queryAddress)

export const getManualQueryAddress = (foundAddresses) => (getFoundAddressesFromDaData(foundAddresses) || [])[0]?.SearchAccuracy?.FullAddress

export const getFullAddress = (addressData) => Object.values(addressData).filter(Boolean).join(', ')

export const getMockDaDataResponse = (addressData) => ({
  Data: {
    DaData: [
      {
        SearchAccuracy: {
          ...addressData,
          FullAddress: getFullAddress(addressData)
        }
      }
    ]
  }
})
