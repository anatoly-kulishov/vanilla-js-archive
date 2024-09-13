import {
  changeCheckAddressStatusReducer,
  checkAddressReducer,
  getAddressSuggestionReducer,
  recheckAddressReducer
} from './address'
import {
  getUpSaleEquipmentTypeReducer,
  getUpSaleSpeedToTechnologyReducer,
  getEquipmentTypeReducer,
  getSpeedToTechnologyReducer
} from './equipment'
import { checkMsisdnReducer, getMsisdnReducer, reserveMsisdnReducer } from './number'
import {
  changeBroadbandServicesReducer,
  changeLoadingStatusReducer,
  getBroadbandTariffsReducer,
  getAvailableTariffsReducer,
  getHandbooksReducer,
  getOperationReasonsReducer,
  getOrderHistoryReducer,
  getOrderListReducer,
  getOrderReducer,
  getOrderRtcStatusesReducer,
  getRegionIsoCodeReducer,
  getRegionsReducer,
  getRtcKeyReducer,
  getServicesForSellReducer,
  modifyOrderTimeslotReducer,
  orderActionsReducer,
  performOrderReducer,
  getMacroRegionsReducer,
  checkSubscriberTariffsReducer,
  invoiceEquipmentHistoryReducer,
  saveInvoiceEquipmentReducer,
  modifyOrderReducer,
  getOrderChangeHistoryReducer,
  getOrderEditSessionHistoryReducer,
  getChangeOrderReducer,
  changeOrderReducer,
  createOrderEditSessionReducer,
  modifyOrderEditSessionReducer,
  getOrderEditSessionReducer,
  deleteOrderEditSessionReducer,
  handleChangeManualUpSaleReducer,
  handleChangeAutoUpSaleReducer,
  getRelocationInfoReducer,
  getOrderCommentHistoryReducer,
  getStatusReasonsReducer
} from './order'
import { getDocumentReducer, getDocumentTypesReducer } from './personal'
import { reduceReducers } from './reduceReducers'
import {
  closeSessionReducer,
  createAutoOrderSessionReducer,
  createOperatorShiftsReducer,
  createSessionReducer,
  deleteOperatorShiftsReducer,
  getOperatorShiftsReducer,
  getSessionCloseReducer,
  getSessionsInfoReducer,
  getSessionTypeTasksReducer
} from './sessions'
import { modalVisibilityReducer, numberModalReducer, priceReducer, stateReducer } from './state'
import {
  changeTimeslotReducer,
  checkAutoIntervalReducer,
  deleteTimeslotReducer,
  getTimeslotsReducer,
  reserveTimeslotReducer
} from './timeslots'

export const broadbandReducer = initState =>
  reduceReducers(
    initState,
    // Address
    checkAddressReducer,
    getAddressSuggestionReducer,
    changeCheckAddressStatusReducer,
    recheckAddressReducer,
    // Equipment
    getSpeedToTechnologyReducer,
    getUpSaleSpeedToTechnologyReducer,
    getEquipmentTypeReducer,
    getUpSaleEquipmentTypeReducer,
    // Order
    getOrderReducer,
    changeLoadingStatusReducer,
    getRtcKeyReducer,
    modifyOrderTimeslotReducer,
    orderActionsReducer,
    getBroadbandTariffsReducer,
    getMacroRegionsReducer,
    getRegionsReducer,
    getRegionIsoCodeReducer,
    getHandbooksReducer,
    getStatusReasonsReducer,
    getOrderListReducer,
    getOrderRtcStatusesReducer,
    getOperationReasonsReducer,
    performOrderReducer,
    getOrderHistoryReducer,
    getOrderCommentHistoryReducer,
    getAvailableTariffsReducer,
    getServicesForSellReducer,
    changeBroadbandServicesReducer,
    checkSubscriberTariffsReducer,
    saveInvoiceEquipmentReducer,
    invoiceEquipmentHistoryReducer,
    modifyOrderReducer,
    getOrderChangeHistoryReducer,
    getOrderEditSessionHistoryReducer,
    getOrderEditSessionReducer,
    createOrderEditSessionReducer,
    modifyOrderEditSessionReducer,
    deleteOrderEditSessionReducer,
    getChangeOrderReducer,
    changeOrderReducer,
    // Personal
    getDocumentReducer,
    getDocumentTypesReducer,
    // State
    stateReducer,
    priceReducer,
    numberModalReducer,
    modalVisibilityReducer,
    // Timeslots
    getTimeslotsReducer,
    reserveTimeslotReducer,
    deleteTimeslotReducer,
    checkAutoIntervalReducer,
    changeTimeslotReducer,
    // Number
    getMsisdnReducer,
    reserveMsisdnReducer,
    checkMsisdnReducer,
    // Session
    getSessionsInfoReducer,
    createSessionReducer,
    closeSessionReducer,
    getSessionTypeTasksReducer,
    getSessionCloseReducer,
    getOperatorShiftsReducer,
    createOperatorShiftsReducer,
    deleteOperatorShiftsReducer,
    createAutoOrderSessionReducer,
    // Handlers
    handleChangeManualUpSaleReducer,
    handleChangeAutoUpSaleReducer,
    getRelocationInfoReducer
  )
