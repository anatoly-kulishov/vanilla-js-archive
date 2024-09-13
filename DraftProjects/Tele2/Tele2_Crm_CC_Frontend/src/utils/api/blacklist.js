import axios from 'axios'
import { markers } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const service = 'marker'

export default {
  fetchBlacklistInfo: params => axios.get(`${http}${pathBe}:${markers}/${service}/GetBlackListInfo`, { params }),
  fetchWebimBlacklistInfo: params =>
    axios.get(`${http}${pathBe}:${markers}/${service}/GetWebimBlackListInfo`, { params })
}
