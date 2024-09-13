import axios from 'axios'
import qs from 'query-string'
import { smartSearch, rcSearch } from 'constants/ports'
import { ws } from 'utils/helpers/wsHelper'
import fromEnv from 'config/fromEnv'
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import { isWebSellerApp } from 'webseller/helpers'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const webSocket = fromEnv('REACT_APP_WS')
const pathKmsSearch = fromEnv('REACT_APP_KMS_SEARCH')

const kmsInstance = axios.create()
kmsInstance.interceptors.request.use(
  config => ({
    ...config,
    withCredentials: true,
    timeout: 30000,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

if (isWebSellerApp()) {
  kmsInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
}

export default {
  fetchKmsSearch: params => kmsInstance.get(`${pathKmsSearch}/api/search/answer`, { params }),

  fetchWords: params => axios.get(`${http}${pathBe}:${smartSearch}/Mdm/getWords`, { params }),
  addWord: params => axios.get(`${http}${pathBe}:${smartSearch}/Mdm/setWord`, { params }),
  deleteWords: data => axios.post(`${http}${pathBe}:${smartSearch}/Mdm/deleteWords`, { data }),

  reasonCategorySearch: () => ws(`${webSocket}${pathBe}:${rcSearch}/smartSearch/reasons`)
}
