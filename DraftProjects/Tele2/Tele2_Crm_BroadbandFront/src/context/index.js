import React, { createContext, useReducer, useMemo } from 'react'

import { broadbandReducer } from './reducers'
import { initialState } from './constants/initialState'
import {
  changeBroadbandServicesAC,
  getBroadbandTariffsAC,
  getAvailableTariffsAC,
  getHandbooksAC,
  getOperationReasonsAC,
  getOrderAC,
  getOrderHistoryAC,
  getOrderListAC,
  getOrderRtcStatusesAC,
  getRegionIsoCodeAC,
  getRegionsAC,
  getServicesForSellAC,
  modifyOrderTimeslotAC,
  modifyRtcDataAC,
  getMacroRegionsAC,
  checkSubscriberTariffAC,
  saveInvoiceEquipmentAC,
  getInvoiceEquipmentHistoryAC,
  modifyOrderAC,
  getOrderChangeHistoryAC,
  getOrderEditSessionHistoryAC,
  getChangeOrderAC,
  changeOrderAC,
  createOrderEditSessionAC,
  modifyOrderEditSessionAC,
  getOrderEditSessionAC,
  deleteOrderEditSessionAC,
  handleAutoChangeOrderAC,
  handleChangeManualUpSaleAC,
  handleChangeAutoUpSaleAC,
  getRelocationInfoAC,
  getOrderCommentHistoryAC,
  getStatusReasonsAC
} from './actionCreators/order'
import { checkAddressAC, getAddressSuggestionAC, recheckAddressAC } from './actionCreators/address'
import {
  changeAutoActionsStateAC,
  changeCheckAddressStatusAC,
  changeContextStateAC,
  changeManualUpSaleModalVisibilityAC,
  changeMainFormAC,
  changeNumberModalTypeAC,
  changeNumberModalVisibilityAC,
  changeOrderLoadingStatusAC,
  changePersonalFormAC,
  changeReasonsStateAC,
  changeRescheduleModalVisibilityAC,
  changeTariffModalVisibilityAC,
  setConstructorPriceAC,
  changeAutoUpSaleModalVisibilityAC,
  changeCancelAutoUpSaleModalVisibilityAC
} from './actionCreators/state'
import { getDocumentAC, getDocumentTypesAC } from './actionCreators/personal'
import {
  changeTimeslotAC,
  checkAutoIntervalAC,
  deleteTimeslotAC,
  getTimeslotsAC,
  reserveTimeslotAC
} from './actionCreators/timeslots'
import {
  getUpSaleEquipmentTypesAC,
  getUpSaleSpeedToTechnologyAC,
  getEquipmentTypeAC,
  getSpeedToTechRequest
} from './actionCreators/equipment'
import {
  cancelOrderAC,
  changeOrderWaitStateAC,
  deleteOrderAC,
  performOrderAC,
  transferOrderAC
} from './actionCreators/orderActions'
import { checkMsisdnAC, getMsisdnAC, reserveMsisdnAC } from './actionCreators/number'
import {
  closeSessionAC,
  createOperatorShiftsAC,
  createSessionAC,
  deleteOperatorShiftsAC,
  getOperatorShiftsAC,
  getSessionCloseReasonsAC,
  getSessionsInfoAC,
  getSessionTaskTypesAC,
  createAutoOrderSessionAC
} from './actionCreators/sessions'

const BroadbandContext = createContext({})
BroadbandContext.displayName = 'BroadbandContext'

