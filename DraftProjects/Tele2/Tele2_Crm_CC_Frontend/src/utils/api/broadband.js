import axios from 'axios'
import { broadbandOrder, broadbandEquipment, broadbandAddress, addressInfo, broadbandTimeslots, personalData } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BROADBAND_BE')

export default {
  // Order
  fetchOrder: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetOrder`, { params }),
  fetchOrderList: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetOrderList`, { params }),
  performBroadbandOrder: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/PerformOrder`, data),
  fetchOrderEquipment: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetOrderEquipment`, { params }),
  changeOrderWaitState: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/ChangeOrderWaitState`, data),
  setOrderStatus: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/SetOrderStatus`, data),
  transferOrderToRtc: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/TransferOrderToRtc`, data),
  cancelOrder: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/CancelOrder`, data),
  fetchHandbooks: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetHandbooks`, { params }),
  deleteOrder: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/DeleteOrder`, data),
  fetchOperationReasons: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetOperationReasons`, { params }),
  fetchOrderRtcStatuses: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetRtcStatuses`, { params }),
  fetchMacroRegions: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetMacroRegions`, { params }),
  fetchRegions: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetRegions`, { params }),
  fetchRegionsIsoCode: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetRegionIsoCode`, { params }),
  modifyRtcData: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/ModifyRtcData`, data),
  modifyOrderTimeslot: data => axios.post(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/ModifyOrderTimeslot`, data),
  getAvailableTariffs: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetAvailableTariffs`, { params }),
  getRtcKey: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrder/GetRtcKey`, { params }),
  // History
  getOrderHistory: params => axios.get(`${pathBe}:${broadbandOrder}/BroadbandConnectionOrderHistory/GetOrdersHistory`, { params }),
  // Equipment
  fetchSpeedToTechnology: params => axios.get(`${pathBe}:${broadbandEquipment}/BroadbandConnectionEquipment/GetSpeedToTechnology`, { params }),
  fetchTechnology: params => axios.get(`${pathBe}:${broadbandEquipment}/BroadbandConnectionEquipment/GetTechnology`, { params }),
  fetchEquipmentType: params => axios.get(`${pathBe}:${broadbandEquipment}/BroadbandConnectionEquipment/GetEquipmentType`, { params }),
  fetchEquipmentSegment: params => axios.get(`${pathBe}:${broadbandEquipment}/BroadbandConnectionEquipment/GetEquipmentSegment`, { params }),
  fetchEquipmentOwnership: params => axios.get(`${pathBe}:${broadbandEquipment}/BroadbandConnectionEquipment/GetEquipmentOwnership`, { params }),
  // Address
  fetchSuggestionAddress: params => axios.get(`${pathBe}:${broadbandAddress}/DadataIntegration/GetSuggestionAddress`, { params }),
  checkAddress: params => axios.get(`${pathBe}:${addressInfo}/AddressInfo/CheckAddress`, { params }),
  // Timeslots
  getTimeslots: params => axios.get(`${pathBe}:${broadbandTimeslots}/Timeslot/GetTimeslots`, { params, timeout: 90000 }),
  reserveTimeslots: data => axios.post(`${pathBe}:${broadbandTimeslots}/Timeslot/ReserveTimeslots`, data, { timeout: 90000 }),
  deleteTimeslot: data => axios.post(`${pathBe}:${broadbandTimeslots}/Timeslot/DeleteTimeslot`, data, { timeout: 90000 }),
  // Personal
  getDocumentType: params => axios.get(`${pathBe}:${personalData}/PersonalDocument/GetDocumentType`, { params }),
  getDocument: params => axios.get(`${pathBe}:${personalData}/PersonalDocument/GetDocument`, { params })
}
