import React from 'react'
import styled from 'styled-components'
import SubscriptionTable from './SubscriptionTable'

const Subscriptions = props => {
  const {
    activeSubscriptions,
    isActiveSubscriptionsLoading,
    personalAccount,
    contentBalance,
    location,
    handlingId,
    onUnsubscribe,
    isUnsubscribeLoading
  } = props

  if (isActiveSubscriptionsLoading) {
    return <SubscriptionsSkeleton />
  } else {
    return (
      <SubscriptionTable
        subscription={activeSubscriptions}
        personalAccount={personalAccount}
        contentBalance={contentBalance}
        onUnsubscribe={onUnsubscribe}
        location={location}
        handlingId={handlingId}
        isUnsubscribeLoading={isUnsubscribeLoading}
      />
    )
  }
}

export default Subscriptions

const SubscriptionsSkeleton = styled.div`
  height: 230px;
`
