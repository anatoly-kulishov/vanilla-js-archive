import { AddressTypes } from '../../constants/address'
import { OrderLoadingStatus } from '../../constants/form'
import {
  processPerformToState,
  parseStatusToState,
  parseOrderToMainState,
  processStatusChanges,
  parseCallDate,
  processSubscriberTariff,
  recalculateFullPrice,
  parseReasonToState
} from '../helpers/order'
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  GET_ORDER_FAILURE,
  GET_RTC_KEY_ERROR,
  GET_RTC_KEY_FAILURE,
  GET_RTC_KEY_SUCCESS,
  MODIFY_ORDER_TIMESLOT_SUCCESS,
  MODIFY_ORDER_TIMESLOT_ERROR,
  MODIFY_ORDER_TIMESLOT_FAILURE,
  PERFORM_ORDER_SUCCESS,
  PERFORM_ORDER_ERROR,
  PERFORM_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS,
  TRANSFER_ORDER_SUCCESS,
  CHANGE_ORDER_WAIT_STATE_SUCCESS,
  DELETE_ORDER_SUCCESS,
  GET_AVAILABLE_TARIFFS_SUCCESS,
  GET_AVAILABLE_TARIFFS_ERROR,
  GET_AVAILABLE_TARIFFS_FAILURE,
  CHANGE_ORDER_LOADING_STATUS,
  GET_ORDER,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_ERROR,
  GET_REGIONS_FAILURE,
  GET_HANDBOOKS_SUCCESS,
  GET_HANDBOOKS_FAILURE,
  GET_HANDBOOKS_ERROR,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_ERROR,
  GET_ORDER_LIST_FAILURE,
  GET_OPERATION_REASONS_SUCCESS,
  GET_OPERATION_REASONS_ERROR,
  GET_OPERATION_REASONS_FAILURE,
  GET_ORDER_RTC_STATUSES_SUCCESS,
  GET_ORDER_RTC_STATUSES_ERROR,
  GET_ORDER_RTC_STATUSES_FAILURE,
  GET_REGION_ISO_CODE_SUCCESS,
  GET_REGION_ISO_CODE_ERROR,
  GET_REGION_ISO_CODE_FAILURE,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_ERROR,
  GET_ORDER_HISTORY_FAILURE,
  GET_AVAILABLE_TARIFFS,
  GET_SERVICES_FOR_SELL,
  GET_SERVICES_FOR_SELL_SUCCESS,
  GET_SERVICES_FOR_SELL_ERROR,
  GET_SERVICES_FOR_SELL_FAILURE,
  CHANGE_BROADBAND_SERVICES,
  CHANGE_BROADBAND_SERVICES_SUCCESS,
  CHANGE_BROADBAND_SERVICES_ERROR,
  CHANGE_BROADBAND_SERVICES_FAILURE,
  CHANGE_ORDER_WAIT_STATE,
  TRANSFER_ORDER,
  CANCEL_ORDER,
  DELETE_ORDER,
  PERFORM_ORDER,
  CHANGE_ORDER_WAIT_STATE_ERROR,
  CHANGE_ORDER_WAIT_STATE_FAILURE,
  TRANSFER_ORDER_ERROR,
  TRANSFER_ORDER_FAILURE,
  CANCEL_ORDER_ERROR,
  CANCEL_ORDER_FAILURE,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_FAILURE,
  GET_BROADBAND_TARIFFS_SUCCESS,
  GET_BROADBAND_TARIFFS_ERROR,
  GET_BROADBAND_TARIFFS_FAILURE,
  GET_BROADBAND_TARIFFS,
  GET_MACRO_REGIONS_SUCCESS,
  GET_MACRO_REGIONS_ERROR,
  GET_MACRO_REGIONS_FAILURE,
  CHECK_SUBSCRIBER_TARIFF,
  CHECK_SUBSCRIBER_TARIFF_SUCCESS,
  CHECK_SUBSCRIBER_TARIFF_ERROR,
  CHECK_SUBSCRIBER_TARIFF_FAILURE,
  GET_INVOICE_EQUIPMENT_HISTORY,
  GET_INVOICE_EQUIPMENT_HISTORY_SUCCESS,
  SAVE_INVOICE_EQUIPMENT,
  SAVE_INVOICE_EQUIPMENT_SUCCESS,
  SAVE_INVOICE_EQUIPMENT_ERROR,
  SAVE_INVOICE_EQUIPMENT_FAILURE,
  MODIFY_ORDER,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_ERROR,
  MODIFY_ORDER_FAILURE,
  GET_ORDER_LIST,
  CHANGE_ORDER,
  CHANGE_ORDER_SUCCESS,
  CHANGE_ORDER_ERROR,
  CHANGE_ORDER_FAILURE,
  GET_ORDER_CHANGE_HISTORY_SUCCESS,
  GET_ORDER_CHANGE_HISTORY_ERROR,
  GET_ORDER_CHANGE_HISTORY_FAILURE,
  GET_ORDER_CHANGE_HISTORY,
  GET_CHANGE_ORDER_SUCCESS,
  GET_CHANGE_ORDER,
  GET_CHANGE_ORDER_ERROR,
  GET_CHANGE_ORDER_FAILURE,
  CREATE_ORDER_EDIT_SESSION,
  CREATE_ORDER_EDIT_SESSION_SUCCESS,
  CREATE_ORDER_EDIT_SESSION_ERROR,
  CREATE_ORDER_EDIT_SESSION_FAILURE,
  MODIFY_ORDER_EDIT_SESSION,
  MODIFY_ORDER_EDIT_SESSION_SUCCESS,
  MODIFY_ORDER_EDIT_SESSION_ERROR,
  MODIFY_ORDER_EDIT_SESSION_FAILURE,
  GET_ORDER_EDIT_SESSION_HISTORY,
  GET_ORDER_EDIT_SESSION_HISTORY_SUCCESS,
  GET_ORDER_EDIT_SESSION_HISTORY_ERROR,
  GET_ORDER_EDIT_SESSION_HISTORY_FAILURE,
  GET_ORDER_EDIT_SESSION,
  GET_ORDER_EDIT_SESSION_SUCCESS,
  GET_ORDER_EDIT_SESSION_ERROR,
  GET_ORDER_EDIT_SESSION_FAILURE,
  DELETE_ORDER_EDIT_SESSION,
  DELETE_ORDER_EDIT_SESSION_SUCCESS,
  DELETE_ORDER_EDIT_SESSION_ERROR,
  DELETE_ORDER_EDIT_SESSION_FAILURE,
  HANDLE_CHANGE_MANUAL_UPSALE,
  HANDLE_CHANGE_MANUAL_UPSALE_SUCCESS,
  HANDLE_CHANGE_MANUAL_UPSALE_ERROR,
  HANDLE_CHANGE_AUTO_UPSALE,
  HANDLE_CHANGE_AUTO_UPSALE_SUCCESS,
  HANDLE_CHANGE_AUTO_UPSALE_ERROR,
  GET_RELOCATION_INFO,
  GET_RELOCATION_INFO_SUCCESS,
  GET_RELOCATION_INFO_ERROR,
  GET_RELOCATION_INFO_FAILURE,
  GET_ORDER_COMMENT_HISTORY,
  GET_ORDER_COMMENT_HISTORY_SUCCESS,
  GET_ORDER_COMMENT_HISTORY_ERROR,
  GET_ORDER_COMMENT_HISTORY_FAILURE,
  GET_STATUS_REASONS_SUCCESS,
  GET_STATUS_REASONS_ERROR,
  GET_STATUS_REASONS_FAILURE,
  GET_STATUS_REASONS
} from '../constants/actionTypes'
import { initialState, StateStatus } from '../constants/initialState'

