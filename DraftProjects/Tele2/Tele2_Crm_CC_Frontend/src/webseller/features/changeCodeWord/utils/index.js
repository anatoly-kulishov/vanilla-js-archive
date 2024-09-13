import axios from 'axios'
import fromEnv from 'config/fromEnv'

export const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/personaldataservice`

export default {
  changeCodeWord: ({ params, query }) => axios.put(`${SERVICE_HOST}/api/v1/Clients/${query?.clientId}/codeword`, params)
}
