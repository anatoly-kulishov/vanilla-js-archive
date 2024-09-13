import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/eshoporders`

export default {
  fetchOrderList: queryStringParams => axios.get(`${SERVICE_HOST}/api/v1/orders?${queryStringParams}`),
  fetchOrder: eshopOrderId => axios.get(`${SERVICE_HOST}/api/v2/orders/${eshopOrderId}`),
  fetchOrdersStatistic: userId => axios.get(`${SERVICE_HOST}/api/v1/users/${userId}/statistics`),
  fetchOrdersHistory: (userId, params) => axios.get(`${SERVICE_HOST}/api/v1/users/${userId}/orders`, { params }),
  fetchOrderStatusCompleted: (eshopOrderId, params) => axios.post(`${SERVICE_HOST}/api/v1/orders/${eshopOrderId}/Status`, params)
}
