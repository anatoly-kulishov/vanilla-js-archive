import * as moment from 'moment'

import {
  SEARCH_FORM_DATA,
  SEARCH_PARAMS,
  SEARCH_PARAMS_NAME,
  SESSION_PARAMS_NAME
} from 'webseller/constants/searchParams'
import { CLIENT_ENVIRONMENTS, IDENTIFICATION_LEVELS, TYPE_CARDS } from 'webseller/constants/clientCategory'
import { clientCategories } from 'constants/personalAccountStrings'

// TODO нужен более надежный способ определения (переменная окружения)
export const isWebSellerApp = () => window.origin.includes('webseller') || window.origin.includes('localhost')

export const checkRightWithOperations = ({ permissionName, operationName, permissions = [] }) => {
  const foundPermissions = permissions.filter((permission) => permission.startsWith(permissionName))

  if (foundPermissions.length === 0) {
    return false
  }

  const operations = foundPermissions.map((permission) => permission.split(':')[1])

  return operations.some((operation) => {
    const idx = operation?.search(operationName)

    return idx > -1
  })
}

export const normalizeNumber = (phoneNumber, { isNeedToSliceFirstDigit, fallback } = {}) => {
  if (typeof phoneNumber !== 'string') {
    return fallback
  }

  const normalized = phoneNumber.match(/\d+/g)?.join('') || ''

  if (normalized.length === 0) {
    return fallback
  }

  return isNeedToSliceFirstDigit ? normalized.slice(1) : normalized
}

export const denormalizeNumber = number => number?.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5')

export const MimeTypes = {
  PNG: 'image/png',
  JPG: 'image/jpeg',
  PDF: 'application/pdf',
  TIFF: 'image/tiff'
}

export const acceptableUploadFormats = Object.values(MimeTypes).join()

export const convertBase64ToBlob = (base64String, mimeType) => `data:${mimeType};base64,${base64String}`

export const downloadFile = (url, fileName, target = '_self') => {
  const link = document.createElement('a')
  link.setAttribute('download', fileName)
  link.href = url
  link.target = target
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.substr(reader.result.indexOf(',') + 1))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

export const joinToString = (parts, divider = ' ') => parts.filter(Boolean).join(divider).trim() || undefined

export const createDateFromString = (dateString, format = undefined, fallback = undefined) => {
  const date = moment(dateString, format)

  return date.isValid() ? date : fallback
}

export const createStringFromDate = (date, format = 'YYYY-MM-DD') => (date ? moment(date).format(format) : undefined)

export const OperationStatus = {
  NONE: 'NONE',
  SUCCESSFUL: 'SUCCESSFUL',
  PARTIALLY_SUCCESSFUL: 'PARTIALLY_SUCCESSFUL',
  FAILURE: 'FAILURE'
}

export const clearAllSessionParams = () => {
  window.sessionStorage.removeItem(SEARCH_PARAMS_NAME)
  window.sessionStorage.removeItem(SESSION_PARAMS_NAME)
  window.sessionStorage.removeItem(SEARCH_FORM_DATA)
}

export const replaceSumToText = (balanceAmount, maxSum = 500) => {
  const fixedAmount = Number(balanceAmount)?.toFixed(2)
  return (balanceAmount > maxSum) ? `Более ${maxSum} рублей` : fixedAmount
}

export const getTypeCard = (isASSeller) => {
  const searchParams = JSON.parse(window.sessionStorage.getItem(SEARCH_PARAMS_NAME))

  const identificationLevel = +searchParams?.[SEARCH_PARAMS.IDENTIFICATION_LEVEL]
  const typeCard = searchParams?.[SEARCH_PARAMS.TYPE_CARD]

  const isPersonalAccountCard = isASSeller && typeCard === TYPE_CARDS.PERSONAL_ACCOUNT_CARD
  const isNonSubscriberCard = isASSeller && typeCard === TYPE_CARDS.NON_SUBSCRIBER_CARD
  const isSubscriberCard = isASSeller && typeCard === TYPE_CARDS.SUBSCRIBER_CARD
  const isAnonymousCard = isASSeller && typeCard === TYPE_CARDS.ANONYMOUS_CARD
  const isLimitedCard = isASSeller && typeCard === TYPE_CARDS.LIMITED_CARD

  const isSubscriberFirstLevelCard = isSubscriberCard && identificationLevel === IDENTIFICATION_LEVELS.ONE
  const isSubscriberSecondLevelCard = isSubscriberCard && identificationLevel === IDENTIFICATION_LEVELS.TWO

  const isClientCategory = isASSeller && searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY]
  const isb2c = isASSeller && searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY] === clientCategories.B2C
  const isb2b = isASSeller && searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY] === clientCategories.B2B
  const isUnionEnv = isASSeller && searchParams?.[SEARCH_PARAMS.ENVIROMENT] === CLIENT_ENVIRONMENTS.UNION

  return {
    isPersonalAccountCard,
    isNonSubscriberCard,
    isSubscriberCard,
    isAnonymousCard,
    isLimitedCard,
    isSubscriberFirstLevelCard,
    isSubscriberSecondLevelCard,
    isUnionEnv,
    typeCard,
    isb2c,
    isb2b,
    isClientCategory
  }
}

export const compareDateDiff = (date1, date2, unitOfTime = 'days') => {
  const start = moment(date1)
  const end = moment(date2)
  return start.diff(end, unitOfTime)
}

export const insertSymbol = (str, symbol, index) => {
  return str.substring(0, index) + symbol + str.substring(index)
}
