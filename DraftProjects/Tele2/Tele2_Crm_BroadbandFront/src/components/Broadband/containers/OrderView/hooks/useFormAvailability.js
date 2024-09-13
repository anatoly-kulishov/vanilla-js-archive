import { useEffect, useMemo } from 'react'
import { isOwnSession as checkIsOwnSession } from '../../../helpers/sessions'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { OrderStatuses } from 'constants/orderStatuses'

export function useFormAvailability (isCreating, formInitData) {
  const {
    broadbandTariffsState,
    getBroadbandTariffs,
    orderState,
    orderStatusState,
    sessionsInfoState,
    timeslots,
    availableTariffsState,
    tariffConstructorCosts,
    isOrderActionLoading,
    modifyOrder
  } = useBroadbandContext()
  // Get available tariffs
  const tariffsData = broadbandTariffsState.data
  useEffect(() => {
    if (!tariffsData) {
      getBroadbandTariffs()
    }
  }, [tariffsData])

  // Enable form only for permitted tariffs
  const isFormDisabled = useMemo(() => {
    const { data, isLoading } = broadbandTariffsState
    const { isAnonymous, isLeon, subscriberRatePlanId } = formInitData

    if (isLoading || isLeon) {
      return false
    }
    if (!isAnonymous && !data) {
      return true
    }
    if (!isAnonymous && data) {
      const permittedIds = new Set(data?.map(item => item.Id))
      return !permittedIds?.has(subscriberRatePlanId)
    }

    return false
  }, [formInitData, broadbandTariffsState])

  // Enable controls for your own session/creating order/draft order/allowed permissions
  const areFormControlsEnabled = useMemo(() => {
    const sessionData = sessionsInfoState.data
    const userData = formInitData?.user
    const isOwnSession = checkIsOwnSession(sessionData, userData?.login, orderState?.OrderId)

    const isDraft = orderStatusState?.statusId === OrderStatuses.Draft
    const isPermissionOk = !formInitData?.userRights.isReadLimitedBCOrder
    const isDraftOk = isDraft && isPermissionOk

    return isCreating || isOwnSession || isDraftOk
  }, [orderState, orderStatusState, sessionsInfoState, formInitData, isCreating])

  // Enable buttons dependent on each other
  const areFormActionsEnabled = useMemo(() => {
    const isTimeslotsActionLoading = timeslots.delete.isLoading || timeslots.reserve.isLoading
    const isModifyOrderLoading = modifyOrder.isLoading

    return !isTimeslotsActionLoading && !isOrderActionLoading && !isModifyOrderLoading
  }, [timeslots, availableTariffsState, tariffConstructorCosts, isOrderActionLoading, modifyOrder])

  const isReducedForm = useMemo(() => {
    const isPermissionOk = !formInitData?.userRights.isReadLimitedBCOrder
    return !isPermissionOk
  }, [formInitData])

  return { isFormDisabled, areFormControlsEnabled, areFormActionsEnabled, isReducedForm }
}