import { parseAddressToSuggestions } from '../helpers/orderAddress'

export function getOrderReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ORDER:
      state.order.isLoading = true
      break
    case GET_ORDER_SUCCESS:
      state.order = { isLoading: false, data: payload }
      state.orderState = parseOrderToMainState(state, payload)
      state.orderStatusState = parseStatusToState(payload)
      state.orderReasonState = parseReasonToState(payload)
      state.orderLoadingStatus = OrderLoadingStatus.OrderReady
      state.addressSuggestion[AddressTypes.Installation] = parseAddressToSuggestions(payload?.Address)
      state.callDate = parseCallDate(payload)
      break
    case GET_ORDER_ERROR:
    case GET_ORDER_FAILURE:
      state.order.isLoading = false
      break
    default:
      break
  }
}

export function changeLoadingStatusReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_ORDER_LOADING_STATUS:
      state.orderLoadingStatus = payload
      break
    default:
      break
  }
}

export function getRtcKeyReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_RTC_KEY_SUCCESS:
      state.rtcKey = payload
      break
    case GET_RTC_KEY_ERROR:
    case GET_RTC_KEY_FAILURE:
      break
    default:
      break
  }
}

export function modifyOrderTimeslotReducer (state, action) {
  const { type } = action
  switch (type) {
    case MODIFY_ORDER_TIMESLOT_SUCCESS:
      state.autoActions.reserveTimeslot = StateStatus.NotReady
      state.isRescheduleModalVisible = false
      break
    case MODIFY_ORDER_TIMESLOT_ERROR:
    case MODIFY_ORDER_TIMESLOT_FAILURE:
      break
    default:
      break
  }
}

