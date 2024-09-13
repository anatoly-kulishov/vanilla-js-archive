import axios from 'axios'
import tickets from './ticket'
import { smsHistory, serviceStautsesHistory, offers, offersHistory, interaction, promo } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchSmsHistory: params =>
    axios.get(`${http}${pathBe}:${smsHistory}/smsHistory/getSmsHistory`, {
      params: params,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }),

  fetchServiceHistory: params =>
    axios.get(`${http}${pathBe}:${serviceStautsesHistory}/servicesStatusesHistory/getServicesHistory`, {
      params: params
    }),

  fetchInteractionsHistory: params =>
    axios.get(`${http}${pathBe}:${interaction}/Interaction/GetInteractions`, {
      params: params,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }),

  fetchOffersHistory: param =>
    axios.get(`${http}${pathBe}:${offers}/offerHistory/getHistory`, {
      params: param
    }),

  fetchOffersCbmHistory: param =>
    axios.get(`${http}${pathBe}:${offersHistory}/offer/getContactHistory`, {
      params: param
    }),

  fetchGroupNotificationMessages: data => axios.post(`${http}${pathBe}:${smsHistory}/smshistory/getGroupNotificationMessages`, data),
  fetchPromoCodeHistory: params => axios.get(`${http}${pathBe}:${promo}/promoCode/getPromoCodeHistory`, { params }),
  fetchPromoCodeHistoryFiltres: params => axios.get(`${http}${pathBe}:${promo}/promoCode/GetPromoCodeFilters`, { params }),
  ...tickets
}
