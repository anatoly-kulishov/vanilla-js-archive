export const getReasonId = (documentData) => {
  const { price, isTechFaulty, isTele2Selection, isB2G, isUIS, isNotLTE } = documentData

  if (isTechFaulty) {
    return 2069
  }
  if (isTele2Selection) {
    return 2068
  }
  if (isB2G) {
    return 2083
  }
  if (isUIS) {
    return 2325
  }
  if (isNotLTE) {
    return 2067
  }
  if (price !== 0) {
    return 171
  }
  return 0
}

export const renderReplaceSimStatus = (replaceAvailability) => {
  if (replaceAvailability?.isTele2Selection) {
    return 'Клиент Tele2Selection'
  }
  if (replaceAvailability?.isB2G) {
    return 'Клиент B2G'
  }
  if (replaceAvailability?.isUIS) {
    return 'Наличие в ЕИС'
  }
  if (replaceAvailability?.isNotLTE) {
    return 'Старая SIM-карта не поддерживает LTE'
  }
}

export const getAddressData = (addresses, fullAddress) =>
  addresses?.Data.DaData.find(foundAddress => fullAddress === foundAddress.SearchAccuracy.FullAddress) || {}
