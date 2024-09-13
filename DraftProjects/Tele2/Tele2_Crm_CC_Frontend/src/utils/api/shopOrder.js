import axios from 'axios'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const shopOrderServiceLocation = fromEnv('REACT_APP_SHOP_ORDER_SERVICE_LOCATION')

export default {
  getShopOrderRegions: params =>
    axios.get(`${http}${pathBe}${shopOrderServiceLocation}/api/v1/ShopOrders/ShopRegions`, { params }),
  createShopOrder: data => axios.post(`${http}${pathBe}${shopOrderServiceLocation}/api/v1/ShopOrders/Order`, data),
  getShopOrderActions: data => axios.get(`${http}${pathBe}${shopOrderServiceLocation}/api/v1/ShopOrders/Action`, data)
}
