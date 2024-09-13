import { CORRECTION_PROCESS_STEPS } from './helpers'

export const selectIsShowCorrectionData = state => state.correctionData.correctionDataProcessStep !== CORRECTION_PROCESS_STEPS.NONE
export const selectIsFromMarkersCorrectionData = state => state.correctionData.isFromMarkers
export const selectCorrectionData = state => state.correctionData
export const selectActiveStepCorrectionData = state => state.correctionData.correctionDataProcessStep
export const selectProcessTypeCorrectionData = state => state.correctionData.correctionProcessType
export const selectPersonalDataCorrectionData = state => state.correctionData.documentData
export const selectDocumentTypeCorrectionData = state => state.correctionData.documentType
export const selectRegistrationAddressCorrectionData = state => state.correctionData.registrationAddress
export const selectOperationStatusCorrectionData = state => state.correctionData.operationStatus
export const selectIsLoadingOperationCorrectionData = state => state.correctionData.isEditPersonalDataLoading
export const selectErrorCorrectionData = state => state.correctionData.errorEditPersonalData
export const selectTicketNumberCorrectionData = state => state.correctionData.ticketNumber
export const selectServiceRequestIdCorrectionData = state => state.correctionData.serviceRequestId
export const selectIsOnlyPaperDocumentsScenarioCorrectionData = state => state.correctionData.isOnlyPaperDocumentsScenario
export const selectIsLoadingGetVerificationSmsCodeCorrectionData = state => state.correctionData.isGetVerificationSmsCodeLoading
export const selectIsLoadingCheckVerificationPepCodeCorrectionData = state => state.correctionData.isCheckVerificationPepCodeLoading
