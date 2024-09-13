import axios from 'axios'
import { compensations } from 'constants/ports'
import fromEnv from 'config/fromEnv'

import { sse } from '../helpers/sseHelper'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  validatePaydHistory: data => axios.post(`${http}${pathBe}:${compensations}/Compensations/ValidatePaydHistory`, data),
  validatePaydService: data =>
    axios.post(`${http}${pathBe}:${compensations}/CompensationsAdmin/ValidatePaydService`, data),
  validatePaydServiceHistory: data =>
    axios.post(`${http}${pathBe}:${compensations}/CompensationsAdmin/ValidatePaydServiceHistory`, data),
  validatePaydServiceEnabled: data =>
    axios.post(`${http}${pathBe}:${compensations}/CompensationsAdmin/ValidatePaydServiceEnabled`, data),
  validatePaydServiceAvailable: data =>
    axios.post(`${http}${pathBe}:${compensations}/CompensationsAdmin/ValidatePaydServiceAvailable`, data),
  validatePaymentHistory: data =>
    axios.post(`${http}${pathBe}:${compensations}/Compensations/ValidatePaymentHistory`, data),
  validateCostHistory: data => axios.post(`${http}${pathBe}:${compensations}/Compensations/ValidateCostHistory`, data),
  validatePaydMarkerEnabled: data =>
    axios.post(`${http}${pathBe}:${compensations}/CompensationsAdmin/ValidatePaydMarkerEnabled`, data),
  cancelCompensation: data => axios.post(`${http}${pathBe}:${compensations}/Compensations/CancelCompensation`, data),
  modifyCompensation: data => axios.post(`${http}${pathBe}:${compensations}/Compensations/ModifyCompensation`, data),
  addCompensation: data => axios.post(`${http}${pathBe}:${compensations}/Compensations/AddCompensation `, data),
  addServiceCompensation: data =>
    axios.post(`${http}${pathBe}:${compensations}/Compensations/AddServiceCompensation `, data),

  setPaydPostLimit: params =>
    axios.get(`${http}${pathBe}:${compensations}/CompensationsAdmin/SetupPaydPostLimit`, { params }),
  validatePaydPostLimit: params =>
    axios.get(`${http}${pathBe}:${compensations}/CompensationsAdmin/ValidatePaydPostLimit`, { params }),

  fetchPaydComments: params =>
    axios.get(`${http}${pathBe}:${compensations}/CompensationsAdmin/GetPaydComment`, { params }),
  fetchPaydReasons: params =>
    axios.get(`${http}${pathBe}:${compensations}/CompensationsAdmin/GetPaydReason`, { params }),
  fetchPaydReasonAdviceDescription: params =>
    axios.get(`${http}${pathBe}:${compensations}/CompensationsAdmin/GetPaydReasonAdviceDescription`, { params }),
  getPaydCommentRelate: params =>
    axios.get(`${http}${pathBe}:${compensations}/CompensationsAdmin/GetPaydCommentRelate`, { params }),
  getMarginServiceTypeRelate: params =>
    axios.get(`${http}${pathBe}:${compensations}/Compensations/GetMarginServiceTypeRelate`, { params }),
  getMarginServiceSizeRelate: params =>
    axios.get(`${http}${pathBe}:${compensations}/Compensations/GetMarginServiceSizeRelate`, { params }),
  getCompensationForm: params =>
    axios.get(`${http}${pathBe}:${compensations}/Compensations/v2/GetCompensationForm`, { params }),
  fetchPaymentCompensationHistory: params =>
    axios.get(`${http}${pathBe}:${compensations}/Compensations/GetPaymentCompensationHistory`, { params }),

  getPromocodeType: params => axios.get(`${http}${pathBe}:${compensations}/Promocode/GetPromocodeType`, { params }),
  getPromocodeServiceType: params =>
    axios.get(`${http}${pathBe}:${compensations}/Promocode/GetPromocodeServiceType`, { params }),
  addPromocodeCompensation: data =>
    axios.post(`${http}${pathBe}:${compensations}/Promocode/AddPromocodeCompensation`, data),
  cancelPromocodeCompensation: data =>
    axios.post(`${http}${pathBe}:${compensations}/Promocode/CancelPromocodeCompensation`, data),
  compensationSse: data => sse(`${http}${pathBe}:${compensations}/sse-notifications`, data)
}
