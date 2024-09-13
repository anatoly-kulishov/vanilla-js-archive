import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/SimCard`

export default {
  checkMnpSimAvailability: params => axios.get(`${SERVICE_HOST}/api/v2/Sim/mnp/availability`, { params })
}
