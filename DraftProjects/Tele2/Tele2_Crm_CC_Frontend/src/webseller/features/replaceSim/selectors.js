import { REPLACE_PROCESS_STEPS } from './constants'

export const selectIsLoadingInitReplaceSim = state => state.replaceSim.isLoadingInitReplaceSim
export const selectIsShowReplaceSim = state => state.replaceSim.replacingProcessStep !== REPLACE_PROCESS_STEPS.NONE
export const selectIsFromMarkersReplaceSim = state => state.replaceSim.isFromMarkers
export const selectReplaceSim = (state) => state.replaceSim
export const selectPersonalData = (state) => state.replaceSim.documentData
export const selectIsReplaceSimLoading = state => state.replaceSim.isReplaceSimLoading
export const selectOperationStatusReplacingData = state => state.replaceSim.operationStatus
export const selectReplaceSimErrorMessage = state => state.replaceSim.replaceSimErrorMessage
export const selectPersonalAccount = (state) => state.personalInfo.personalAccountState.personalAccount
export const selectIcc = (state) => state.personalInfo.personalAccountState?.personalAccount?.SubscriberFullInfo?.USIProfile?.Iccid
