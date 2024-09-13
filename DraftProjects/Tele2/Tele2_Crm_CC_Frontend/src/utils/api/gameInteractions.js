import axios from 'axios'
import { gameInteractions } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchWgHistory: (params) => axios.get(`${http}${pathBe}:${gameInteractions}/gameInteractions/history`, { params })
}
