import { useEffect } from 'react'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { getUserRights } from 'helpers/user'

export default function withInitData (Component) {
  return function (props) {
    const {
      msisdn,
      user,
      AppMode,
      subscriberFullName,
      subscriberId,
      subscriberRatePlanId,
      billingBranchId,
      billingBranchIdReserve,
      birthDate,
      serviceChannelId,
      isLeon
    } = props

    const { changeContextState, formInitData } = useBroadbandContext()

    useEffect(() => {
      const userRights = getUserRights(user)

      const initData = {
        msisdn,
        isAnonymous: AppMode === 'anonymous',
        subscriberFullName,
        subscriberId,
        billingBranchId,
        billingBranchIdReserve,
        serviceChannelId,
        birthDate,
        subscriberRatePlanId,
        user,
        userRights,
        isLeon
      }
      changeContextState({ formInitData: initData })
    }, [])

    if (!formInitData) return null

    return <Component {...props} />
  }
}
