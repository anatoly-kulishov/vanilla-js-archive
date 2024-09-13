export const AddressTypes = {
  Installation: 'installationAddress',
  Registration: 'registrationAddress'
}

export const AddressTypeIds = {
  Installation: 10,
  Registration: 1
}

export const DadataSearchProperties = new Set([
  'name',
  'query',
  'region',
  'regionname',
  'area',
  'city',
  'cityname',
  'settlement',
  'street',
  'streetname',
  'streettype',
  'house',
  'housename',
  'searchtype',
  'locality',
  'localityname',
  'district',
  'districtname'
])

export const AddressTypeToIdMapping = {
  [AddressTypes.Installation]: AddressTypeIds.Installation,
  [AddressTypes.Registration]: AddressTypeIds.Registration
}