export function orderActionsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_ORDER_WAIT_STATE:
    case TRANSFER_ORDER:
    case CANCEL_ORDER:
    case DELETE_ORDER:
      state.isOrderActionLoading = true
      break
    case CHANGE_ORDER_WAIT_STATE_SUCCESS:
    case TRANSFER_ORDER_SUCCESS:
    case CANCEL_ORDER_SUCCESS:
    case DELETE_ORDER_SUCCESS:
      state.orderState.OrderId = payload?.OrderId || state.orderState.OrderId
      state.orderStatusState = processStatusChanges(state, payload)
      state.isOrderActionLoading = false
      state.autoActions.closeAfterAction = StateStatus.NeedAction

      if (type === TRANSFER_ORDER_SUCCESS) {
        state.orderReasonState = parseReasonToState(payload)
        state.orderState.CrmOrderId = payload?.CrmOrderId || state.orderState.CrmOrderId
      }
      break
    case CHANGE_ORDER_WAIT_STATE_ERROR:
    case CHANGE_ORDER_WAIT_STATE_FAILURE:
    case TRANSFER_ORDER_ERROR:
    case TRANSFER_ORDER_FAILURE:
    case CANCEL_ORDER_ERROR:
    case CANCEL_ORDER_FAILURE:
    case DELETE_ORDER_ERROR:
    case DELETE_ORDER_FAILURE:
      state.isOrderActionLoading = false
      break
    default:
      break
  }
}

export function getBroadbandTariffsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_BROADBAND_TARIFFS:
      state.broadbandTariffsState.isLoading = true
      break
    case GET_BROADBAND_TARIFFS_SUCCESS:
      state.broadbandTariffsState = { isLoading: false, data: payload }
      break
    case GET_BROADBAND_TARIFFS_ERROR:
    case GET_BROADBAND_TARIFFS_FAILURE:
      state.broadbandTariffsState.isLoading = false
      break
    default:
      break
  }
}

export function getMacroRegionsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_MACRO_REGIONS_SUCCESS:
      state.macroRegions = payload
      break
    case GET_MACRO_REGIONS_ERROR:
    case GET_MACRO_REGIONS_FAILURE:
      break
    default:
      break
  }
}

export function getRegionsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_REGIONS_SUCCESS:
      state.regions = payload
      break
    case GET_REGIONS_ERROR:
    case GET_REGIONS_FAILURE:
      break
    default:
      break
  }
}

export function getRegionIsoCodeReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_REGION_ISO_CODE_SUCCESS:
      state.regionIsoCodeState = payload
      state.autoActions.regionIsoCode = StateStatus.NeedAction
      break
    case GET_REGION_ISO_CODE_ERROR:
    case GET_REGION_ISO_CODE_FAILURE:
      break
    default:
      break
  }
}

export function getHandbooksReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_HANDBOOKS_SUCCESS:
      state.handbooks = payload
      break
    case GET_HANDBOOKS_ERROR:
    case GET_HANDBOOKS_FAILURE:
      break
    default:
      break
  }
}

export function getStatusReasonsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_STATUS_REASONS:
      state.statusReasons.data = []
      state.statusReasons.isLoading = true
      state.statusReasons.isError = false
      break
    case GET_STATUS_REASONS_SUCCESS:
      state.statusReasons.data = payload
      state.statusReasons.isLoading = false
      break
    case GET_STATUS_REASONS_ERROR:
    case GET_STATUS_REASONS_FAILURE:
      state.statusReasons.isLoading = false
      state.statusReasons.isError = true
      break
    default:
      break
  }
}

