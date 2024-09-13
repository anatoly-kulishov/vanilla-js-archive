import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  getPersonalAccount,
  changePersonalInfoFields,
  changePersonalBranchFields
} from 'reducers/personalInfo/personalInfoReducer'
import { fetchVipSegmentation } from 'reducers/personalInfo/dataClientSubscriberReducer'
import { toggleRap } from 'reducers/internal/rightModalReducer'
import { changeModalVisibility } from 'reducers/tickets/createTicketReducer'
import { changeProblemRegion } from 'reducers/massProblems/massProblemReducer'
import { changeCommentTemplateModalVisibility } from 'reducers/commentaryTemplateModalReducer'
import { toggleOffers } from 'reducers/offersReducer'
import { fetchWhoIsIt } from 'reducers/personalInfo/numberOperatorBelongingReducer'
import { changeAbonentsModalVisibility } from 'reducers/personalInfo/abonentsModalReducer'
import { handleVisibleModal } from 'reducers/services/tariffModalReducer'
import { fetchRegions } from 'reducers/massProblems/massProblemServiceReducer'
import { fetchProblemsForRegion } from 'reducers/massProblems/massProblemForRegionReducer'
import { fetchTemplates } from 'reducers/smsSendingReducer'
import { getReasonCategoryForEscalation } from 'reducers/reasonsCategories/reasonCategoryForEscalationReducer'
import { getUnpaidChargeData } from 'reducers/finance/remainsReducer'
import { fetchHandlingStatus } from 'reducers/internal/handlingReducer'
import { fetchSubscriberMarginMarker } from 'reducers/margin/marginReducer'

import { fetchBlacklistInfo, fetchWebimBlacklistInfo } from 'reducers/mnp/blacklistReducer'

import { withLogger } from 'utils/helpers/logger'

import RightBlock from './RightBlock'
import {
  handleVisibleReplacementSimCardModal,
  handleVisibleDuplicateSearchModal,
  handleVisibleHistoryIccModal,
  clearReplacementSimCardModal,
  validateSimProfile,
  sendSmsReplacementSim,
  changeSim,
  getHistoryChangeSim,
  getReasonsChangeSim
} from 'reducers/changeSim/replacementSimCardReducer'

import { fetchPersonalData } from 'reducers/personalInfo/personalDataReducer'
import { handleVisiblePersonModal } from 'reducers/person/personModalReducer'
import { initChangingClientStatus } from 'webseller/features/changingClientStatus/actions'

// WebSeller
import { selectIsShowChangingTariffPlanStatus } from 'webseller/features/changingTariffPlan/selectors'

const mapStateToProps = state => ({
  ...state.internal.queryParamsState,
  ...state.changeSim,
  email: state.internal.queryParamsState.queryParams.email,
  msisdn: state.internal.queryParamsState.queryParams.msisdn,
  dialogNickname: state.internal.queryParamsState.queryParams.dialogNickname,
  cardMode: state.internal.cardMode.cardMode,
  personalAccountState: state.personalInfo.personalAccountState,
  offers: state.offers,
  user: state.internal.userState.user,
  massProblemRegionState: state.massProblems.massProblemServiceState.regions,
  handlingId: state.internal.handlingState.Id,
  subscriberListState: state.personalInfo.subscriberListState,
  vipSegmentation: state.personalInfo.dataClientSubscriber.vipSegmentation,
  processingParametersState: state.internal.processingParametersState,
  whoIsIt: state.personalInfo.numberOperatorBelonging.whoIsIt,
  tariffModalState: state.services.tariffModal,
  unpaidChargeData: state.finance.remains.unpaidChargeData,

  virtualNumbers: state.services.servicesState.virtualNumbers,
  IsActiveVirtualNumber: state.services.servicesState.IsActiveVirtualNumber,
  trustCreditInfo: state.finance.balance.trustCreditInfo,

  ...state.mnp.blacklistState,
  personalData: state.personalInfo.personalData,
  allocatedInfo: state.internal.allocatedInfo,
  mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,

  handlingStatus: state.internal.handlingState.handlingStatus,
  isHandlingStatusLoading: state.internal.handlingState.isHandlingStatusLoading,

  subscriberMarginMarker: state.margin.marginState.subscriberMarginMarker,

  chargeCounter: state.charge.chargeState.chargeCounter,
  isVisiblePersonModal: state.person.personModalState.isVisiblePersonModal,
  customerSegmentsPreview: state.person.customerSegmentsState.customerSegmentsPreview,
  customerSegmentsPreviewWsStatus: state.person.customerSegmentsState.customerSegmentsPreviewWsStatus,
  personId: state.person.personState.personId,
  tariffInfoPreview: state.services.tariffInfoState.tariffInfoPreview,

  // WebSeller
  isShowChangingTariffPlanStatus: selectIsShowChangingTariffPlanStatus(state)
})

const mapDispatchToProps = {
  changePersonalInfoFields,
  changePersonalBranchFields,
  getPersonalAccount,
  toggleRap,
  toggleOffers,
  fetchRegions,
  changeModalVisibility,
  fetchProblemsForRegion,
  changeProblemRegion,
  changeCommentTemplateModalVisibility,
  changeAbonentsModalVisibility,
  fetchTemplates,
  fetchWhoIsIt,
  handleVisibleModal,
  getReasonCategoryForEscalation,
  handleVisibleReplacementSimCardModal,
  handleVisibleDuplicateSearchModal,
  handleVisibleHistoryIccModal,
  clearReplacementSimCardModal,
  validateSimProfile,
  sendSmsReplacementSim,
  changeSim,
  getHistoryChangeSim,
  getReasonsChangeSim,
  getUnpaidChargeData,

  fetchBlacklistInfo,
  fetchWebimBlacklistInfo,
  fetchPersonalData,

  fetchHandlingStatus,
  fetchVipSegmentation,
  fetchSubscriberMarginMarker,
  handleVisiblePersonModal,

  // WebSeller
  initChangingClientStatus
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLogger(RightBlock)))
