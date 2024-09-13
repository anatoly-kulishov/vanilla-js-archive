import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'components/Card'
import { createShopOrder } from 'reducers/shopOrderReducer'
import ShopOrderParams from './components/ShopOrderParams'
import ShopIframe from './components/ShopIframe'
import ManualInfoModal from './components/ManualInfoModal'
import NoMsisdnError from './components/NoMsisdnError'

const ShopOrder = () => {
  const dispatch = useDispatch()
  const subscriberInfo = useSelector(
    state => state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberInfo
  )
  const email = useSelector(state => state.personalInfo.personalAccountState.personalAccount.Email)
  const { Msisdn, SubscriberFullName: clientName } = subscriberInfo
  const handlingId = useSelector(state => state.internal.handlingState.Id)
  const queryParams = useSelector(state => state.internal.queryParamsState.queryParams)
  const { interactionId, dialogId, theme, msisdn, serviceLineId } = queryParams
  const subscriberBillingBranchId = useSelector(
    state =>
      state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberClientInfo?.BillingBranchId
  )
  const whoIsItBillingBranchId = useSelector(
    state => state.personalInfo.numberOperatorBelonging?.whoIsIt?.BillingBranchId
  )
  const iframeRef = useRef(null)

  const [isManualModalOpen, setIsManualModalOpen] = useState(false)

  const handleCreateShopOrder = useCallback(
    (siteId, actionType, simType) => {
      const params = {
        siteId,
        clientName,
        msisdn: Msisdn || msisdn,
        handlingId,
        callTheme: theme,
        callId: interactionId,
        actionType: actionType?.toString(),
        email,
        clientBranchId: subscriberBillingBranchId || whoIsItBillingBranchId,
        serviceLineId,
        simType,
        dialogId
      }
      dispatch(createShopOrder(params))
    },
    [Msisdn, clientName, handlingId, interactionId, dialogId, theme, email, msisdn]
  )

  const handleShowManual = useCallback(() => setIsManualModalOpen(true), [])
  const handleCloseManual = useCallback(() => setIsManualModalOpen(false), [])

  const isMsisdn = Boolean(Msisdn) || Boolean(msisdn)

  return (
    <Card
      header='Интернет-магазин'
      isContentLoading={false}
      content={
        <>
          {isMsisdn && (
            <>
              <ShopOrderParams
                createShopOrder={handleCreateShopOrder}
                iframeRef={iframeRef}
                onShowManual={handleShowManual}
              />
              <ShopIframe iframeRef={iframeRef} />
              <ManualInfoModal isOpen={isManualModalOpen} onClose={handleCloseManual} />
            </>
          )}
          {!isMsisdn && <NoMsisdnError />}
        </>
      }
    />
  )
}

export default ShopOrder
