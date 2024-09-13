// Form field names needed for the `CheckAddress` request
export const AddressMainFields = {
  Region: 'Region',
  Address: 'Address',
  City: 'City',
  Street: 'Street',
  House: 'House'
}

// Additional form field names
export const AddressExtraFields = {
  FlatName: 'FlatName',
  Entrance: 'Entrance',
  Floor: 'Floor',
  Intercom: 'Intercom',
  Comment: 'Comment'
}

export const AllAddressFields = { ...AddressMainFields, ...AddressExtraFields }

/**
 * Properties names for request/response objects
 */
const AddressExtraProperties = AddressExtraFields // Same names
// Properties from `GetAddressSuggestion` needed for `PerformOrder` request
export const AddressProperties = {
  FullAddress: 'FullAddress',
  ShortAddress: 'ShortAddress',
  DistrictName: 'DistrictName',
  DistrictId: 'DistrictId',
  DistrictType: 'DistrictType',
  LocalityName: 'LocalityName',
  LocalityId: 'LocalityId',
  LocalityType: 'LocalityType',
  PostIndex: 'PostIndex',
  RegionCode: 'RegionCode',
  RegionName: 'RegionName',
  RegionId: 'RegionId',
  RegionType: 'RegionType',
  CityName: 'CityName',
  CityId: 'CityId',
  CityType: 'CityType',
  StreetName: 'StreetName',
  StreetId: 'StreetId',
  StreetType: 'StreetType',
  HouseName: 'HouseName',
  HouseId: 'HouseId',
  HouseType: 'HouseType',
  BuildingType: 'BuildingType',
  BuildingName: 'BuildingName'
}

export const SuggestionAddressProperties = { ...AddressProperties, Block: 'Block' }

// Properties appear in both types of addresses
export const CommonAddressProperties = {
  AddressTypeId: 'AddressTypeId'
}

export const InstallationAddressProperties = {
  ...CommonAddressProperties,
  ...SuggestionAddressProperties,
  ...AddressExtraProperties,
  ...{ OrponId: 'OrponId' }
}
export const RegistrationAddressProperties = {
  ...CommonAddressProperties,
  ...AddressProperties,
  ...{ FlatName: 'FlatName' }
}

export const AddressSuggestionMapping = {
  Region: {
    Key: AddressProperties.RegionId,
    Value: [AddressProperties.RegionType, AddressProperties.RegionName]
  },
  City: {
    Key: [AddressProperties.CityId, AddressProperties.LocalityId],
    Value: [
      [AddressProperties.CityType, AddressProperties.CityName],
      [AddressProperties.LocalityType, AddressProperties.LocalityName]
    ]
  },
  Street: {
    Key: AddressProperties.StreetId,
    Value: [AddressProperties.StreetType, AddressProperties.StreetName]
  },
  House: {
    Key: AddressProperties.HouseId,
    Value: [AddressProperties.HouseName]
  },
  Address: {
    Key: AddressProperties.FullAddress,
    Value: [
      AddressProperties.DistrictType,
      AddressProperties.DistrictName,
      AddressProperties.CityType,
      AddressProperties.CityName,
      AddressProperties.LocalityType,
      AddressProperties.LocalityName,
      AddressProperties.StreetType,
      AddressProperties.StreetName,
      AddressProperties.HouseType,
      AddressProperties.HouseName,
      AddressProperties.BuildingType,
      AddressProperties.BuildingName
    ]
  }
}

// Properties from main address fields with null value
export const EmptyMainProperties = Object.fromEntries(Object.values(AddressProperties).map(field => [field, null]))
export const EmptyRegistrationProperties = Object.fromEntries(
  Object.values(RegistrationAddressProperties).map(field => [field, null])
)
