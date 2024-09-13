import axios from 'axios'
import fromEnv from 'config/fromEnv'
import { transformWebSellerSessionRequest } from 'webseller/helpers/api/interceptors'

export const SESSION_SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/sessionsmanagementservice`

export default {
  fetchCreateSession: ({ msisdn, documentNumber }) =>
    axios.post(
      `${SESSION_SERVICE_HOST}/api/v1/Sessions`,
      { msisdn, documentNumber },
      {
        transformRequest: [...axios.defaults.transformRequest, transformWebSellerSessionRequest]
      }
    ),
  fetchDeleteSession: ({ sessionId, clientSessionKey }) =>
    axios.delete(`${SESSION_SERVICE_HOST}/api/v1/Sessions/${sessionId}/${clientSessionKey}}`, {
      transformRequest: [...axios.defaults.transformRequest, transformWebSellerSessionRequest]
    }),
  fetchDeleteAllSessions: () =>
    axios.delete(`${SESSION_SERVICE_HOST}/api/v1/Sessions`, {
      transformRequest: [...axios.defaults.transformRequest, transformWebSellerSessionRequest]
    })
}
