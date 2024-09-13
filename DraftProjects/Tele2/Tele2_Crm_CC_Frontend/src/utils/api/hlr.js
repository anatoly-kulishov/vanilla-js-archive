import axios from 'axios'
import { hlr } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchHlr: (params) => axios.get(`${http}${pathBe}:${hlr}/HlrService/GetHlr`, { params }),
  resetHlr: (data) => axios.post(`${http}${pathBe}:${hlr}/HlrService/ResetHlr`, data),
  changeHlr: (data) => axios.post(`${http}${pathBe}:${hlr}/HlrService/ChangeHlr`, data)
}
