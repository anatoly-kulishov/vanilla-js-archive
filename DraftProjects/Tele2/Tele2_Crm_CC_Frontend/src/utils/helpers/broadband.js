export function prepareHouseValue (address) {
  return address?.BuildingName ? `${address?.HouseType} ${address?.HouseName} ${address?.BuildingType} ${address?.BuildingName}` : `${address?.HouseType} ${address?.HouseName}`
}

export function prepareHouseValueDadata (address) {
  return address?.Block ? `${address?.HouseType} ${address?.House} ${address?.BlockType} ${address?.Block}` : `${address?.HouseType} ${address?.House}`
}
