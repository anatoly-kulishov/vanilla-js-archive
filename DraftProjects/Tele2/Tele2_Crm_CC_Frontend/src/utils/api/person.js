import axios from 'axios'
import { ws } from 'utils/helpers/wsHelper'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const webSocket = fromEnv('REACT_APP_WS')
const clickServiceLocation = fromEnv('REACT_APP_CLICK_SERVICE_LOCATION')
const customerRepresentServiceLocation = fromEnv('REACT_APP_CUSTOMER_REPRESENT_SERVICE_LOCATION')

export default {
  getCustomerScenarioHistory: customerId =>
    axios.get(`${http}${pathBe}${clickServiceLocation}/api/v1/Scenarios/Customers/${customerId}`),

  getScenarios: params => axios.get(`${http}${pathBe}${clickServiceLocation}/api/v1/Scenarios`, { params }),
  createScenario: data => axios.post(`${http}${pathBe}${clickServiceLocation}/api/v1/Scenarios`, data),
  modifyScenario: (scenarioId, data) =>
    axios.put(`${http}${pathBe}${clickServiceLocation}/api/v1/Scenarios/${scenarioId}`, data),

  getPersonId: data => axios.post(`${http}${pathBe}${customerRepresentServiceLocation}/api/v1/CustomerMarkers`, data),

  getCustomersSegmentsPreview: ({ customerId, handlingId }) =>
    ws(
      `${webSocket}${pathBe}${customerRepresentServiceLocation}/api/v1/CustomerSegments/Short?CustomerId=${customerId}&HandlingId=${handlingId}`
    ),
  getCustomerSegments: ({ customerId, handlingId, msisdn }) =>
    ws(
      `${webSocket}${pathBe}${customerRepresentServiceLocation}/api/v1/CustomerSegments?CustomerId=${customerId}&HandlingId=${handlingId}${
        msisdn ? `&Msisdn=${msisdn}` : ''
      }`
    )
}
