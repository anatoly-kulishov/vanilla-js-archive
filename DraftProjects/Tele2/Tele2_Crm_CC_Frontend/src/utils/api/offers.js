import axios from 'axios'
import { offers } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchOffers: data => axios.post(`${http}${pathBe}:${offers}/Offers/GetOffers`, data),
  fetchRegisteredOffers: params => axios.get(`${http}${pathBe}:${offers}/Offers/GetRegisteredOffers`, { params }),

  addOffer: data => axios.post(`${http}${pathBe}:${offers}/Offers/AddOffer`, data),
  changeOffer: data => axios.post(`${http}${pathBe}:${offers}/Offers/ChangeOffer`, data),
  deleteOffer: data => axios.post(`${http}${pathBe}:${offers}/Offers/DeleteOffer`, data),
  modifyAutoConnectOffer: data => axios.post(`${http}${pathBe}:${offers}/Offers/AutoConnectOffer`, data)
}
