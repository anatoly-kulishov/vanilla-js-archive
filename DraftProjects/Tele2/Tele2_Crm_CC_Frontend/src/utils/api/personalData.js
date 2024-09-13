import axios from 'axios'
import { personalInfo, susbscriberStatus } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const sessionsservice = fromEnv('REACT_APP_SESSIONS_SERVICE_LOCATION')

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/SimSellService`

const PERSONAL_DATA_SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/PersonalDataService`
const PERSONAL_INFO_SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/${sessionsservice}/personalinfoservice`

export default {
  // TODO: Нужно на втором этапе рефактора ПП перейти к методу GetClientSubscriberInfo
  fetchPersonalInfo: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/personalInfo/GetClientSubscriberInfoTemp`, { params }),
  fetchDataSubscriber: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/AdditionalInfo/GetSubscriberData`, { params }),
  fetchDataClient: params => axios.get(`${http}${pathBe}:${personalInfo}/AdditionalInfo/GetClientData`, { params }),
  fetchSubscriberList: param =>
    axios.get(`${http}${pathBe}:${personalInfo}/PersonalInfo/GetSubscriberListNew`, { params: param, timeout: 180000 }),
  fetchSubscriberStatuses: () => axios.get(`${http}${pathBe}:${personalInfo}/PersonalInfo/GetSubscriberStatuses`),
  fetchWhoIsIt: data => axios.post(`${http}${pathBe}:${personalInfo}/PersonalInfo/GetInfoByWhoIsIt`, data),
  fetchSubscriberServiceStatusHistory: params =>
    axios.get(`${http}${pathBe}:${susbscriberStatus}/subscriberStatus/getSubscriberStatusHistory`, { params }),
  fetchSubscriberServiceStatusUpdate: data =>
    axios.post(`${http}${pathBe}:${susbscriberStatus}/subscriberStatus/updateSubscriberStatus`, data),
  fetchRecommendationChangeStatus: params =>
    axios.get(`${http}${pathBe}:${susbscriberStatus}/subscriberStatus/GetRecommendationChangeStatus`, { params }),
  fetchSubscriberStatusList: params =>
    axios.get(`${http}${pathBe}:${susbscriberStatus}/SubscriberStatus/GetSubscriberStatusList`, { params }),
  fetchPersonalData: params => axios.get(`${http}${pathBe}:${personalInfo}/PersonalInfo/GetPersonalData`, { params }),
  setPersonalData: (data, branchId, clientId) =>
    axios.put(`${SERVICE_HOST}/service/personaldataservice/api/v1/branches/${branchId}/clients/${clientId}`, data),
  fetchPaymentDeliveryTypes: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/AdditionalInfo/GetPaymentDeliveryType`, { params }),
  updateSubscriberData: data =>
    axios.post(`${http}${pathBe}:${personalInfo}/AdditionalInfo/UpdateSubscriberData`, data),
  updateClientData: data => axios.post(`${http}${pathBe}:${personalInfo}/AdditionalInfo/UpdateClientData`, data),
  fetchRevoke: data => axios.post(`${http}${pathBe}:${personalInfo}/Pep/Revoke`, data),
  postSendAgree: data => axios.post(`${http}${pathBe}:${personalInfo}/Pep/SendAgree`, data),
  fetchVipSegmentation: params => axios.get(`${http}${pathBe}:${personalInfo}/Segment/GetVipSegmentation`, { params }),
  deleteFromSpace: data => axios.post(`${http}${pathBe}:${personalInfo}/PersonalInfo/DeleteFromSpace`, data),
  fetchSubscriberMinimalInfo: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/MinimalInfo/GetSubscriber`, { params }),
  fetchSubscriberPersonalData: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/api/v2/Subscribers/Subscriber`, { params }),
  fetchB2bClientMinimalInfo: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/MinimalInfo/GetB2bClient`, { params }),
  fetchClientSubscriberInfo: params =>
    axios.get(`${http}${pathBe}:${personalInfo}/personalInfo/GetClientSubscriberInfo`, { params }),
  checkSmev: data => axios.post(`${PERSONAL_DATA_SERVICE_HOST}/api/v1/personalDataChecks`, data),
  getCheckSmevStatus: id => axios.get(`${PERSONAL_DATA_SERVICE_HOST}/api/v1/personalDataChecks/${id}/Status`),
  fetchPhoneNumberCategory: ({ msisdn, branchId }) =>
    axios.get(`${PERSONAL_INFO_SERVICE_HOST}/api/v1/msisdns/${msisdn}/category`, { params: { branchId } })
}
