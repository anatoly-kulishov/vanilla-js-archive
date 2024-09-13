import axios from 'axios'
import qs from 'query-string'
import { getAuthToken } from 'utils/helpers/authToken'
import { authorization, fileStorage, markers, config, nlp, log } from 'constants/ports'
import fromEnv from 'config/fromEnv'
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import { isWebSellerApp } from 'webseller/helpers'

const http = fromEnv('REACT_APP_HTTP')
const pathBe = fromEnv('REACT_APP_BE')
const pathSe = fromEnv('REACT_APP_SE')
const pathNlp = fromEnv('REACT_APP_NLP')

const fileInstance = axios.create()
fileInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data'

fileInstance.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      Authorization: getAuthToken()
    },
    timeout: 30000,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

const tokenInstance = axios.create()

tokenInstance.interceptors.request.use(
  config => ({
    ...config,
    withCredentials: true,
    timeout: 30000,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

if (isWebSellerApp()) {
  fileInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
  tokenInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
}

export default {
  fetchToken: () => tokenInstance.get(`${http}${pathSe}:${authorization}/authtoken`),
  uploadFile: data => fileInstance.post(`${http}${pathBe}:${fileStorage}/Storage/AddFile`, data),
  uploadFileMongo: data => fileInstance.post(`${http}${pathBe}:${fileStorage}/Files/UploadFiles`, data),
  deleteFile: data => fileInstance.post(`${http}${pathBe}:${fileStorage}/Storage/DeleteFile`, data),
  deleteFileMongo: data => fileInstance.post(`${http}${pathBe}:${fileStorage}/Files/DeleteFileById`, data),
  fetchSessionFiles: params =>
    fileInstance.get(`${http}${pathBe}:${fileStorage}/Storage/GetFilesBySessionId`, { params }),
  // This code is exception for auth file downloading
  // Don't do this anymore
  downloadFile: (url, params) => fileInstance.get(url, { responseType: 'blob', params }),
  fetchAllocatedInfo: params => axios.get(`${http}${pathBe}:${markers}/marker/getAllocatedInfo`, { params }),
  fetchYandexMetrikaConfig: () => axios.get(`${http}${pathBe}:${config}/yandexMetrika/getMetrikaConfig`),
  recognizeVoice: data => fileInstance.post(`${http}${pathNlp}:${nlp}/api/`, data),
  log: data => axios.post(`${http}${pathBe}:${log}/log`, data)
}
