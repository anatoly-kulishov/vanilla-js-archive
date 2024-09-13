import axios from 'axios'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const tariffConstructorServiceLocation = fromEnv('REACT_APP_TARIFF_CONSTRUCTOR_SERVICE_LOCATION')

export default {
  fetchTariffInfo: (msisdn, params) =>
    axios.get(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}/current`, { params }),
  fetchTariffInfoPreview: msisdn =>
    axios.get(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}/currentShort`),
  fetchAvailableTariffs: (msisdn, params) =>
    axios.get(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}/available`, { params }),
  fetchSubscriberTariffHistory: (msisdn, params) =>
    axios.get(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}`, { params }),

  fetchAvailableTariffDetails: (msisdn, trplId, params) =>
    axios.get(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}/${trplId}`, { params }),
  fetchEnabledTariffDetails: (msisdn, params) =>
    axios.get(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}/enabled`, { params }),

  changeTariff: (msisdn, params) =>
    axios.put(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}`, params),
  changeServices: (msisdn, params) =>
    axios.patch(`${http}${pathBe}${tariffConstructorServiceLocation}/api/v1/Tariffs/${msisdn}`, params)
}
