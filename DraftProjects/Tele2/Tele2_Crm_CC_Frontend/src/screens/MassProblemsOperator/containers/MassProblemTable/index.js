import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MassProblemsTable from './MassProblemsTable'

import {
  registerMtpNote,
  fetchSubscriberInfo,
  changeMsisdnStatusArray
} from 'reducers/massProblems/massProblemRegisterNoteReducer'

import { deleteInteraction } from 'reducers/reasonsRegisteringReducer'

const mapStateToProps = state => ({
  regionProblems: state.massProblems.massProblemForRegionState.regionProblems,
  msisdnStatusArray: state.massProblems.registerMtpNoteState.msisdnStatusArray,
  handlingId: state.internal.handlingState.Id,
  interactions: state.reasonsRegistering.interactions,
  personalAccountState: state.personalInfo.personalAccountState,
  isNoteCreating: state.massProblems.registerMtpNoteState.isMtpNoteLoading,
  isLoadingInteractions: state.reasonsRegistering.isLoadingInteractions
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerMtpNote,
  fetchSubscriberInfo,
  changeMsisdnStatusArray,
  deleteInteraction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MassProblemsTable)
