import axios from 'axios'
import { markers } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchSubscriberPsychotype: params => axios.get(`${http}${pathBe}:${markers}/marker/getSubscriberPsychotype`, { params })
}
