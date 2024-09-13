import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import history from 'utils/createdHistory'

import { openTariffConstructorModal } from 'reducers/services/tariffModalReducer'
import { prefillFeedbackModal } from 'reducers/feedbackReducer'
import { selectHasCorrectionDataMarker } from 'selectors/mnpSelectors'

const mapStateToProps = state => ({
  cardMode: state.internal.cardMode.cardMode,
  user: state.internal.userState.user,
  msisdn: state.personalInfo.personalAccountState.personalAccount?.Msisdn,
  AppMode: state.personalInfo.personalAccountState.personalAccount?.BaseFunctionalParams?.AppMode,
  subscriberFullName:
    state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberInfo?.SubscriberFullName,
  subscriberId: state.personalInfo.personalAccountState.personalAccount?.SubscriberId,
  subscriberRatePlanId:
    state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberInfo?.RatePlanId,
  billingBranchId:
    state.personalInfo.personalAccountState.personalAccount?.SubscriberFullInfo?.SubscriberClientInfo?.BillingBranchId,
  billingBranchIdReserve: state.personalInfo.numberOperatorBelonging.whoIsIt?.BillingBranchId,
  birthDate: state.mnp.mnpMarkersState.mnpMarkers?.BirthDate,
  serviceChannelId: state.internal.processingParametersState?.processingParameters?.ServiceChannel?.Id,
  isFeedbackModalVisible: state.feedback.isVisible,
  hasCorrectionDataMarker: selectHasCorrectionDataMarker(state),
  officeId: state.salesOffice.activeSalesOffice?.salesOfficeId
})

const mapDispatchToProps = {
  openTariffConstructorModal,
  onReceiveOrder: prefillFeedbackModal
}

const RawBroadband = React.lazy(() => import('crmBroadbandRemote/Broadband'))

const Broadband = connect(mapStateToProps, mapDispatchToProps)(RawBroadband)

const BroadbandBootstrapper = () => {
  return (
    <div>
      <Suspense fallback='Загрузка модуля ШПД'>
        <Broadband history={history} />
      </Suspense>
    </div>
  )
}

export default BroadbandBootstrapper
