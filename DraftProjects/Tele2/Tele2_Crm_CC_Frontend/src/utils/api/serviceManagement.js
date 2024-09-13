import axios from 'axios'
import { serviceManagement, finance } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchServices: params =>
    axios.get(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/getSolidServicesInfo`, {
      params: params,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }),
  getMultisubscriptionService: params =>
    axios.get(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/getMultisubscriptionService`, { params }),
  fetchClientProductOfferingProfile: params =>
    axios.get(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/getClientProductOfferingProfile`, { params }),
  сhangeMultisubscriptionService: data => axios.post(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/ChangeMultisubscriptionService`, data),
  fetchChargeServiceList: params =>
    axios.get(`${http}${pathBe}:${finance}/Finance/GetChargeServiceList`, { params }),
  fetchServicesPendingOrders: params =>
    axios.get(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/GetDelayedServiceOrders`, {
      params
    }),
  getLastPayment: params => axios.get(`${http}${pathBe}:${finance}/T2Pay/GetLastPayment`, { params }),

  deleteServicesPendingOrders: data =>
    axios.post(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/DeleteServiceOrder`, data),
  fetchChangeServiceStatus: data =>
    axios.post(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/changeServiceStatus`, data),

  resendServiceOrder: data => axios.post(`${http}${pathBe}:${serviceManagement}/subscriberServiceManagement/ResendServiceOrder`, data),

  deleteT2PayCard: params => axios.delete(`${http}${pathBe}:${finance}/T2Pay/T2PayCard`, { params })
}
