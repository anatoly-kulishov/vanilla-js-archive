import axios from 'axios'
import { mnpOrder } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchECommerceTypes: params => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Admin/EcommerceTypeCard`, { params }),

  fetchMnpJournal: params => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/Journal`, { params })
}
