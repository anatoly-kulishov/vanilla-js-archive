import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withLogger } from 'utils/helpers/logger'
import { fetchUnsibscribeReasons, unsubscribeSelected } from 'reducers/subscriptions/unsubscribeReducer'
import { getActiveSubscriptions } from 'reducers/subscriptions/activeSubscriptionReducer'
import { changeVisibility, getServiceHistory, showServiceHistory } from 'reducers/services/serviceHistoryReducer'
import {
  changeServiceStatus,
  getAvailableServices,
  getConnectedServices,
  handleToggleServicesPendingOrders
} from 'reducers/services/serviceReducer'
import { changeAbonentsModalVisibility } from 'reducers/personalInfo/abonentsModalReducer'
import { deleteGroup, fetchGroupList, validateAutopayService } from 'reducers/lines/groupsReducer'
import { clearDiscountsList, fetchDiscountsList } from 'reducers/lines/discountsReducer'
import {
  changeCompensationsHistoryModalVisibility,
  clearCompensationsMessages
} from 'reducers/compensations/compensationsReducer'
import { clearValidationMessages } from 'reducers/compensations/validationCompensationsReducer'
import {
  clearSubscribersList,
  fetchGroupNotificationMessages,
  fetchSubscribersList
} from 'reducers/lines/subscribersReducer'
import { getUnpaidChargeDataAndShowAlert } from 'reducers/finance/remainsReducer'
import { getClientBalance } from 'reducers/finance/balanceReducer'
import { toggleLinkedHandlingModalVisibility } from 'reducers/linkedHandlingModalReducer'
import { fetchOffers, fetchRegisteredOffers } from 'reducers/offersReducer'
import { getComments } from 'reducers/comments/commentsReducer'
import { checkMnpHandling } from 'reducers/mnp/mnpReducer'
import { selectHasRequiredMarkers } from 'selectors/mnpSelectors'

import CommonInformation from './CommonInformation'

// Webseller
import { StepTypeRecreateClient } from 'webseller/features/recreateClient/helpers'
import { getHistoryChangeSim } from 'reducers/changeSim/replacementSimCardReducer'
import { selectIsShowTerminationClient } from 'webseller/features/terminationClient/selectors'
import { selectIsShowChangingClientStatus } from 'webseller/features/changingClientStatus/selectors'
import { selectIsShowMpnProcess } from 'webseller/features/mpnOrderStepper/selectors'
import { selectIsWebSeller } from 'webseller/common/user/selectors'

const mapStateToProps = state => {
  return {
    ...state.finance,
    ...state.internal.userState,
    ...state.personalInfo.personalAccountState,
    ...state.internal.queryParamsState,
    ...state.subscriptions.activeSubscriptionsState,
    ...state.subscriptions.unsubscribe,
    ...state.services.servicesState,
    ...state.services.serviceHistory,
    ...state.lines,
    ...state.replaceSim,
    validSubscriberInfo: state.compensation.compensationsAdjustmentSubscribers.validSubscriberInfo,
    contentBalance: state.subscriptions.contentBalanceState,
    serviceHistoryState: state.services.serviceHistory,
    handlingId: state.internal.handlingState.Id,
    processingParameters: state.internal.processingParametersState.processingParameters,
    subscribersState: state.personalInfo.subscriberListState,
    linkedHandlingModalState: state.linkedHandlingModalState,
    offersState: state.offers,
    cardMode: state.internal.cardMode.cardMode,
    commentsState: state.comments.commentsState,
    changeCodeWordStep: state.changeCodeWord.changeCodeWordStep,

    // WebSeller
    isWebSeller: selectIsWebSeller(state),
    isShowRecreateClientModal: state.recreateClient.currentStepType !== StepTypeRecreateClient.NONE,
    historyChangeSim: state.changeSim.replacementSimCard.historyChangeSim,
    isShowTerminationClient: selectIsShowTerminationClient(state),
    isShowChangingClientStatus: selectIsShowChangingClientStatus(state),
    isShowMnpOrderStepper: selectIsShowMpnProcess(state),
    hasRequiredMarkers: selectHasRequiredMarkers(state)
  }
}
const mapDispatchToProps = {
  unsubscribeSelected,
  getActiveSubscriptions,
  changeServiceStatus,
  getConnectedServices,
  changeVisibility,
  showServiceHistory,
  getServiceHistory,
  getAvailableServices,
  changeAbonentsModalVisibility,
  changeCompensationsHistoryModalVisibility,
  handleToggleServicesPendingOrders,
  fetchGroupList,
  fetchDiscountsList,
  clearDiscountsList,
  fetchSubscribersList,
  clearSubscribersList,
  deleteGroup,
  validateAutopayService,
  getUnpaidChargeDataAndShowAlert,
  clearCompensationsMessages,
  clearValidationMessages,
  fetchUnsibscribeReasons,
  fetchGroupNotificationMessages,
  toggleLinkedHandlingModalVisibility,
  getClientBalance,
  fetchRegisteredOffers,
  fetchOffers,
  getComments,
  checkMnpHandling,
  getHistoryChangeSim
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLogger(CommonInformation)))
