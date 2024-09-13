import axios from 'axios'
import { promo } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchActivatePromoCode: data => axios.post(`${http}${pathBe}:${promo}/promoCode/activatePromoCode`, data),
  fetchCancelPromoCode: data => axios.post(`${http}${pathBe}:${promo}/promoCode/cancelPromoCode`, data),
  fetchNotifyPromoCode: data => axios.post(`${http}${pathBe}:${promo}/promoCode/createPromoCodeNotification`, data)
}
