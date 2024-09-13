import { ChangingClientStatusStep } from './helpers'

export const selectIsShowChangingClientStatus = state =>
  state.changingClientStatus.activeStep !== ChangingClientStatusStep.NONE
export const selectActiveStepChangingClientStatus = state => state.changingClientStatus.activeStep
export const selectStatusChangingClientStatus = state => state.changingClientStatus.status
export const selectPersonalDataChangingClientStatus = state => state.changingClientStatus.personalData
export const selectNewStatusChangingClientStatus = state => state.changingClientStatus.newStatus
export const selectSubscriberCscIdChangingClientStatus = state => state.changingClientStatus.subscriberCscId
export const selectIsLoadingExecuteOperationChangingClientStatus = state =>
  state.changingClientStatus.isLoadingExecuteOperation
export const selectErrorExecuteOperationChangingClientStatus = state => state.changingClientStatus.errorExecuteOperation
