import axios from 'axios'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const remainsServiceLocation = fromEnv('REACT_APP_REMAINS_SERVICE_LOCATION')
const changeServiceLocation = fromEnv('REACT_APP_CHARGE_SERVICE_LOCATION')

export default {
  fetchRemainsDetailsData: (msisdn, params) =>
    axios.get(`${http}${pathBe}${remainsServiceLocation}/api/v1/Remains/${msisdn}`, params),
  fetchSubscriberServices: (msisdn, billingServiceId, params) =>
    axios.get(`${http}${pathBe}${remainsServiceLocation}/api/v1/Remains/${msisdn}/${billingServiceId}`, params),
  fetchQuantumData: (msisdn, params) =>
    axios.get(`${http}${pathBe}${remainsServiceLocation}/api/v1/Remains/${msisdn}/quantum`, params),
  fetchUnpaidChargeData: (msisdn, params) =>
    axios.get(`${http}${pathBe}${changeServiceLocation}/api/v1/Charge/${msisdn}`, params),
  fetchMixxBalance: ({ msisdn }) =>
    axios.get(`${http}${pathBe}${remainsServiceLocation}/api/v1/Remains/${msisdn}/mixxbalance`)
}
