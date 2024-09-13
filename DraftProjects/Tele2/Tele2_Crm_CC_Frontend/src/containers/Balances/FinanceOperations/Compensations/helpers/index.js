import { isNil } from 'lodash'

export const findCompensationPackageNameById = (availablePackages, id) => {
  const findedPackage = availablePackages.find(item => item.ServiceId === id)
  if (findedPackage) {
    const { ServiceName: packageName } = findedPackage
    return packageName
  }
  return null
}

export const formattedSum = sum => {
  if (!isNil(sum)) {
    return String(sum).includes('.')
      ? String(sum) + ' руб.'
      : String(sum) + ', 00 руб.'
  }
  return ''
}

export const numberWithSpaces = number => {
  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
}
