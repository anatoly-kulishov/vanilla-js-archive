import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/EShopOrders`

export default {
  fetchSellAvailability: officeId => axios.get(`${SERVICE_HOST}/api/v1/Offices/${officeId}/sellAvailability`),
  fetchShopTariffs: ({ siteId, clientType }) =>
    axios.get(`${SERVICE_HOST}/api/v1/Directory/ShopTariffs`, {
      params: { siteId, clientType }
    }),
  fetchShopNumbers: ({ siteId, indexSeed }) =>
    axios.get(`${SERVICE_HOST}/api/v1/Directory/ShopNumbers`, {
      params: { siteId, indexSeed }
    }),
  fetchSearchShopNumbers: ({ siteId, query }) =>
    axios.get(`${SERVICE_HOST}/api/v1/Directory/ShopNumbers/Search`, {
      params: { siteId, query }
    })
}
