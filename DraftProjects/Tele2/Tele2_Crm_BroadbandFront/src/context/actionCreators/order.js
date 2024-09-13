import { isNil, isBoolean } from 'lodash-es'
import api from 'utils/api'
import {
  GET_ORDER,
  GET_ORDER_FAILURE,
  GET_RTC_KEY,
  GET_RTC_KEY_FAILURE,
  GET_AVAILABLE_TARIFFS,
  GET_AVAILABLE_TARIFFS_FAILURE,
  MODIFY_ORDER_TIMESLOT,
  MODIFY_ORDER_TIMESLOT_FAILURE,
  GET_REGIONS_FAILURE,
  GET_REGIONS,
  GET_REGION_ISO_CODE,
  GET_REGION_ISO_CODE_FAILURE,
  GET_HANDBOOKS,
  GET_HANDBOOKS_FAILURE,
  GET_ORDER_LIST,
  GET_ORDER_LIST_FAILURE,
  CHANGE_ORDER_LOADING_STATUS,
  GET_OPERATION_REASONS,
  GET_OPERATION_REASONS_FAILURE,
  GET_ORDER_RTC_STATUSES_FAILURE,
  GET_ORDER_RTC_STATUSES,
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_FAILURE,
  GET_SERVICES_FOR_SELL,
  GET_SERVICES_FOR_SELL_FAILURE,
  CHANGE_BROADBAND_SERVICES,
  CHANGE_BROADBAND_SERVICES_FAILURE,
  GET_BROADBAND_TARIFFS,
  GET_BROADBAND_TARIFFS_FAILURE,
  MODIFY_RTC_DATA_FAILURE,
  MODIFY_RTC_DATA,
  GET_MACRO_REGIONS,
  GET_MACRO_REGIONS_FAILURE,
  CHECK_SUBSCRIBER_TARIFF,
  CHECK_SUBSCRIBER_TARIFF_FAILURE,
  SAVE_INVOICE_EQUIPMENT,
  SAVE_INVOICE_EQUIPMENT_FAILURE,
  GET_INVOICE_EQUIPMENT_HISTORY,
  GET_INVOICE_EQUIPMENT_HISTORY_FAILURE,
  MODIFY_ORDER,
  MODIFY_ORDER_FAILURE,
  CHANGE_ORDER_FAILURE,
  CHANGE_ORDER,
  GET_ORDER_CHANGE_HISTORY,
  GET_ORDER_CHANGE_HISTORY_FAILURE,
  GET_CHANGE_ORDER_FAILURE,
  GET_CHANGE_ORDER,
  CREATE_ORDER_EDIT_SESSION,
  CREATE_ORDER_EDIT_SESSION_FAILURE,
  MODIFY_ORDER_EDIT_SESSION,
  MODIFY_ORDER_EDIT_SESSION_FAILURE,
  GET_ORDER_EDIT_SESSION_HISTORY,
  GET_ORDER_EDIT_SESSION_HISTORY_FAILURE,
  GET_ORDER_EDIT_SESSION,
  GET_ORDER_EDIT_SESSION_FAILURE,
  DELETE_ORDER_EDIT_SESSION,
  DELETE_ORDER_EDIT_SESSION_FAILURE,
  CHANGE_AUTO_UPSALE_MODAL_VISIBILITY,
  MODIFY_ORDER_EDIT_SESSION_SUCCESS,
  CHANGE_ORDER_SUCCESS,
  HANDLE_CHANGE_MANUAL_UPSALE,
  HANDLE_CHANGE_MANUAL_UPSALE_ERROR,
  HANDLE_CHANGE_MANUAL_UPSALE_SUCCESS,
  HANDLE_CHANGE_AUTO_UPSALE,
  HANDLE_CHANGE_AUTO_UPSALE_ERROR,
  HANDLE_CHANGE_AUTO_UPSALE_SUCCESS,
  GET_RELOCATION_INFO,
  GET_RELOCATION_INFO_FAILURE,
  GET_ORDER_COMMENT_HISTORY,
  GET_ORDER_COMMENT_HISTORY_FAILURE,
  GET_STATUS_REASONS,
  GET_STATUS_REASONS_FAILURE
} from '../constants/actionTypes'
import { showErrorNotification, processRequestResult, processRestRequestResult, showWarnNotification } from './helpers'
import { getEquipmentTypeRequest, getSpeedToTechRequest } from './equipment'
import { getDocumentRequest } from './personal'
import { getTimeslotsRequest } from './timeslots'
import { isStringFalsy } from 'helpers/index'
import { OrderLoadingStatus } from '../../constants/form'
import { OrderStatuses } from 'constants/orderStatuses'
import { getSpeedToTechnologyParams } from 'helpers/speedToTechnology'
import { prepareCreateOrderEditSessionData } from 'components/Broadband/helpers/order'
import { getSpeedToTechnologyServiceId } from 'components/Broadband/helpers/broadband'
import servicesMessageTypes from 'constants/servicesMessageTypes'

