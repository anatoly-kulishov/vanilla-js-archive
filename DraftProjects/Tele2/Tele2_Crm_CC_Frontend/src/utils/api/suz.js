import axios from 'axios'
import qs from 'query-string'
import fromEnv from 'config/fromEnv'
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import { isWebSellerApp } from 'webseller/helpers'

const http = fromEnv('REACT_APP_HTTP')
const pathSe = fromEnv('REACT_APP_SE')
const pathSuz = fromEnv('REACT_APP_SUZ')

const suzInstance = axios.create()

suzInstance.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      Authorization: 'strawberry_fields_forever'
    },
    timeout: 30000,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

if (isWebSellerApp()) {
  suzInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
}

export default {
  hashSuzRequest: data => axios.post(`${http}${pathSe}:9020/suz/signString`, data),
  fetchSuzToken: data => {
    const { data: requestData, hash } = data
    return suzInstance.post(`${pathSuz}/api/auth/trusted`, requestData, {
      headers: {
        Signature: hash
      }
    })
  }
}
