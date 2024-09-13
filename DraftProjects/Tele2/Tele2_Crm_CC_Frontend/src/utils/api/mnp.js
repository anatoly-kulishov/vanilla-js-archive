import axios from 'axios'
import qs from 'query-string'
import { getAuthToken } from 'utils/helpers/authToken'
import { protocol, mnpOrder } from 'constants/ports'
import fromEnv from 'config/fromEnv'
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import { isWebSellerApp } from 'webseller/helpers'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const protocolInstance = axios.create()
protocolInstance.interceptors.request.use(
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
  protocolInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
}

export default {
  // Mnp Protocol
  checkMnpHandling: data => protocolInstance.post(`${http}${pathBe}:${protocol}/Protocol/checkMnpHandling`, data),
  fetchProtocolStatusContext: params =>
    axios.get(`${http}${pathBe}:${protocol}/Protocol/getProtocolStatusContext`, { params }),
  createDraftProtocol: data => axios.post(`${http}${pathBe}:${protocol}/Draft/Protocol`, data),
  changeDraftProtocol: data => axios.put(`${http}${pathBe}:${protocol}/Draft/Protocol`, data),
  protocol: data => axios.put(`${http}${pathBe}:${protocol}/Protocol/${data.handlingId}`, data),
  getCancellationsNumber: params =>
    axios.get(`${http}${pathBe}:${protocol}/Protocol/GetCancellationsNumber`, { params }),
  getQuestionProtocol: params => axios.get(`${http}${pathBe}:${protocol}/Protocol/getQuestionProtocol`, { params }),

  // Mnp Order
  getMnpOrder: params => protocolInstance.get(`${http}${pathBe}:${mnpOrder}/api/v1/orders`, { params }),
  cancelMnpOrder: data => axios.post(`${http}${pathBe}:${mnpOrder}/api/v1/orders`, data),
  getMnpOrderHistory: params => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/GetOrderHistory`, { params }),
  getClosedOrders: params => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/GetClosedOrders`, { params }),
  getHistoryOrderId: params => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/history/orderId`, { params })
}
