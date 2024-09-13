import axios from 'axios'
import fromEnv from 'config/fromEnv'

import { getWebsellerSessionId } from 'webseller/helpers/api/sessionAccessKey'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/changesimservice`

export default {
  sendSimChanges: params => axios.post(`${SERVICE_HOST}/api/v1/Change`, params, {
    headers: {
      'X-Correlation-ID': getWebsellerSessionId()
    }
  }),
  fetchChangeSimCardAvailability: params => axios.post(`${SERVICE_HOST}/api/v1/Availability`, params, {
    headers: {
      'X-Correlation-ID': getWebsellerSessionId()
    }
  })
}