export function getOrderListReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ORDER_LIST:
      state.orderList.isLoading = true
      break
    case GET_ORDER_LIST_SUCCESS:
      state.orderList.data = payload
      state.orderList.isLoading = false
      break
    case GET_ORDER_LIST_ERROR:
    case GET_ORDER_LIST_FAILURE:
      state.orderList.isLoading = false
      break
    default:
      break
  }
}

export function getOrderRtcStatusesReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ORDER_RTC_STATUSES_SUCCESS:
      state.rtcStatuses = payload
      break
    case GET_ORDER_RTC_STATUSES_ERROR:
    case GET_ORDER_RTC_STATUSES_FAILURE:
      break
    default:
      break
  }
}

export function getOperationReasonsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_OPERATION_REASONS_SUCCESS:
      state.operationReasons = payload
      break
    case GET_OPERATION_REASONS_ERROR:
    case GET_OPERATION_REASONS_FAILURE:
      break
    default:
      break
  }
}

export function performOrderReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case PERFORM_ORDER:
      state.perform.isLoading = true
      state.isOrderActionLoading = true
      break
    case PERFORM_ORDER_SUCCESS:
      state.isFormChanged = false
      state.autoActions.afterPerform = StateStatus.NeedAction
      state.autoActions.afterEquipmentType = StateStatus.NotAvailable
      state.orderState = processPerformToState(state, payload)
      state.orderStatusState = processStatusChanges(state, payload)
      state.isOrderActionLoading = false
      state.perform = { isLoading: false, data: payload }
    // esling
    case PERFORM_ORDER_ERROR: // eslint-disable-line
    case PERFORM_ORDER_FAILURE:
      state.orderState = processPerformToState(state, payload)
      state.orderStatusState = processStatusChanges(state, payload)
      state.isOrderActionLoading = false
      state.perform = { isLoading: false, data: payload }
      state.autoActions.afterPerform = StateStatus.NeedAction
      break
    default:
      break
  }
}

export function getOrderHistoryReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ORDER_HISTORY_SUCCESS:
      state.orderHistory = payload
      break
    case GET_ORDER_HISTORY_ERROR:
    case GET_ORDER_HISTORY_FAILURE:
      break
    default:
      break
  }
}

export function getOrderCommentHistoryReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ORDER_COMMENT_HISTORY:
      state.orderCommentHistory.data = initialState.orderCommentHistory.data
      state.orderCommentHistory.isLoading = true
      break
    case GET_ORDER_COMMENT_HISTORY_SUCCESS:
      state.orderCommentHistory.data = payload
      state.orderCommentHistory.isLoading = false
      break
    case GET_ORDER_COMMENT_HISTORY_ERROR:
    case GET_ORDER_COMMENT_HISTORY_FAILURE:
      state.orderCommentHistory.isLoading = false
      break
    default:
      break
  }
}

export function getAvailableTariffsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_AVAILABLE_TARIFFS:
      state.availableTariffsState = { ...initialState.availableTariffsState, isLoading: true }
      break
    case GET_AVAILABLE_TARIFFS_SUCCESS:
      state.availableTariffsState = { isLoading: false, data: payload }
      break
    case GET_AVAILABLE_TARIFFS_ERROR:
    case GET_AVAILABLE_TARIFFS_FAILURE:
      state.availableTariffsState.isError = true
      state.availableTariffsState.isLoading = false
      break
    default:
      break
  }
}

export function checkSubscriberTariffsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHECK_SUBSCRIBER_TARIFF:
      state.subscriberTariffState.isLoading = true
      break
    case CHECK_SUBSCRIBER_TARIFF_SUCCESS:
      state.subscriberTariffState = { isLoading: false, data: payload }
      state.orderState.Agreement = processSubscriberTariff(state.orderState, payload)
      break
    case CHECK_SUBSCRIBER_TARIFF_ERROR:
    case CHECK_SUBSCRIBER_TARIFF_FAILURE:
      state.subscriberTariffState.isLoading = false
      break
    default:
      break
  }
}

export function getServicesForSellReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_SERVICES_FOR_SELL:
      state.servicesForSellState.isLoading = true
      break
    case GET_SERVICES_FOR_SELL_SUCCESS:
      state.servicesForSellState = { isLoading: false, data: payload }
      break
    case GET_SERVICES_FOR_SELL_ERROR:
    case GET_SERVICES_FOR_SELL_FAILURE:
      state.servicesForSellState.isLoading = false
      state.servicesForSellState.isError = true
      break
    default:
      break
  }
}

