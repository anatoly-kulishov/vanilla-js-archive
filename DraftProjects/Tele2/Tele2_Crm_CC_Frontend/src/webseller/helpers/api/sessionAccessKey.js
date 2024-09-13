import qs from 'query-string'

import { SESSION_PARAMS_NAME } from 'webseller/constants/searchParams'

export const USERNAME_STORAGE_KEY = 'webseller_username'
export const SESSI0N_ID_STORAGE_KEY = 'webseller_session_id'

export const storeWebsellerUserName = userName => {
  window.sessionStorage.setItem(USERNAME_STORAGE_KEY, userName)
}

export const storeWebsellerSessionId = sessionId => {
  window.sessionStorage.setItem(SESSI0N_ID_STORAGE_KEY, sessionId)
}

export const getWebsellerSessionAccessData = () => {
  const sessionParams = JSON.parse(window.sessionStorage.getItem(SESSION_PARAMS_NAME))
  const userName = window.sessionStorage.getItem(USERNAME_STORAGE_KEY)

  return { userName, sessionKey: sessionParams?.sessionClientKey, sessionId: sessionParams?.sessionId }
}

export const getWebsellerSessionId = () => {
  return window.sessionStorage.getItem(SESSI0N_ID_STORAGE_KEY)
}

export const createWebsellerSessionAccessKey = () => {
  const { userName, sessionKey, sessionId } = getWebsellerSessionAccessData()

  return [userName, sessionKey, sessionId].join(':')
}

export const createOldSearchWebsellerSessionAccessKey = () => {
  const userName = window.sessionStorage.getItem(USERNAME_STORAGE_KEY)
  const sessionId = window.sessionStorage.getItem(SESSI0N_ID_STORAGE_KEY)
  const { msisdn: clientMsisdn } = qs.parse(window.location.search)

  return [userName, clientMsisdn, sessionId].join(':')
}
