import React, { ConfigProvider } from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'
import 'moment/locale/ru'

import Broadband from 'components/Broadband'
import ErrorBoundary from 'components/ErrorBoundary'

export default () => {
  const data = {
    user: { Permissions: [] }, // { Permissions: [] }, // state.internal.userState.user,
    msisdn: null, // state.personalInfo.personalAccountState.personalAccount?.Msisdn,
    isAnonymous: false, // state.personalInfo.personalAccountState.personalAccount?.BaseFunctionalParams?.IsAnonymous,
    subscriberFullName: null, // state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberInfo?.SubscriberFullName,
    subscriberId: null, // state.personalInfo.personalAccountState.personalAccount?.SubscriberId,
    subscriberRatePlanId: null, // state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberInfo?.RatePlanId,
    billingBranchId: null, // state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberClientInfo?.BillingBranchId,
    // birthDate: state.mnp.mnpMarkersState.mnpMarkers?.BirthDate,
    serviceChannelId: null // state.internal.processingParametersState?.processingParameters?.ServiceChannel?.Id
  }

  return (
    <ErrorBoundary>
      <ConfigProvider locale={ruRU}>
        <Broadband {...data} />
      </ConfigProvider>
    </ErrorBoundary>
  )
}