export function changeBroadbandServicesReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_BROADBAND_SERVICES:
      state.tariffConstructorCosts.isLoading = true
      break
    case CHANGE_BROADBAND_SERVICES_SUCCESS:
      state.tariffConstructorCosts = { isLoading: false, data: payload }
      break
    case CHANGE_BROADBAND_SERVICES_ERROR:
    case CHANGE_BROADBAND_SERVICES_FAILURE:
      state.tariffConstructorCosts.isLoading = false
      break
    default:
      break
  }
}

export function saveInvoiceEquipmentReducer (state, action) {
  const { type } = action
  switch (type) {
    case SAVE_INVOICE_EQUIPMENT:
      break
    case SAVE_INVOICE_EQUIPMENT_SUCCESS:
      state.isManualUpSaleModalVisible = false
      break
    case SAVE_INVOICE_EQUIPMENT_ERROR:
    case SAVE_INVOICE_EQUIPMENT_FAILURE:
      break
    default:
      break
  }
}

export function invoiceEquipmentHistoryReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_INVOICE_EQUIPMENT_HISTORY:
      state.invoiceHistoryState.isLoading = true
      break
    case GET_INVOICE_EQUIPMENT_HISTORY_SUCCESS:
      state.invoiceHistoryState.isLoading = false
      state.invoiceHistoryState.data = payload
      break
    case GET_AVAILABLE_TARIFFS_ERROR:
    case GET_AVAILABLE_TARIFFS_FAILURE:
      state.invoiceHistoryState.isLoading = false
      break
    default:
      break
  }
}

export function modifyOrderReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case MODIFY_ORDER:
      state.modifyOrderState = { isLoading: true, isSuccess: false }
      break
    case MODIFY_ORDER_SUCCESS:
      const { BusinessChannelKey, SystemId, ContactPoint } = payload ?? {}

      state.modifyOrderState = { isLoading: false, isSuccess: true }

      state.orderState.BusinessChannelKey = BusinessChannelKey
      state.orderState.SystemId = SystemId
      state.orderState.ContactPoint = ContactPoint

      break
    case MODIFY_ORDER_ERROR:
    case MODIFY_ORDER_FAILURE:
      state.modifyOrderState = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function getOrderChangeHistoryReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ORDER_CHANGE_HISTORY:
      state.orderChangeHistory = { isLoading: true, isSuccess: false }
      break
    case GET_ORDER_CHANGE_HISTORY_SUCCESS:
      state.orderChangeHistory = { data: payload, isLoading: false, isSuccess: true }
      break
    case GET_ORDER_CHANGE_HISTORY_ERROR:
    case GET_ORDER_CHANGE_HISTORY_FAILURE:
      state.orderChangeHistory = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function getOrderEditSessionHistoryReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ORDER_EDIT_SESSION_HISTORY:
      state.orderEditSessionHistory = { isLoading: true, isSuccess: false }
      break
    case GET_ORDER_EDIT_SESSION_HISTORY_SUCCESS:
      state.orderEditSessionHistory = { data: payload, isLoading: false, isSuccess: true }
      break
    case GET_ORDER_EDIT_SESSION_HISTORY_ERROR:
    case GET_ORDER_EDIT_SESSION_HISTORY_FAILURE:
      state.orderEditSessionHistory = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function getOrderEditSessionReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ORDER_EDIT_SESSION:
      state.orderEditSessionState = { isLoading: true, isSuccess: false }
      break
    case GET_ORDER_EDIT_SESSION_SUCCESS:
      state.orderEditSessionState = { data: payload, isLoading: false, isSuccess: true }
      break
    case GET_ORDER_EDIT_SESSION_ERROR:
    case GET_ORDER_EDIT_SESSION_FAILURE:
      state.orderEditSessionState = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function createOrderEditSessionReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_ORDER_EDIT_SESSION:
      state.createOrderEditSessionState = { isLoading: true, isSuccess: false }
      break
    case CREATE_ORDER_EDIT_SESSION_SUCCESS:
      state.createOrderEditSessionState = { data: payload, isLoading: false, isSuccess: true }
      break
    case CREATE_ORDER_EDIT_SESSION_ERROR:
    case CREATE_ORDER_EDIT_SESSION_FAILURE:
      state.createOrderEditSessionState = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function modifyOrderEditSessionReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case MODIFY_ORDER_EDIT_SESSION:
      state.modifyOrderEditSessionState = { isLoading: true, isSuccess: false }
      break
    case MODIFY_ORDER_EDIT_SESSION_SUCCESS:
      state.modifyOrderEditSessionState = { data: payload, isLoading: false, isSuccess: true }
      break
    case MODIFY_ORDER_EDIT_SESSION_ERROR:
    case MODIFY_ORDER_EDIT_SESSION_FAILURE:
      state.modifyOrderEditSessionState = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function deleteOrderEditSessionReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case DELETE_ORDER_EDIT_SESSION:
      state.deleteOrderEditSessionState = { isLoading: true, isSuccess: false }
      break
    case DELETE_ORDER_EDIT_SESSION_SUCCESS:
      state.deleteOrderEditSessionState = { data: payload, isLoading: false, isSuccess: true }
      state.isAutoUpSaleModalVisible = false
      state.isCancelAutoUpSaleModalVisible = false
      break
    case DELETE_ORDER_EDIT_SESSION_ERROR:
    case DELETE_ORDER_EDIT_SESSION_FAILURE:
      state.deleteOrderEditSessionState = { isLoading: false, isSuccess: false }
      state.isAutoUpSaleModalVisible = false
      state.isCancelAutoUpSaleModalVisible = false
      break
    default:
      break
  }
}

