import axios from 'axios'
import fromEnv from 'config/fromEnv'
import { transformWebSellerSessionRequest } from 'webseller/helpers/api/interceptors'

export const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/sessionsmanagementservice`

export default {
  postCreateNewSession: params => axios.post(`${SERVICE_HOST}/api/v1/Sessions`, params, {
    transformRequest: [...axios.defaults.transformRequest, transformWebSellerSessionRequest]
  }),
  deleteSessionByIdKey: ({ sessionId, sessionClientKey }) => axios.delete(`${SERVICE_HOST}/api/v1/Sessions/${sessionId}/${sessionClientKey}`, {
    transformRequest: [...axios.defaults.transformRequest, transformWebSellerSessionRequest]
  }),
  deleteAllUserSessions: () => axios.delete(`${SERVICE_HOST}/api/v1/Sessions`, {
    transformRequest: [...axios.defaults.transformRequest, transformWebSellerSessionRequest]
  })
}
