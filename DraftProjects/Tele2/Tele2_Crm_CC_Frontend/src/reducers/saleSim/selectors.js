import { SallingProcessTypes } from 'webseller/features/saleSim/helpers'

export const selectSaleSim = state => state.saleSim
export const selectAddedSimsSaleSim = state => state.saleSim.addedSims
export const selectSoldSims = state => state.saleSim.soldSims
export const selectSoldSimsSaleSim = state => state.saleSim.soldSims
export const selectPersonalDataSaleSim = state => state.saleSim.documentData
export const selectStatusGetExistingPersonalData = state => state.saleSim.statusGetExistingPersonalData
export const selectIsExistsIdentityDoc = state => state.saleSim.isExistsIdentityDoc
export const selectExistingPersonalData = state => state.saleSim.existingPersonalData
export const selectTypeSaleSim = state => state.saleSim.sallingProcessType
export const selectTransferNumberSaleSim = state => state.saleSim.transferNumberOld
export const selectTransferDateSaleSim = state => state.saleSim.submittedTransferTimeSlot
export const selectIsLoadingCheckSimSaleAvailability = state => state.saleSim.isCheckSimSaleAvailabilityLoading

export const selectIsLoadingShopNumbersSaleSim = state => state.saleSim.isShopNumbersLoading
export const selectIsLoadingShopTariffsSaleSim = state => state.saleSim.isShopTariffsLoading
export const selectIsLoadingSellAvailability = state => state.saleSim.isSellAvailabilityLoading

export const selectHasAllRequiredDataForSaleUntemplatedSim = state => {
  const hasNumbers = Boolean(state.saleSim.shopNumbers?.[0]?.numbersList?.[0])
  const hasTariffs = Boolean(state.saleSim.shopTariffs?.tariffsList?.[0])

  return hasNumbers && hasTariffs
}
export const selectIsAvailableBroadbandConnectSaleSim = state => state.saleSim.isAvailableBroadbandConnect
export const selectMessageBroadbandConnectSaleSim = state => state.saleSim.messageBroadbandConnect

export const selectIsOrderProcessTypeSaleSim = state => state.saleSim.sallingProcessType === SallingProcessTypes.ORDER || state.saleSim.sallingProcessType === SallingProcessTypes.MNP_ORDER
export const selectIsMnpOrderProcessTypeSaleSim = state => state.saleSim.sallingProcessType === SallingProcessTypes.MNP_ORDER
export const selectSimsInOrderSaleSim = state => state.saleSim.simsInOrder

export const selectOrderPriceSaleSim = state => state.giveOrder.orderInfo?.orderInfo?.price
export const selectOrderIdSaleSim = state => state.giveOrder.orderInfo?.orderInfo?.id
export const selectOrderMnpMsisdnSaleSim = state => state.giveOrder.orderInfo?.orderInfo?.mnpMsisdn
export const selectOrderIsMnpSaleSim = state => state.giveOrder.orderInfo?.orderInfo?.isMnp
export const selectOrderInfo = state => state.giveOrder.orderInfo?.orderInfo

export const selectUser = state => state.internal.userState.user
