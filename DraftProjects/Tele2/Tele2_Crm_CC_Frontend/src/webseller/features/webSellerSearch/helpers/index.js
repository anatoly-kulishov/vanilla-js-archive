import { hasOwnProperties } from 'webseller/helpers/hasOwnProperties'

import {
  FORM_ITEM_RULES,
  SEARCH_MODALS_MAP,
  WebSellerSearchMainTabsKeys,
  WebSellerSearchSubTabsKeys
} from 'webseller/features/webSellerSearch/constants'
import {
  SEARCH_FORM_DATA,
  SEARCH_PARAMS,
  SEARCH_PARAMS_NAME,
  SESSION_PARAMS,
  SESSION_PARAMS_NAME
} from 'webseller/constants/searchParams'
import { SERVICE_CHANNEL_ID_WEBSELLER } from 'webseller/constants'

export const getValidationRule = (fieldName, activeMainTabKey) => {
  switch (fieldName) {
    case WebSellerSearchMainTabsKeys.MSISDN:
      return [
        FORM_ITEM_RULES.FORM_ITEM_REQUIRED,
        FORM_ITEM_RULES.PHONE_MASK
      ]
    case WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER:
      return [
        FORM_ITEM_RULES.FORM_ITEM_REQUIRED,
        FORM_ITEM_RULES.PHONE_MASK
      ]
    case WebSellerSearchMainTabsKeys.ICC:
      return [
        FORM_ITEM_RULES.FORM_ITEM_REQUIRED,
        FORM_ITEM_RULES.ICC_MASK
      ]
    case WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME:
      return [
        FORM_ITEM_RULES.FORM_ITEM_REQUIRED,
        FORM_ITEM_RULES.PERSONAL_ACCOUNT_NAME_MASK
      ]
    case WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER: {
      const isRequired =
        activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.ICC

      return [
        isRequired ? FORM_ITEM_RULES.FORM_ITEM_REQUIRED : { type: 'any' },
        FORM_ITEM_RULES.DOCUMENT_NUMBER_MASK
      ]
    }
    case WebSellerSearchSubTabsKeys.INN: {
      const isRequired =
        activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.ICC

      return [
        isRequired ? FORM_ITEM_RULES.FORM_ITEM_REQUIRED : { type: 'any' },
        FORM_ITEM_RULES.INN_MASK
      ]
    }
    case WebSellerSearchSubTabsKeys.CLIENT_NAME: {
      const isRequired = activeMainTabKey === WebSellerSearchMainTabsKeys.ICC

      return [
        isRequired ? FORM_ITEM_RULES.FORM_ITEM_REQUIRED : { type: 'any' },
        FORM_ITEM_RULES.CLIENT_NAME_MASK
      ]
    }
    case WebSellerSearchSubTabsKeys.OGRN: {
      const isRequired = activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME

      return [
        isRequired ? FORM_ITEM_RULES.FORM_ITEM_REQUIRED : { type: 'any' },
        FORM_ITEM_RULES.OGRN_MASK
      ]
    }
    case WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT: {
      return [
        FORM_ITEM_RULES.SUPERVISOR_DOCUMENT_NUMBER_MASK
      ]
    }
    default:
      return []
  }
}

export const setFieldsTouchedStatus = (activeMainTabKey, activeSubTabKey) => {
  switch (activeSubTabKey) {
    case WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER: {
      if (activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER || activeMainTabKey === WebSellerSearchMainTabsKeys.ICC) {
        return true
      }
      break
    }
    case WebSellerSearchSubTabsKeys.INN: {
      if (activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME || activeMainTabKey === WebSellerSearchMainTabsKeys.ICC) {
        return true
      }
      break
    }
    case WebSellerSearchSubTabsKeys.CLIENT_NAME: {
      if (activeMainTabKey === WebSellerSearchMainTabsKeys.ICC) {
        return true
      }
      break
    }
    case WebSellerSearchSubTabsKeys.OGRN: {
      if (activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME) {
        return true
      }
      break
    }
    default:
      return
  }

  return false
}

export const onStartCardTypeScript = (sessionParams, setActiveModal) => {
  const firstScript = hasOwnProperties(sessionParams, ['clientCategory', 'typeCard']) || hasOwnProperties(sessionParams, ['clientCategory', 'identificationLevel', 'environment', 'typeCard']) || hasOwnProperties(sessionParams, ['clientCategory', 'identificationLevel', 'typeCard'])
  const secondScript = hasOwnProperties(sessionParams, ['clientCategory', 'identificationLevel', 'environment', 'typeCard', 'messageText'])
  const thirdScript = hasOwnProperties(sessionParams, ['messageText']) || hasOwnProperties(sessionParams, ['messageText', 'clientCategory'])

  if (firstScript) {
    setActiveModal(SEARCH_MODALS_MAP.INFO)
  }
  if (secondScript) {
    setActiveModal(SEARCH_MODALS_MAP.MESSAGE_WITH_ACTION)
  }
  if (thirdScript) {
    setActiveModal(SEARCH_MODALS_MAP.MESSAGE_WITHOUT_ACTION)
  }
}

export const handleSearchParams = (response) => {
  const searchParams = {}
  for (let param of Object.values(SEARCH_PARAMS)) {
    if (response[param] !== undefined) {
      searchParams[param] = response[param]
    }
  }
  window.sessionStorage.setItem(SEARCH_PARAMS_NAME, JSON.stringify(searchParams))
  return searchParams
}

export const handleSessionParams = (response, exception = []) => {
  const sessionParams = {}
  for (let param of Object.values(SESSION_PARAMS)) {
    if (response[param] !== undefined) {
      if (exception.includes(param)) {
        continue
      }
      sessionParams[param] = response[param]
    }
  }
  window.sessionStorage.setItem(SESSION_PARAMS_NAME, JSON.stringify(sessionParams))
  return sessionParams
}

export const getSearchFormDataFromStorage = () => {
  const searchFormData = window.sessionStorage.getItem(SEARCH_FORM_DATA)
  return searchFormData ? JSON.parse(searchFormData) : null
}

export const getSearchParamsFromStorage = () => {
  const storageData = window.sessionStorage.getItem(SEARCH_PARAMS_NAME)
  return storageData ? JSON.parse(storageData) : null
}

export const getSessionParamsFromStorage = () => {
  const storageData = window.sessionStorage.getItem(SESSION_PARAMS_NAME)
  return storageData ? JSON.parse(storageData) : null
}

export const createRedirectUrlWebSellerSearch = ({ isCreateOrder, query }) => {
  const path = isCreateOrder ? '/card/rtc-broadband/create-order' : '/main/balance'
  query.append('serviceChannelId', SERVICE_CHANNEL_ID_WEBSELLER)
  return `${path}?${query}`
}
