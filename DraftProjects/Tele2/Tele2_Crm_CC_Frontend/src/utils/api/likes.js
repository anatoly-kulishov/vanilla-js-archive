import axios from 'axios'
import { like } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchLikes: params => axios.get(`${http}${pathBe}:${like}/like/getFeature`, { params }),
  createLike: data => axios.post(`${http}${pathBe}:${like}/like/setLike`, data)
}
