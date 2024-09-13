import {
  createOldSearchWebsellerSessionAccessKey,
  createWebsellerSessionAccessKey
} from 'webseller/helpers/api/sessionAccessKey'
import featureConfig from 'webseller/featureConfig'

const SESSION_HEADER_NAME = 'WebSeller-Session'

export const applyRequestInterceptorWebSeller = config => {
  const { headers } = config

  const isSessionRequest = config.url.toLowerCase().includes('sessionsservice')
  if (isSessionRequest) {
    const accessKey = featureConfig.isNewManualSearch ? createWebsellerSessionAccessKey() : createOldSearchWebsellerSessionAccessKey()
    headers[SESSION_HEADER_NAME] = accessKey
  }

  headers.System = 'WebSeller'

  return config
}

export const transformWebSellerSessionRequest = (data, headers) => {
  delete headers?.[SESSION_HEADER_NAME]

  return data
}