const {
  getOrder,
  getRtcKey,
  getBroadbandTariffs,
  modifyOrderTimeslot,
  getMacroRegions,
  getRegions,
  getRegionIsoCode,
  getHandbooks,
  getOrderList,
  getOrderRtcStatuses,
  getOperationReasons,
  getOrderHistory,
  getAvailableTariffs,
  getServicesForSell,
  changeBroadbandServices,
  saveInvoiceEquipment,
  getInvoiceEquipmentHistory,
  modifyOrder,
  getOrderChangeHistory,
  getOrderEditSessionHistory,
  getOrderEditSession,
  createOrderEditSession,
  modifyOrderEditSession,
  deleteOrderEditSession,
  getChangeOrder,
  changeOrder,
  getRelocationInfo,
  getOrderCommentHistory,
  getStatusReasons
} = api

function finishOrderLoading (dispatch) {
  dispatch({ type: CHANGE_ORDER_LOADING_STATUS, payload: OrderLoadingStatus.Finished })
}

export async function getOrderAC (dispatch, payload, options) {
  dispatch({ type: CHANGE_ORDER_LOADING_STATUS, payload: OrderLoadingStatus.NotLoaded })

  const { orderParams, subscriberRatePlanId } = payload
  const orderResult = await getOrderRequest(dispatch, orderParams, options)

  // GetOrderHistory after GetOrder
  if (orderResult?.OrderId) {
    const orderHistoryParams = { OrderId: orderResult?.OrderId }
    getOrderHistoryRequest(dispatch, orderHistoryParams, options)
  }

  // GetDocument after GetOrder
  if (orderResult?.Person?.PersonalDataId) {
    const documentParams = { PersonalDataId: orderResult?.Person?.PersonalDataId }
    getDocumentRequest(dispatch, documentParams, options)
  }

  const isStatusOk = ![
    OrderStatuses.Cancelled,
    OrderStatuses.CancelledByRtc,
    OrderStatuses.Deleted,
    OrderStatuses.InstallationDone
  ].includes(orderResult?.StatusId)

  // GetTimeslots after GetOrder
  if (isBoolean(orderResult?.IsOnlime) && !orderResult?.RtcTimeSlotId && orderResult?.RtcTechnologyId && isStatusOk) {
    const timeslotsParams = {
      IsOnlime: orderResult?.IsOnlime,
      RtcOrderId: orderResult?.RtcOrderId,
      OrponId: orderResult?.Address?.OrponId,
      FlatName: orderResult?.Address?.FlatName,
      RtcTechnologyId: orderResult?.RtcTechnologyId,
      RegionCode: orderResult?.OrderRegionCode,
      OrderId: orderResult?.OrderId,
      KladrRegion: orderResult?.KladrRegion
    }
    getTimeslotsRequest(dispatch, timeslotsParams, options)
  }

  // GetRtcKey after GetOrder
  if (isStringFalsy(orderResult?.Address?.RegionCode) || isNil(orderResult?.IsOnlime)) {
    finishOrderLoading(dispatch)
    return
  }
  const rtcKeyParams = { RegionCode: orderResult?.Address?.RegionCode, IsOnlime: orderResult?.IsOnlime }
  const rtcKey = await getRtcKeyRequest(dispatch, rtcKeyParams, options)

  // GetSpeedToTechnology after GetOrder
  if (!rtcKey || !orderResult?.AvailableSpeedValue || !orderResult?.AvailableTechnology) {
    finishOrderLoading(dispatch)
    return
  }
  const speedToTechParams = {
    ...getSpeedToTechnologyParams(orderResult, subscriberRatePlanId),
    RtcKey: rtcKey,
    MaxSpeed: orderResult?.AvailableSpeedValue,
    Technology: orderResult?.AvailableTechnology
  }
  const speedToTechResult = await getSpeedToTechRequest(dispatch, speedToTechParams, options)

  // GetEquipmentType after GetOrder
  if (!orderResult?.BcSpeedId || !orderResult?.TechnologyId) {
    finishOrderLoading(dispatch)
    return
  }
  const serviceId = getSpeedToTechnologyServiceId(orderResult, speedToTechResult)
  const equipmentTypeParams = {
    SpeedId: orderResult?.BcSpeedId,
    TechnologyId: orderResult?.TechnologyId,
    RtcKey: rtcKey,
    IsAgreementRtc: orderResult?.Relocation
      ? undefined
      : orderResult?.StatusId < OrderStatuses.TransferredToRtc
        ? false
        : undefined,
    IsFederal: true
  }
  serviceId && getEquipmentTypeRequest(dispatch, equipmentTypeParams, options)
}

