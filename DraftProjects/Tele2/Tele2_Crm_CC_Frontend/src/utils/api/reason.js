import axios from 'axios'
import { reasonCategory } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchReasonDetails: reasonId =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasondetails?reasonId=${reasonId}`),

  deleteReason: reasonId =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/deleteReason?reasonId=${reasonId}`),
  backupReason: reasonId =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/backupReason?reasonId=${reasonId}`),
  modifyReason: params => axios.post(`${http}${pathBe}:${reasonCategory}/reasonCategory/modifyReason`, params),
  createReason: params => axios.post(`${http}${pathBe}:${reasonCategory}/reasonCategory/createReason`, params),

  fetchDirections: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasonDirections`, { params }),
  createReasonDirection: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/createReasonDirection`, { params }),
  deleteReasonDirection: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/deleteReasonDirection`, { params }),

  fetchClientCategories: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasonClientCategories`, { params }),
  createReasonClientCategory: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/createReasonClientCategory`, { params }),
  deleteReasonClientCategory: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/deleteReasonClientCategory`, { params }),

  fetchChannels: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasonChannels`, { params }),
  createReasonChannel: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/createReasonChannel`, { params }),
  deleteReasonChannel: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/deleteReasonChannel`, { params }),
  fetchReason: params => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasons`, { params })
}
