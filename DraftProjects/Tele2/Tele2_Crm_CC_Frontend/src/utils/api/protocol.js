import axios from 'axios'
import { protocol } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchProtocol: params => axios.get(`${http}${pathBe}:${protocol}/Protocol/GetProtocolV2`, { params })
}