export function getChangeOrderReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case GET_CHANGE_ORDER:
      state.changedOrder = { isLoading: true, isSuccess: false }
      break
    case GET_CHANGE_ORDER_SUCCESS:
      state.changedOrder = { data: payload, isLoading: false, isSuccess: true }
      break
    case GET_CHANGE_ORDER_ERROR:
    case GET_CHANGE_ORDER_FAILURE:
      state.changedOrder = { isLoading: false, isSuccess: false }
      break
    default:
      break
  }
}

export function changeOrderReducer (state, action) {
  const { type } = action

  switch (type) {
    case CHANGE_ORDER:
      state.changeOrder = { isLoading: true, isSuccess: false }
      break
    case CHANGE_ORDER_SUCCESS:
      state.changeOrder = { isLoading: false, isSuccess: true }
      break
    case CHANGE_ORDER_ERROR:
    case CHANGE_ORDER_FAILURE:
      state.changeOrder = { isLoading: false }
      break
    default:
      break
  }
}

export function handleChangeManualUpSaleReducer (state, action) {
  const { type } = action

  switch (type) {
    case HANDLE_CHANGE_MANUAL_UPSALE:
      state.isChangeManualUpSaleLoading = true
      break
    case HANDLE_CHANGE_MANUAL_UPSALE_SUCCESS:
      state.isChangeManualUpSaleLoading = false

      state.prices = recalculateFullPrice(state)

      state.autoActions.refillForm = StateStatus.NeedAction
      state.isManualUpSaleModalVisible = false
      break
    case HANDLE_CHANGE_MANUAL_UPSALE_ERROR:
      state.isChangeManualUpSaleLoading = false
      break
    default:
      break
  }
}

export function handleChangeAutoUpSaleReducer (state, action) {
  const { type } = action

  switch (type) {
    case HANDLE_CHANGE_AUTO_UPSALE:
      state.isChangeAutoUpSaleLoading = true
      break
    case HANDLE_CHANGE_AUTO_UPSALE_SUCCESS:
      state.isChangeAutoUpSaleLoading = false

      state.prices = recalculateFullPrice(state)

      state.autoActions.refillForm = StateStatus.NeedAction
      state.isAutoUpSaleModalVisible = false
      break
    case HANDLE_CHANGE_AUTO_UPSALE_ERROR:
      state.isChangeAutoUpSaleLoading = false
      break
    default:
      break
  }
}

export function getRelocationInfoReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_RELOCATION_INFO:
      state.relocationInfo.isLoading = true
      break
    case GET_RELOCATION_INFO_SUCCESS:
      state.relocationInfo.isLoading = false
      state.relocationInfo.data = payload
      state.relocationInfo.status = OrderLoadingStatus.Finished
      state.autoActions.afterRelocationInfo = StateStatus.NeedAction
      break
    case GET_RELOCATION_INFO_ERROR:
    case GET_RELOCATION_INFO_FAILURE:
      state.relocationInfo.isLoading = false
      state.relocationInfo.status = OrderLoadingStatus.Finished
      break
    default:
      break
  }
}
