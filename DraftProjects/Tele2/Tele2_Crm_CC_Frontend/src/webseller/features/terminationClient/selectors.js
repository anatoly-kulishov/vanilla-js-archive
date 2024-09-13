import { OperationParamsFormFields, TerminationClientStep } from './helpers'

export const selectActiveStepTerminationClient = state => state.terminationClient.activeStep
export const selectIsLoadingInitTerminationClient = state => state.terminationClient.isLoadingInitProcess
export const selectTypeTerminationClient = state => state.terminationClient.type
export const selectPersonalDataTerminationClient = state => state.terminationClient.personalData
export const selectOperationParamsTerminationClient = state => state.terminationClient.operationParams
export const selectBalanceTransferParamTerminationClient = state => state.terminationClient.operationParams[OperationParamsFormFields.BALANCE_TRANSFER]
export const selectBankBalanceTransferInfoTerminationClient = state => state.terminationClient.operationParams?.[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO]
export const selectNumberBalanceTransferInfoTerminationClient = state => state.terminationClient.operationParams?.[OperationParamsFormFields.NUMBER_BALANCE_TRANSFER_INFO]
export const selectTicketNumberTerminationClient = state => state.terminationClient.ticketNumber
export const selectServiceRequestIdTerminationClient = state => state.terminationClient.serviceRequestId
export const selectIsLoadingExecuteTerminationClient = state => state.terminationClient.isLoadingExecuteOperation
export const selectErrorExecuteTerminationClient = state => state.terminationClient.errorExecuteOperation
export const selectOperationStatusTerminationClient = state => state.terminationClient.status
export const selectIsShowTerminationClient = state =>
  selectActiveStepTerminationClient(state) !== TerminationClientStep.NONE
