import axios from 'axios'
import { adjustment } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const service = 'Adjustments'

export default {
  fetchAdjustmentPayment: data => axios.post(`${http}${pathBe}:${adjustment}/${service}/AdjustmentPayment`, data)
}
