import { connect } from 'react-redux'

import { passQueryParams } from 'reducers/internal/parameters'
import { getPersonalAccount } from 'reducers/personalInfo/personalInfoReducer'
import { requestParametersProcessing as fetchParametersProcessing } from 'reducers/internal/requestParametersProcessingReducer'
import { getSubscriberList, fetchSubscriberStatuses } from 'reducers/personalInfo/subscriberListReducer'
import { fetchAllocatedInfo } from 'reducers/internal/allocatedInfoReducer'
import { changeVisibilityNotification } from 'reducers/internal/notifications'
import { createHandling, checkRepeatedHandling } from 'reducers/internal/handlingReducer'
import { fetchPopupComment } from 'reducers/comments/commentsReducer'
import { fetchWhoIsIt } from 'reducers/personalInfo/numberOperatorBelongingReducer'
import { fetchWebimHash, fetchWebimDns } from 'reducers/webim/webimReducer'
import { getPersonId } from 'reducers/person/personReducer'
import {
  connectCustomerSegmentsPreviewWs,
  disconnectCustomerSegmentsPreviewWs
} from 'reducers/person/customerSegmentsReducer'
import { fetchTariffInfoPreview } from 'reducers/services/tariffInfoReducer'
import { selectHasRequiredMarkers, selectIsLoadedWebSellerMarkers } from 'selectors/mnpSelectors'

import { selectIsWebSeller } from 'webseller/common/user/selectors'

import CardLayout from './CardLayout'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.internal.userState,
    ...state.internal.processingParametersState,
    ...state.internal.queryParamsState,
    ...state.webim.webimState,
    cardMode: state.internal.cardMode.cardMode,
    contentState: state.contentState,
    parametersState: state.parametersState,
    notifications: state.internal.notificationsState,
    isNotificationHidden: !state.internal.notificationsState.hidden,
    isOffersModalToggled: state.offers.isToggled,
    isVisibleServicesPendingOrders: state.services.servicesState.isVisibleServicesPendingOrders,
    isVisibleTicketInfoModal: state.tickets.historyTickets.isVisibleTicketInfoModal,
    isTpNewVisible: state.finance.temporaryPay.isTpNewVisible,
    mnpData: state.mnp.mnpState.markerData,
    mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,
    isFeedbackModalVisible: state.feedback.isVisible,
    handlingId: state.internal.handlingState?.Id,
    isWhoIsItLoading: state.personalInfo.numberOperatorBelonging.isWhoIsItLoading,
    isMultisubscriptionModalOpen: state.services.servicesState.isMultisubscriptionModalOpen,
    personId: state.person.personState.personId,
    customerSegmentsPreviewWsStatus: state.person.customerSegmentsState.customerSegmentsPreviewWsStatus,
    hasRequiredMarkers: selectHasRequiredMarkers(state),
    isWebSeller: selectIsWebSeller(state),
    isLoadingCard: selectIsWebSeller(state)
      ? [
        // Селекторы инициализации карточки
        selectIsLoadedWebSellerMarkers(state)
      ].every((isLoaded) => !isLoaded)
      : false
  }
}

const mapDispatchToProps = {
  passQueryParams,
  getPersonalAccount,
  changeVisibilityNotification,
  createHandling,
  checkRepeatedHandling,
  fetchPopupComment,
  getSubscriberList,
  fetchParametersProcessing,
  fetchSubscriberStatuses,
  fetchAllocatedInfo,
  fetchWhoIsIt,
  fetchWebimHash,
  getPersonId,
  connectCustomerSegmentsPreviewWs,
  disconnectCustomerSegmentsPreviewWs,
  fetchWebimDns,
  fetchTariffInfoPreview
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLayout)
