import axios from 'axios'
import qs from 'query-string'
import { changeSim } from 'constants/ports'
import { getAuthToken } from 'utils/helpers/authToken'
import fromEnv from 'config/fromEnv'
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import { isWebSellerApp } from 'webseller/helpers'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const changeSimInstance = axios.create()

changeSimInstance.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      Authorization: getAuthToken(),
      ...config.headers
    },
    timeout: 60000,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

if (isWebSellerApp()) {
  changeSimInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
}

export default {
  validateSimProfile: params => axios.get(`${http}${pathBe}:${changeSim}/ChangeSim/ValidateSimProfile`, { params }),
  getHistoryChangeSim: params => axios.get(`${http}${pathBe}:${changeSim}/ChangeSim/GetHistory`, { params }),
  changeSim: data => changeSimInstance.post(`${http}${pathBe}:${changeSim}/ChangeSim`, data),
  getReasonsChangeSim: params => axios.get(`${http}${pathBe}:${changeSim}/ChangeSimAdmin/GetOperations`, { params })
}
