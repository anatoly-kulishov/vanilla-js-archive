import { useEffect } from 'react'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { isNil } from 'lodash-es'
import { StateStatus } from 'context/constants/initialState'

const useShiftScenario = (form, openOrder, user, hasShifts) => {
  const {
    getOperatorShifts,
    operatorShifts,
    autoOrderSession,
    createAutoOrderSession,
    getSessionsInfo,
    autoActions,
    changeContextState
  } = useBroadbandContext()

  const { data: operatorShiftsData } = operatorShifts.get

  useEffect(() => {
    if (hasShifts) {
      const typeIds = operatorShiftsData[0].typeTask.map(task => task.typeTask)
      const formValue = { typeId: typeIds }
      form.setFieldsValue(formValue)
    } else {
      form.setFieldsValue({ typeId: [] })
    }
  }, [hasShifts])

  const afterCreateShiftsStatus = autoActions.afterCreateShifts
  const { isSuccess: isShiftsSuccess } = operatorShifts.create
  useEffect(() => {
    if (afterCreateShiftsStatus === StateStatus.NeedAction && isShiftsSuccess) {
      createAutoOrderSession()
      changeContextState({
        autoActions: {
          ...autoActions,
          afterCreateShifts: StateStatus.Done,
          afterCreateAutoOrderSession: StateStatus.NeedAction
        }
      })
    }
  }, [afterCreateShiftsStatus, isShiftsSuccess])

  const afterCreateAutoOrderSessionStatus = autoActions.afterCreateAutoOrderSession
  const { data: createAutoOrderSessionData, isSuccess: isCreateAutoOrderSessionSuccess } = autoOrderSession
  useEffect(() => {
    if (
      afterCreateAutoOrderSessionStatus === StateStatus.NeedAction &&
      !isNil(isCreateAutoOrderSessionSuccess) &&
      isCreateAutoOrderSessionSuccess
    ) {
      if (!isNil(createAutoOrderSessionData)) {
        const { msisdn, orderId } = createAutoOrderSessionData
        if (orderId) {
          openOrder({ msisdn: msisdn || null, orderId })
        }
      }
      changeContextState({
        autoActions: {
          ...autoActions,
          refetchOperatorShifts: StateStatus.NeedAction,
          afterCreateAutoOrderSession: StateStatus.Done
        }
      })
    }
  }, [createAutoOrderSessionData, isCreateAutoOrderSessionSuccess, afterCreateAutoOrderSessionStatus])

  useEffect(() => {
    if (
      afterCreateAutoOrderSessionStatus === StateStatus.NeedAction &&
      !isNil(isCreateAutoOrderSessionSuccess) &&
      !isCreateAutoOrderSessionSuccess
    ) {
      getSessionsInfo({ UserLogin: user?.login })
      changeContextState({
        autoActions: {
          ...autoActions,
          refetchOperatorShifts: StateStatus.NeedAction,
          afterCreateAutoOrderSession: StateStatus.Done
        }
      })
    }
  }, [afterCreateAutoOrderSessionStatus, isCreateAutoOrderSessionSuccess])

  const refetchOperatorShiftsStatus = autoActions.refetchOperatorShifts
  useEffect(() => {
    if (refetchOperatorShiftsStatus === StateStatus.NeedAction) {
      getOperatorShifts({ isActive: true })
      changeContextState({
        autoActions: {
          ...autoActions,
          refetchOperatorShifts: StateStatus.Done
        }
      })
    }
  }, [refetchOperatorShiftsStatus])
}

export default useShiftScenario