async function getOrderRequest (dispatch, params, options) {
  dispatch({ type: GET_ORDER })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getOrder(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_ORDER, {
      notifications: {
        error: { msg: 'Загрузка заявки ШПД.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Загрузка заявки ШПД.', description: `Ошибка. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Загрузка заявки ШПД.')
    return null
  }
}

export async function getRtcKeyRequest (dispatch, params, options) {
  dispatch({ type: GET_RTC_KEY })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getRtcKey(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_RTC_KEY, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_RTC_KEY_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getBroadbandTariffsAC (dispatch, payload, options) {
  await getBroadbandTariffsRequest(dispatch, payload, options)
}

async function getBroadbandTariffsRequest (dispatch, params, options) {
  dispatch({ type: GET_BROADBAND_TARIFFS })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getBroadbandTariffs(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_BROADBAND_TARIFFS, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_BROADBAND_TARIFFS_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function modifyOrderTimeslotAC (dispatch, payload, options) {
  await modifyOrderTimeslotRequest(dispatch, payload, options)
}

async function modifyOrderTimeslotRequest (dispatch, params, options) {
  dispatch({ type: MODIFY_ORDER_TIMESLOT })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await modifyOrderTimeslot(params)
    const { data } = response
    const { result, action } = processRequestResult(data, MODIFY_ORDER_TIMESLOT, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: MODIFY_ORDER_TIMESLOT_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getMacroRegionsAC (dispatch, payload, options) {
  await getMacroRegionsRequest(dispatch, payload, options)
}

async function getMacroRegionsRequest (dispatch, params, options) {
  dispatch({ type: GET_MACRO_REGIONS })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getMacroRegions(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_MACRO_REGIONS, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_MACRO_REGIONS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getRegionsAC (dispatch, payload, options) {
  await getRegionsRequest(dispatch, payload, options)
}

async function getRegionsRequest (dispatch, params, options) {
  dispatch({ type: GET_REGIONS })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getRegions(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_REGIONS, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_REGIONS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getRegionIsoCodeAC (dispatch, payload, options) {
  await getRegionIsoCodeRequest(dispatch, payload, options)
}

async function getRegionIsoCodeRequest (dispatch, params, options) {
  dispatch({ type: GET_REGION_ISO_CODE })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getRegionIsoCode(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_REGION_ISO_CODE, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_REGION_ISO_CODE_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getStatusReasonsAC (dispatch, payload, options) {
  await getStatusReasonsRequest(dispatch, payload, options)
}

async function getStatusReasonsRequest (dispatch, params, options) {
  dispatch({ type: GET_STATUS_REASONS })
  try {
    const { checkIsNotificationEnabled } = options
    const res = await getStatusReasons(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_STATUS_REASONS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_STATUS_REASONS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getHandbooksAC (dispatch, payload, options) {
  await getHandbooksRequest(dispatch, payload, options)
}

async function getHandbooksRequest (dispatch, params, options) {
  dispatch({ type: GET_HANDBOOKS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getHandbooks(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_HANDBOOKS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_HANDBOOKS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export function getOrderListAC (dispatch, payload, options) {
  return getOrderListRequest(dispatch, payload, options)
}

async function getOrderListRequest (dispatch, params, options) {
  dispatch({ type: GET_ORDER_LIST })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOrderList(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_ORDER_LIST, {
      notifications: {
        error: { msg: 'Список заявок ШПД.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Список заявок ШПД.', description: `Ошибка. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_LIST_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Список заявок ШПД.')
    return null
  }
}

export async function getOrderRtcStatusesAC (dispatch, payload, options) {
  await getOrderRtcStatusesRequest(dispatch, payload, options)
}

async function getOrderRtcStatusesRequest (dispatch, params, options) {
  dispatch({ type: GET_ORDER_RTC_STATUSES })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOrderRtcStatuses(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_ORDER_RTC_STATUSES, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_RTC_STATUSES_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOperationReasonsAC (dispatch, payload, options) {
  await getOperationReasonsRequest(dispatch, payload, options)
}

async function getOperationReasonsRequest (dispatch, params, options) {
  dispatch({ type: GET_OPERATION_REASONS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOperationReasons(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_OPERATION_REASONS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_OPERATION_REASONS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOrderHistoryAC (dispatch, payload, options) {
  await getOrderHistoryRequest(dispatch, payload, options)
}

async function getOrderHistoryRequest (dispatch, params, options) {
  dispatch({ type: GET_ORDER_HISTORY })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOrderHistory(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_ORDER_HISTORY, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_HISTORY_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOrderCommentHistoryAC (dispatch, payload, options) {
  await getOrderCommentHistoryRequest(dispatch, payload, options)
}

async function getOrderCommentHistoryRequest (dispatch, params, options) {
  dispatch({ type: GET_ORDER_COMMENT_HISTORY })
  const { checkIsNotificationEnabled } = options

  try {
    const res = await getOrderCommentHistory(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_ORDER_COMMENT_HISTORY, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_COMMENT_HISTORY_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getAvailableTariffsAC (dispatch, payload, options) {
  await getAvailableTariffsRequest(dispatch, payload, options)
}

async function getAvailableTariffsRequest (dispatch, params, options) {
  dispatch({ type: GET_AVAILABLE_TARIFFS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getAvailableTariffs(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_AVAILABLE_TARIFFS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_AVAILABLE_TARIFFS_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getServicesForSellAC (dispatch, payload, options) {
  await getServicesForSellRequest(dispatch, payload, options)
}

async function getServicesForSellRequest (dispatch, params, options) {
  dispatch({ type: GET_SERVICES_FOR_SELL })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getServicesForSell(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_SERVICES_FOR_SELL, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_SERVICES_FOR_SELL_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function changeBroadbandServicesAC (dispatch, payload, options) {
  await changeBroadbandServicesRequest(dispatch, payload, options)
}

async function changeBroadbandServicesRequest (dispatch, params, options) {
  dispatch({ type: CHANGE_BROADBAND_SERVICES })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await changeBroadbandServices(params)
    const { data } = res
    const { result, action } = processRequestResult(data, CHANGE_BROADBAND_SERVICES, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CHANGE_BROADBAND_SERVICES_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function modifyRtcDataAC (dispatch, payload, options) {
  await modifyRtcDataRequest(dispatch, payload, options)
}

async function modifyRtcDataRequest (dispatch, params, options) {
  dispatch({ type: MODIFY_RTC_DATA })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await changeBroadbandServices(params)
    const { data } = res
    const { result, action } = processRequestResult(data, MODIFY_RTC_DATA, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: MODIFY_RTC_DATA_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function checkSubscriberTariffAC (dispatch, payload, options) {
  await checkSubscriberTariffRequest(dispatch, payload, options)
}

async function checkSubscriberTariffRequest (dispatch, params, options) {
  dispatch({ type: CHECK_SUBSCRIBER_TARIFF })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getAvailableTariffs(params) // same request as get available tariffs
    const { data } = res
    const { result, action } = processRequestResult(data, CHECK_SUBSCRIBER_TARIFF, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CHECK_SUBSCRIBER_TARIFF_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}
export async function saveInvoiceEquipmentAC (dispatch, payload, options) {
  await saveInvoiceEquipmentRequest(dispatch, payload, options)
}

async function saveInvoiceEquipmentRequest (dispatch, params, options) {
  dispatch({ type: SAVE_INVOICE_EQUIPMENT })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await saveInvoiceEquipment(params)
    const { data } = res
    const { result, action } = processRequestResult(data, SAVE_INVOICE_EQUIPMENT, {
      notifications: { success: 'Оборудование успешно сохранено' },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: SAVE_INVOICE_EQUIPMENT_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getInvoiceEquipmentHistoryAC (dispatch, payload, options) {
  await getInvoiceEquipmentHistoryRequest(dispatch, payload, options)
}

async function getInvoiceEquipmentHistoryRequest (dispatch, params, options) {
  dispatch({ type: GET_INVOICE_EQUIPMENT_HISTORY })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getInvoiceEquipmentHistory(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_INVOICE_EQUIPMENT_HISTORY, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_INVOICE_EQUIPMENT_HISTORY_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function modifyOrderAC (dispatch, payload, options) {
  await modifyOrderRequest(dispatch, payload, options)
}

async function modifyOrderRequest (dispatch, data, options) {
  dispatch({ type: MODIFY_ORDER })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await modifyOrder(data)
    const { data: responseData } = res
    const { result, action } = processRequestResult(responseData, MODIFY_ORDER, {
      payloads: { success: data },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)

    if (data?.OrderId && responseData?.ResultType === servicesMessageTypes.success) {
      const orderParams = {
        OrderId: data.OrderId
      }
      getOrderRequest(dispatch, orderParams, options)
    }
    return result
  } catch (exception) {
    dispatch({ type: MODIFY_ORDER_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOrderChangeHistoryAC (dispatch, payload, options) {
  await getOrderChangeHistoryRequest(dispatch, payload, options)
}

async function getOrderChangeHistoryRequest (dispatch, data, options) {
  dispatch({ type: GET_ORDER_CHANGE_HISTORY })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOrderChangeHistory(data)
    const { data: responseData, status } = res
    const { result, action } = processRestRequestResult(responseData, status, GET_ORDER_CHANGE_HISTORY, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_CHANGE_HISTORY_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOrderEditSessionHistoryAC (dispatch, payload, options) {
  await getOrderEditSessionHistoryRequest(dispatch, payload, options)
}

async function getOrderEditSessionHistoryRequest (dispatch, data, options) {
  dispatch({ type: GET_ORDER_EDIT_SESSION_HISTORY })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOrderEditSessionHistory(data)
    const { data: responseData, status } = res
    const { result, action } = processRestRequestResult(responseData, status, GET_ORDER_EDIT_SESSION_HISTORY, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_EDIT_SESSION_HISTORY_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOrderEditSessionAC (dispatch, payload, options) {
  await getOrderEditSessionRequest(dispatch, payload, options)
}

async function getOrderEditSessionRequest (dispatch, data, options) {
  dispatch({ type: GET_ORDER_EDIT_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOrderEditSession(data)
    const { data: responseData, status } = res
    const { result, action } = processRestRequestResult(responseData, status, GET_ORDER_EDIT_SESSION, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ORDER_EDIT_SESSION_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function createOrderEditSessionAC (dispatch, payload, options) {
  await createOrderEditSessionRequest(dispatch, payload, options)
}

async function createOrderEditSessionRequest (dispatch, payload, options) {
  dispatch({ type: CREATE_ORDER_EDIT_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await createOrderEditSession(payload)
    const { data: responseData, status } = res
    const { result, action } = processRestRequestResult(responseData, status, CREATE_ORDER_EDIT_SESSION, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CREATE_ORDER_EDIT_SESSION_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function modifyOrderEditSessionAC (dispatch, payload, options) {
  await modifyOrderEditSessionRequest(dispatch, payload, options)
}

async function modifyOrderEditSessionRequest (dispatch, payload, options) {
  dispatch({ type: MODIFY_ORDER_EDIT_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await modifyOrderEditSession(payload)
    const { data: responseData, status } = res
    const { action } = processRestRequestResult(responseData, status, MODIFY_ORDER_EDIT_SESSION, {
      notifications: { success: 'Изменение заказа успешно' },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return action
  } catch (exception) {
    dispatch({ type: MODIFY_ORDER_EDIT_SESSION_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function deleteOrderEditSessionAC (dispatch, payload, options) {
  await deleteOrderEditSessionRequest(dispatch, payload, options)
}

async function deleteOrderEditSessionRequest (dispatch, payload, options) {
  dispatch({ type: DELETE_ORDER_EDIT_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await deleteOrderEditSession(payload)
    const { data: responseData, status } = res
    const { result, action } = processRestRequestResult(responseData, status, DELETE_ORDER_EDIT_SESSION, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: DELETE_ORDER_EDIT_SESSION_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function handleAutoChangeOrderAC (dispatch, payload, options) {
  const { order, orderState, orderStatusState } = payload

  const getChangeOrderResult = await getChangeOrderRequest(dispatch, order.OrderId, options)

  if (!getChangeOrderResult?.IsUpsaleAvailable) return

  const data = prepareCreateOrderEditSessionData(order, orderState, orderStatusState)
  const createOrderEditSessionResult = await createOrderEditSessionRequest(dispatch, data, options)
  const sessionId = createOrderEditSessionResult?.sessionId

  if (!sessionId) return

  const getOrderEditSessionResult = await getOrderEditSessionRequest(dispatch, sessionId, options)

  if (!getOrderEditSessionResult) return

  dispatch({ type: CHANGE_AUTO_UPSALE_MODAL_VISIBILITY, payload: true })
}

export async function getChangeOrderAC (dispatch, payload, options) {
  await getChangeOrderRequest(dispatch, payload, options)
}

async function getChangeOrderRequest (dispatch, data, options) {
  dispatch({ type: GET_CHANGE_ORDER })
  const { checkIsNotificationEnabled } = options
  const notificationMsg = 'Загрузка валидации возможности настройки допродажи по заявке.'
  try {
    const res = await getChangeOrder(data)
    const { data: response } = res
    const areNotificationsEnabled = checkIsNotificationEnabled(res)
    const { result, action } = processRequestResult(response, GET_CHANGE_ORDER, {
      notifications: {
        warning: {
          msg: notificationMsg,
          description: `Успешно. ${response?.MessageText ? response.MessageText : ''}`
        },
        failure: {
          msg: notificationMsg,
          description: `Ошибка. ${response?.MessageText ? response.MessageText : ''}`
        },
        error: {
          msg: notificationMsg,
          description: `Ошибка. ${response?.MessageText ? response.MessageText : ''}`
        }
      },
      areNotificationsEnabled
    })
    if (response?.Data?.IsUpsaleAvailable === false && response?.Data?.Description && areNotificationsEnabled) {
      showWarnNotification(response.Data.Description)
    }
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_CHANGE_ORDER_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function handleChangeManualUpSaleAC (dispatch, payload, options) {
  dispatch({ type: HANDLE_CHANGE_MANUAL_UPSALE })
  const { orderParams, changeOrderData } = payload

  const changeOrderAction = await changeOrderRequest(dispatch, changeOrderData, options)
  if (changeOrderAction?.type !== CHANGE_ORDER_SUCCESS) {
    dispatch({ type: HANDLE_CHANGE_MANUAL_UPSALE_ERROR })
    return
  }

  const getOrderResult = await getOrderRequest(dispatch, orderParams, options)
  if (!getOrderResult) {
    dispatch({ type: HANDLE_CHANGE_MANUAL_UPSALE_ERROR })
  } else {
    dispatch({ type: HANDLE_CHANGE_MANUAL_UPSALE_SUCCESS })
  }
}

export async function handleChangeAutoUpSaleAC (dispatch, payload, options) {
  dispatch({ type: HANDLE_CHANGE_AUTO_UPSALE })
  const { orderParams, modifyOrderEditSessionData } = payload

  const modifyOrderEditSessionAction = await modifyOrderEditSessionRequest(
    dispatch,
    modifyOrderEditSessionData,
    options
  )
  if (modifyOrderEditSessionAction?.type !== MODIFY_ORDER_EDIT_SESSION_SUCCESS) {
    dispatch({ type: HANDLE_CHANGE_AUTO_UPSALE_ERROR })
    return
  }

  const getOrderResult = await getOrderRequest(dispatch, orderParams, options)
  if (!getOrderResult) {
    dispatch({ type: HANDLE_CHANGE_AUTO_UPSALE_ERROR })
  } else {
    dispatch({ type: HANDLE_CHANGE_AUTO_UPSALE_SUCCESS })
  }
}

export async function changeOrderAC (dispatch, payload, options) {
  await changeOrderRequest(dispatch, payload, options)
}

async function changeOrderRequest (dispatch, payload, options) {
  dispatch({ type: CHANGE_ORDER })
  const { checkIsNotificationEnabled } = options

  const notificationMsg = 'Ручное изменение заказа.'
  try {
    const res = await changeOrder(payload)
    const { data } = res
    const { action } = processRequestResult(data, CHANGE_ORDER, {
      notifications: {
        success: {
          msg: notificationMsg,
          description: 'Успешно.'
        },
        warning: {
          msg: notificationMsg,
          description: `Успешно. ${data?.MessageText ? data?.MessageText : ''}`
        },
        failure: {
          msg: notificationMsg,
          description: `Ошибка. ${data?.MessageText ? data?.MessageText : ''}`
        },
        error: {
          msg: notificationMsg,
          description: `Ошибка. ${data?.MessageText ? data?.MessageText : ''}`
        }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return action
  } catch (exception) {
    dispatch({ type: CHANGE_ORDER_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getRelocationInfoAC (dispatch, payload, options) {
  const result = await getRelocationInfoRequest(dispatch, payload, options)
  return result
}

async function getRelocationInfoRequest (dispatch, payload, options) {
  dispatch({ type: GET_RELOCATION_INFO })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getRelocationInfo(payload)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_RELOCATION_INFO, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_RELOCATION_INFO_FAILURE, payload: exception.message })
    return null
  }
}
