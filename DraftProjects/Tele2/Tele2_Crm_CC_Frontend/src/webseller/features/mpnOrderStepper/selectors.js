import { MNP_ORDER_PROCESS_STEPS } from './constants'

export const selectMnpProcessStep = (state) => state.mpnOrderStepper.mpnProcessStep
export const selectMnpAvailableLoadingStatus = (state) => state.mpnOrderStepper.mnpAvailableStatusLoading
export const selectIsShowMpnProcess = (state) => state.mpnOrderStepper.mpnProcessStep !== MNP_ORDER_PROCESS_STEPS.NONE
export const selectMpnOrderTransferNumber = (state) => state.mpnOrderStepper.transferNumber
export const selectMpnOrderTransferNumberOld = (state) => state.mpnOrderStepper.transferNumberOld
export const selectCheckSimMnpLoadingStatus = (state) => state.mpnOrderStepper.isCheckSimMnpLoading
export const selectCheckSimMnpErrorErrorInfo = (state) => state.mpnOrderStepper.checkSimMnpError
export const selectPersonalDataMnp = state => state.mpnOrderStepper.personalData
export const selectIsLoadingGetInitialPersonalDataMnp = state => state.mpnOrderStepper.isLoadingGetInitialPersonalData
export const selectMpnOrderOperationStatus = state => state.mpnOrderStepper.operationStatus
export const selectMpnOrderDocumentData = state => state.mpnOrderStepper.documentData
export const selectMpnOrderRequestData = state => state.mpnOrderStepper.mnpOrderRequest
export const selectMpnOrderRequestLoadingStatus = state => state.mpnOrderStepper.isMnpOrderRequestLoading
export const selectMpnOrderRequestErrorStatus = state => state.mpnOrderStepper.isMnpOrderRequestError
export const selectPersonalAccount = (state) => state.personalInfo.personalAccountState.personalAccount
