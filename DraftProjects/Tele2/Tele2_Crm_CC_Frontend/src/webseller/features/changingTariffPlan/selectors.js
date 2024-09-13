import { ChangingTariffPlanStatusStep } from './helpers'

/** changingTariffPlan */
export const selectIsShowChangingTariffPlanStatus = state => state.changingTariffPlan.activeStep !== ChangingTariffPlanStatusStep.NONE
export const selectActiveStepChangingClientStatus = state => state.changingTariffPlan.activeStep

export const selectChangingTariffParams = state => state.changingTariffPlan.tariffParams

export const selectSubscriberIdentityDocument = state => state.changingTariffPlan.subscriberPersonalData?.IdentityDocument?.split(';')
export const selectSubscriberIdentityDocumentFields = state => state.changingTariffPlan.subscriberPersonalData?.IdentityDocumentFields
export const selectSubscriberFullName = state => state.changingTariffPlan.subscriberPersonalData?.FullName
export const selectChangingTariffB2bClientMinimalInfo = state => state.changingTariffPlan.b2bClientMinimalInfo

/** tariffModal */
export const selectTariffSettings = state => state.services.tariffModal?.tariffSettings?.settings
export const selectTariffServices = state => state.services.tariffModal?.tariffSettings?.settings?.PersonalizingServices
export const selectTariffRateName = state => state.services.tariffModal?.tariffSettings?.settings?.RateName
export const selectChargeNextDate = state => state.services.tariffModal?.tariffInfo?.Fee?.ChargeNextDate
