import axios from 'axios'
import { margin } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchSubscriberMarginMarker: (params) => axios.get(`${http}${pathBe}:${margin}/MarginMarker/GetSubscriberMarginMarker`, { params })
}
