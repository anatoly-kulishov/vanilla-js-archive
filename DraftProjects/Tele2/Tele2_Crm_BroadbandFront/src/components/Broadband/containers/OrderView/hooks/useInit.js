import { useEffect } from 'react'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { getBranchIdByMode } from 'helpers/index'

export function useInit (orderId, isCreating, formInitData) {
  const {
    regions,
    handbooks,
    documentTypes,
    regionIsoCodeState,
    order,
    sessionsInfoState,
    sessionCloseReasons,
    getRegions,
    getHandbooks,
    getDocumentTypes,
    getRegionIsoCode,
    getOrder,
    getSessionsInfo,
    getSessionCloseReasons,
    changeContextState
  } = useBroadbandContext()

  const { subscriberRatePlanId, userRights } = formInitData

  useEffect(() => {
    if (!regions) {
      getRegions()
    }
    if (!handbooks) {
      getHandbooks()
    }
    if (!documentTypes) {
      getDocumentTypes()
    }
    if (!regionIsoCodeState && isCreating) {
      getRegionIsoCode({ branchId: getBranchIdByMode(formInitData) })
    }
    if (!isNaN(orderId) && order.data?.OrderId !== orderId && !isCreating) {
      const orderParams = { orderId }

      getOrder({ orderParams, subscriberRatePlanId, userRights })
    }
    if (!isNaN(orderId) && sessionsInfoState.data?.orderId !== orderId && !isCreating) {
      getSessionsInfo({ OrderId: orderId })
    }
    if (!sessionCloseReasons) {
      getSessionCloseReasons()
    }
    changeContextState({ isCreating })
  }, [])
}
