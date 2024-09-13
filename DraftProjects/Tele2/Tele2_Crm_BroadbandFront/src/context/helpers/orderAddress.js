import { get } from 'lodash-es'
import { AddressProperties, AddressSuggestionMapping } from '../constants/address'

// Order address parsing helpers
function mapData (address, mappingData) {
  if (typeof mappingData === 'string') {
    const fieldName = mappingData
    return get(address, fieldName, null)
  } else {
    const fieldValues = []
    mappingData.forEach(name => {
      if (address.hasOwnProperty(name) && address[name]) {
        fieldValues.push(address[name])
      }
    })
    return fieldValues.length > 0 ? fieldValues.join(' ') : null
  }
}

/**
 * Filter property names that shouldn't exists in address suggestion of certain address part
 * (e.g. Street and House properties must be filtered in suggestion data for City field)
 * @param {string} addressPart Region/City/Street/House
 * @returns array of property names needed for current address part
 */
function prepareFilteredProperties (addressPart) {
  let filter
  switch (addressPart) {
    case 'Region':
      filter = ['City', 'Street', 'House', 'Building']
      break
    case 'City':
      filter = ['Street', 'House', 'Building']
      break
    case 'Street':
      filter = ['House', 'Building']
      break
    case 'Address':
      filter = ['Street', 'House', 'Building']
      break
    default:
      filter = []
  }

  const filteredProperties = []
  for (const property of Object.values(AddressProperties)) {
    if (!filter.some(filterProperty => property.includes(filterProperty))) {
      filteredProperties.push(property)
    }
  }
  return filteredProperties
}

function getSearchAccuracyData (address, addressPart) {
  const searchAccuracy = {}

  const filteredProperties = prepareFilteredProperties(addressPart)
  for (const fieldName of filteredProperties) {
    searchAccuracy[fieldName] = get(address, fieldName, null)
  }
  return searchAccuracy
}

function fillSuggestionAddressPart (address, addressPart, mappingKey, mappingValue) {
  const notNullAddressParts = mappingValue.filter(val => address.hasOwnProperty(val) && address[val])
  if (notNullAddressParts?.length > 0) {
    return [
      {
        Key: address.hasOwnProperty(mappingKey) ? address[mappingKey] : null,
        Value: mapData(address, mappingValue),
        SearchAccuracy: getSearchAccuracyData(address, addressPart)
      }
    ]
  } else {
    return null
  }
}

export function parseAddressToSuggestions (address) {
  if (!address) {
    return null
  }

  const suggestionItems = {}

  // address parts: Region, Address, City, Street, House
  for (const [addressPart, mappingData] of Object.entries(AddressSuggestionMapping)) {
    // Данные для addressPart == City могут приходить как в City, так и в Locality
    // Для это этого нужно мапить и City и Locality (ветка else)
    if (typeof mappingData.Key === 'string') {
      suggestionItems[addressPart] = fillSuggestionAddressPart(address, addressPart, mappingData.Key, mappingData.Value)
    } else {
      for (let ind = 0; ind < mappingData.Key.length; ind++) {
        suggestionItems[addressPart] = fillSuggestionAddressPart(
          address,
          addressPart,
          mappingData.Key[ind],
          mappingData.Value[ind]
        )
        if (suggestionItems[addressPart]) break
      }
    }
  }
  return suggestionItems
}
