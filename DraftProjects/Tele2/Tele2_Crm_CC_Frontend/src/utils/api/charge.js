import axios from 'axios'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const chargeServiceLocation = fromEnv('REACT_APP_CHARGE_SERVICE_LOCATION')

export default {
  getChargeCounter: params => axios.get(`${http}${pathBe}${chargeServiceLocation}/api/v1/Charge/Counter`, { params })
}