const BroadbandContextProvider = ({ children }) => {
  const [broadbandState, dispatch] = useReducer(broadbandReducer(initialState), initialState)
  const isReadLimitedBCOrder = broadbandState?.formInitData?.userRights?.isReadLimitedBCOrder

  const options = useMemo(
    () => ({
      checkIsNotificationEnabled: response => {
        const { status, data } = response ?? {}
        const { MessageText } = data ?? {}

        if (isReadLimitedBCOrder) {
          const isForbiddenStatus = typeof status === 'number' && status === 403
          const isForbiddenMessage = typeof MessageText === 'string' && MessageText.toLowerCase().includes('доступ')

          return !(isForbiddenStatus || isForbiddenMessage)
        }

        return true
      }
    }),
    [isReadLimitedBCOrder]
  )

  const actions = useMemo(
    () => ({
      getBroadbandTariffs: payload => getBroadbandTariffsAC(dispatch, payload, options),
      getOrder: payload => getOrderAC(dispatch, payload, options),
      getAddressSuggestion: payload => getAddressSuggestionAC(dispatch, payload, options),
      getDocumentTypes: payload => getDocumentTypesAC(dispatch, payload, options),
      getDocument: payload => getDocumentAC(dispatch, payload, options),
      getTimeslots: payload => getTimeslotsAC(dispatch, payload, options),
      reserveTimeslot: payload => reserveTimeslotAC(dispatch, payload, options),
      deleteTimeslot: payload => deleteTimeslotAC(dispatch, payload, options),
      checkAutoInterval: payload => checkAutoIntervalAC(dispatch, payload, options),
      changeTimeslot: payload => changeTimeslotAC(dispatch, payload, options),
      modifyOrderTimeslot: payload => modifyOrderTimeslotAC(dispatch, payload, options),
      saveInvoiceEquipment: payload => saveInvoiceEquipmentAC(dispatch, payload, options),
      getInvoiceEquipmentHistory: payload => getInvoiceEquipmentHistoryAC(dispatch, payload, options),
      getEquipmentTypes: payload => getEquipmentTypeAC(dispatch, payload, options),
      getUpSaleSpeedToTechnology: payload => getUpSaleSpeedToTechnologyAC(dispatch, payload, options),
      getUpSaleEquipmentTypes: payload => getUpSaleEquipmentTypesAC(dispatch, payload, options),
      getMacroRegions: payload => getMacroRegionsAC(dispatch, payload, options),
      getRegions: payload => getRegionsAC(dispatch, payload, options),
      getRegionIsoCode: payload => getRegionIsoCodeAC(dispatch, payload, options),
      setConstructorPrice: payload => setConstructorPriceAC(dispatch, payload, options),
      checkAddress: payload => checkAddressAC(dispatch, payload, options),
      getHandbooks: payload => getHandbooksAC(dispatch, payload, options),
      getOrderList: payload => getOrderListAC(dispatch, payload, options),
      changeOrderLoadingStatus: payload => changeOrderLoadingStatusAC(dispatch, payload, options),
      getOrderRtcStatuses: payload => getOrderRtcStatusesAC(dispatch, payload, options),
      getOperationReasons: payload => getOperationReasonsAC(dispatch, payload, options),
      changeOrderWaitState: payload => changeOrderWaitStateAC(dispatch, payload, options),
      cancelOrder: payload => cancelOrderAC(dispatch, payload, options),
      deleteOrder: payload => deleteOrderAC(dispatch, payload, options),
      transferOrder: payload => transferOrderAC(dispatch, payload, options),
      performOrder: payload => performOrderAC(dispatch, payload, options),
      getOrderHistory: payload => getOrderHistoryAC(dispatch, payload, options),
      getOrderCommentHistory: payload => getOrderCommentHistoryAC(dispatch, payload, options),
      changeCheckAddressStatus: payload => changeCheckAddressStatusAC(dispatch, payload, options),
      getAvailableTariffs: payload => getAvailableTariffsAC(dispatch, payload, options),
      getServicesForSell: payload => getServicesForSellAC(dispatch, payload, options),
      changeBroadbandServices: payload => changeBroadbandServicesAC(dispatch, payload, options),
      modifyOrder: payload => modifyOrderAC(dispatch, payload, options),
      getOrderChangeHistory: payload => getOrderChangeHistoryAC(dispatch, payload, options),
      getOrderEditSessionHistory: payload => getOrderEditSessionHistoryAC(dispatch, payload, options),
      getOrderEditSession: payload => getOrderEditSessionAC(dispatch, payload, options),
      createOrderEditSession: payload => createOrderEditSessionAC(dispatch, payload, options),
      modifyOrderEditSession: payload => modifyOrderEditSessionAC(dispatch, payload, options),
      deleteOrderEditSession: payload => deleteOrderEditSessionAC(dispatch, payload, options),
      getChangeOrder: payload => getChangeOrderAC(dispatch, payload, options),
      handleAutoChangeOrder: payload => handleAutoChangeOrderAC(dispatch, payload, options),
      changeOrder: payload => changeOrderAC(dispatch, payload, options),
      handleChangeManualUpSale: payload => handleChangeManualUpSaleAC(dispatch, payload, options),
      handleChangeAutoUpSale: payload => handleChangeAutoUpSaleAC(dispatch, payload, options),
      getRelocationInfo: payload => getRelocationInfoAC(dispatch, payload, options),
      getSpeedToTechnology: payload => getSpeedToTechRequest(dispatch, payload, options),
      getStatusReasons: payload => getStatusReasonsAC(dispatch, payload, options),
      // State
      changeContextState: payload => changeContextStateAC(dispatch, payload),
      changeAutoActionsState: payload => changeAutoActionsStateAC(dispatch, payload),
      changeMainFormState: payload => changeMainFormAC(dispatch, payload),
      changeReasonsState: payload => changeReasonsStateAC(dispatch, payload),
      changePersonalForm: payload => changePersonalFormAC(dispatch, payload),
      changeTariffModalVisibility: payload => changeTariffModalVisibilityAC(dispatch, payload),
      changeNumberModalVisibility: payload => changeNumberModalVisibilityAC(dispatch, payload),
      changeNumberModalType: payload => changeNumberModalTypeAC(dispatch, payload),
      changeManualUpSaleModalVisibility: payload => changeManualUpSaleModalVisibilityAC(dispatch, payload),
      changeAutoUpSaleModalVisibility: payload => changeAutoUpSaleModalVisibilityAC(dispatch, payload),
      changeCancelAutoUpSaleModalVisibility: payload => changeCancelAutoUpSaleModalVisibilityAC(dispatch, payload),
      changeRescheduleModalVisibility: payload => changeRescheduleModalVisibilityAC(dispatch, payload),
      //
      recheckAddress: payload => recheckAddressAC(dispatch, payload, options),
      modifyRtcData: payload => modifyRtcDataAC(dispatch, payload, options),
      getMsisdn: payload => getMsisdnAC(dispatch, payload, options),
      reserveMsisdn: payload => reserveMsisdnAC(dispatch, payload, options),
      checkMsisdn: payload => checkMsisdnAC(dispatch, payload, options),
      checkSubscriberTariff: payload => checkSubscriberTariffAC(dispatch, payload, options),
      // Sessions
      getSessionsInfo: payload => getSessionsInfoAC(dispatch, payload, options),
      createSession: payload => createSessionAC(dispatch, payload, options),
      closeSession: payload => closeSessionAC(dispatch, payload, options),
      getSessionTaskTypes: payload => getSessionTaskTypesAC(dispatch, payload, options),
      getSessionCloseReasons: payload => getSessionCloseReasonsAC(dispatch, payload, options),
      getOperatorShifts: payload => getOperatorShiftsAC(dispatch, payload, options),
      createOperatorShifts: payload => createOperatorShiftsAC(dispatch, payload, options),
      deleteOperatorShifts: payload => deleteOperatorShiftsAC(dispatch, payload, options),
      createAutoOrderSession: payload => createAutoOrderSessionAC(dispatch, payload, options)
    }),
    [options]
  )

  const contextValue = useMemo(
    () => ({
      ...broadbandState,
      ...actions
    }),
    [broadbandState, actions]
  )

  return <BroadbandContext.Provider value={contextValue}>{children}</BroadbandContext.Provider>
}

export { BroadbandContext, BroadbandContextProvider }
