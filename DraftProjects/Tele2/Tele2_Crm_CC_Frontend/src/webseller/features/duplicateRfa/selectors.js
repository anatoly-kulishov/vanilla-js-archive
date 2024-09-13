import { DuplicateRfaStep } from './helpers'

export const selectIsShowDuplicateRfa = state => state.duplicateRfa.activeStep !== DuplicateRfaStep.NONE
export const selectIsFromMarkersDuplicateRfa = state => state.duplicateRfa.isFromMarkers
export const selectIsNeedDuplicateRfa = state => state.duplicateRfa.isNeedDuplicateRfa
export const selectStatusDuplicateRfa = state => state.duplicateRfa.status
export const selectActiveStepDuplicateRfa = state => state.duplicateRfa.activeStep
export const selectIsLoadingCheckIccDuplicateRfa = state => state.duplicateRfa.isLoadingCheckIcc
export const selectAttemptsCountCheckIccDuplicateRfa = state => state.duplicateRfa.attemptsCountCheckIcc
export const selectPersonalDataDuplicateRfa = state => state.duplicateRfa.personalData
export const selectIsLoadingGetInitialPersonalDataDuplicateRfa = state =>
  state.duplicateRfa.isLoadingGetInitialPersonalData
export const selectIsLoadingExecuteDuplicateRfa = state => state.duplicateRfa.isLoadingExecuteOperation
export const selectErrorExecuteDuplicateRfa = state => state.duplicateRfa.errorExecuteOperation
