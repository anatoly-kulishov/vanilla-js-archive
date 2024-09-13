import axios from 'axios'
import {
  ORDER_SERVICE,
  ORDER_EDIT_SERVICE,
  ORDER_SESSION_SERVICE,
  DADATA_INTEGRATION_SERVICE,
  PERSONAL_DOCUMENT_SERVICE,
  CONNECTION_EQUIPMENT_SERVICE,
  TIMESLOT_SERVICE,
  ADDRESS_INFO_SERVICE,
  MSISDN_RESERVATION_SERVICE
} from 'constants/serviceLocations'

const PATH_BE = process.env.REACT_APP_BE
const HTTP = process.env.REACT_APP_HTTP

const BASE_URL = `${HTTP}${PATH_BE}`

export default {
  // Order
  getOrder: params => axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetOrder`, { params }),
  getOrderList: params => axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetOrderList`, { params }),
  performOrder: data => axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/PerformOrder`, data),
  changeOrderWaitState: data =>
    axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/ChangeOrderWaitState`, data),
  transferOrder: data =>
    axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/TransferOrderToRtc`, data, {
      timeout: 100000
    }),
  cancelOrder: data => axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/CancelOrder`, data),
  getHandbooks: params => axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetHandbooks`, { params }),
  deleteOrder: data => axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/DeleteOrder`, data),
  getOperationReasons: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetOperationReasons`, { params }),
  getOrderRtcStatuses: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetRtcStatuses`, { params }),
  getRegions: params => axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetRegions`, { params }),
  getMacroRegions: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetMacroRegions`, { params }),
  getRegionIsoCode: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetRegionIsoCode`, { params }),
  getStatusReasons: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/StatusReasons`, { params }),
  modifyRtcData: data => axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/ModifyRtcData`, data),
  modifyOrderTimeslot: data =>
    axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/ModifyOrderTimeslot`, data),
  getBroadbandTariffs: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetAvailableTariffs`, { params }),
  getRtcKey: params => axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/GetRtcKey`, { params }),
  saveInvoiceEquipment: data =>
    axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/InvoiceEquipments`, data),
  getInvoiceEquipmentHistory: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrderHistory/InvoiceEquipmentHistory`, { params }),
  modifyOrder: data => axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/ModifyOrder`, data),
  getOrderChangeHistory: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/OrderChangeHistory/${params.OrderId}`, {
      params
    }),
  getOrderEditSessionHistory: params =>
    axios.get(`${BASE_URL}${ORDER_EDIT_SERVICE}/api/v1/Session/history`, { params }),
  getOrderEditSession: id => axios.get(`${BASE_URL}${ORDER_EDIT_SERVICE}/api/v1/Session/${id}`, { timeout: 90000 }),
  createOrderEditSession: data =>
    axios.post(`${BASE_URL}${ORDER_EDIT_SERVICE}/api/v1/Session`, data, { timeout: 90000 }),
  modifyOrderEditSession: ({ id, data }) =>
    axios.put(`${BASE_URL}${ORDER_EDIT_SERVICE}/api/v1/Session/${id}`, data, { timeout: 90000 }),
  deleteOrderEditSession: ({ id, data }) =>
    axios.delete(`${BASE_URL}${ORDER_EDIT_SERVICE}/api/v1/Session/${id}`, { data }),
  getChangeOrder: id => axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/ChangeOrder/${id}`),
  changeOrder: data => axios.post(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrder/ChangeOrder`, data),
  // Equipment
  getSpeedToTechnology: params =>
    axios.get(`${BASE_URL}${CONNECTION_EQUIPMENT_SERVICE}/api/v2/BroadbandConnectionEquipment/SpeedToTechnology`, {
      params
    }),
  getEquipmentType: params =>
    axios.get(`${BASE_URL}${CONNECTION_EQUIPMENT_SERVICE}/BroadbandConnectionEquipment/GetEquipmentType`, {
      params
    }),
  // Address
  getSuggestionAddress: params =>
    axios.get(`${BASE_URL}${DADATA_INTEGRATION_SERVICE}/DadataIntegration/GetSuggestionAddress`, { params }),
  checkAddress: params =>
    axios.get(`${BASE_URL}${ADDRESS_INFO_SERVICE}/AddressInfo/CheckAddress`, { params, timeout: 180000 }),
  // Timeslots
  getTimeslots: params => axios.get(`${BASE_URL}${TIMESLOT_SERVICE}/api/v2/Timeslot`, { params, timeout: 90000 }),
  reserveTimeslot: data =>
    axios.post(`${BASE_URL}${TIMESLOT_SERVICE}/Timeslot/ReserveTimeslots`, data, { timeout: 90000 }),
  deleteTimeslot: data =>
    axios.post(`${BASE_URL}${TIMESLOT_SERVICE}/Timeslot/DeleteTimeslot`, data, { timeout: 90000 }),
  checkAutoInterval: params => axios.get(`${BASE_URL}${TIMESLOT_SERVICE}/api/v2/Timeslot/AutoInterval`, { params }),
  changeTimeslot: data => axios.post(`${BASE_URL}${TIMESLOT_SERVICE}/api/v2/Timeslot/Change`, data),
  // Personal
  getDocumentTypes: params =>
    axios.get(`${BASE_URL}${PERSONAL_DOCUMENT_SERVICE}/PersonalDocument/GetDocumentType`, { params }),
  getDocument: params => axios.get(`${BASE_URL}${PERSONAL_DOCUMENT_SERVICE}/PersonalDocument/GetDocument`, { params }),
  // History
  getOrderHistory: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionOrderHistory/GetOrdersHistory`, { params }),
  getOrderCommentHistory: orderId =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/api/v1/BroadbandConnectionOrder/CommentHistory/${orderId}`),
  // Tariff
  getAvailableTariffs: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/api/v1/BroadbandConnectionTariff/Available`, { params }),
  getServicesForSell: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/api/v1/BroadbandConnectionTariff/ServicesForSell`, { params }),
  changeBroadbandServices: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/api/v1/BroadbandConnectionTariff/ChargeBroadbandServices`, {
      params
    }),
  // Number
  getMsisdn: params => axios.get(`${BASE_URL}${MSISDN_RESERVATION_SERVICE}/api/v1/Reservations/numbers`, { params }),
  reserveMsisdn: data =>
    axios.post(`${BASE_URL}${MSISDN_RESERVATION_SERVICE}/api/v1/FullReservations/numbers`, data, { timeout: 60000 }),
  checkMsisdn: params => axios.get(`${BASE_URL}${MSISDN_RESERVATION_SERVICE}/api/v1/NumberRegions`, { params }),
  // Sessions
  getSessionsInfo: params => axios.get(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/OrderSessions`, { params }),
  createSession: data => axios.post(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/OrderSessions`, data),
  closeSession: data => axios.delete(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/OrderSessions`, { data }),
  getSessionTaskTypes: params => axios.get(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/Tasks`, { params }),
  getSessionCloseReasons: params => axios.get(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/Reasons`, { params }),

  getOperatorShifts: params => axios.get(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/OperatorShifts`, { params }),
  createOperatorShifts: data => axios.post(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/OperatorShifts`, data),
  deleteOperatorShifts: data => axios.delete(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/OperatorShifts`, { data }),

  createAutoOrderSession: data => axios.post(`${BASE_URL}${ORDER_SESSION_SERVICE}/api/v1/AutoOrderSession`, { data }),
  // Relocation
  getRelocationInfo: params =>
    axios.get(`${BASE_URL}${ORDER_SERVICE}/BroadbandConnectionRelocationOrder/RelocationInfo`, { params })
}
