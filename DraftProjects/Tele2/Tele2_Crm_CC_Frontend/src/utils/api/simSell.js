import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/SimSellService`

export default {
  fetchSellSim: body => axios.post(`${SERVICE_HOST}/api/v1/SimSale/Sell`, body),
  fetchSaleSim: ({ eShopOrderId, ...body }) => axios.post(`${SERVICE_HOST}/api/v1/eShopOrder/${eShopOrderId}/Sale`, body.simCards)
}
