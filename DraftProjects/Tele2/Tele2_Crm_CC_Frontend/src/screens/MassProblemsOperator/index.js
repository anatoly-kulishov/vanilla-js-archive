import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MassProblemsOperator from './MassProblemsOperator'
import { fetchInteractions, deleteInteraction } from 'reducers/reasonsRegisteringReducer'

import { registerMtpNote, fetchSubscriberInfo, changeMsisdnStatusArray } from 'reducers/massProblems/massProblemRegisterNoteReducer'
import { changeProblemRegion } from 'reducers/massProblems/massProblemReducer'
import { fetchRegions } from 'reducers/massProblems/massProblemServiceReducer'
import { fetchProblemsForRegion, getServiceChannelInterfaces } from 'reducers/massProblems/massProblemForRegionReducer'

import { withLogger } from 'utils/helpers/logger'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { getTypeCard } from 'webseller/helpers'

const mapStateToProps = state => ({
  queryParamsState: state.internal.queryParamsState,
  personalAccountState: state.personalInfo.personalAccountState,
  interactions: state.reasonsRegistering.interactions,
  handlingId: state.internal.handlingState.Id,
  isNoteCreating: state.massProblems.registerMtpNoteState.isMtpNoteLoading,
  region: state.massProblems.massProblemState.billingBranchId,
  regions: state.massProblems.massProblemServiceState.regions,
  isRegionsLoading: state.massProblems.massProblemServiceState.isRegionsLoading,
  regionProblems: state.massProblems.massProblemForRegionState.regionProblems,
  isRegionProblemsLoading: state.massProblems.massProblemForRegionState.isRegionProblemsLoading,
  serviceChannelInterfaces: state.massProblems.massProblemForRegionState.serviceChannelInterfaces,
  msisdnStatusArray: state.massProblems.registerMtpNoteState.msisdnStatusArray,
  isLoadingInteractions: state.reasonsRegistering.isLoadingInteractions,
  processingParameters: state.internal.processingParametersState,
  isWebSeller: selectIsWebSeller(state),
  isAnonymousCardWebSeller: getTypeCard(selectIsWebSeller(state)).isAnonymousCard
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchRegions,
  fetchProblemsForRegion,
  deleteInteraction,
  fetchInteractions,
  registerMtpNote,
  changeProblemRegion,
  fetchSubscriberInfo,
  changeMsisdnStatusArray,
  getServiceChannelInterfaces
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(MassProblemsOperator))
