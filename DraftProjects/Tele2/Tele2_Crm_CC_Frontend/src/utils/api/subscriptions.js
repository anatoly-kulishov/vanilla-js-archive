import axios from 'axios'
import { compensations, subscription } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const subsCompensationCalculatorServiceLocation = fromEnv('REACT_APP_SUBS_COMPENSATION_CALCULATOR_SERVICE_LOCATION')

export default {
  fetchSubscriptions: ({ msisdn, fromDate, toDate }) => {
    const parameters = { msisdn, fromDate, toDate }
    return axios.get(`${http}${pathBe}:${subscription}/subscription/getSubscriptions`, {
      params: parameters,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  },

  sendSubscriptionSms: req => {
    return axios.post(`${http}${pathBe}:${subscription}/subscription/sendSms`, req)
  },

  unsubscribe: req => {
    return axios.post(`${http}${pathBe}:${subscription}/subscription/unsubscribe`, req)
  },

  fetchUnsibscribeReasons: params =>
    axios.get(`${http}${pathBe}:${subscription}/Subscription/GetUnsibscribeReasons`, { params }),

  getSubscriptionCompensationAmounts: data =>
    axios.post(`${http}${pathBe}${subsCompensationCalculatorServiceLocation}/api/v1/Amounts/Get`, data),
  getSubscriptionCompensationLimits: data =>
    axios.post(`${http}${pathBe}${subsCompensationCalculatorServiceLocation}/api/v1/Limits/Get`, data),
  accrueSubscriptionCompensation: data =>
    axios.post(`${http}${pathBe}:${compensations}/Compensations/Compensations`, data)
}
