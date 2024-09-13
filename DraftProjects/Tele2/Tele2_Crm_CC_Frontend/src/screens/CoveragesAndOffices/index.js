import { connect } from 'react-redux'

import { registerMtpNote } from 'reducers/massProblems/massProblemRegisterNoteReducer'
import { createCoveragesAndOfficesNote } from 'reducers/diagnostics/noteReducer'
import { bindActionCreators } from 'redux'

import autoInteractionData from 'selectors/autoInteractionSelector'

import CoveragesAndOffices from './CoveragesAndOffices'

const mapStateToProps = state => {
  return {
    coveragesAndOffices: state.diagnostics.diagnosticsState.coveragesAndOffices,
    interactions: state.reasonsRegistering.interactions,
    autoInteractionData: autoInteractionData(state),
    isCreateCoveragesAndOfficesNoteLoading: state.diagnostics.noteState.isCreateCoveragesAndOfficesNoteLoading,
    isMtpNoteLoading: state.massProblems.registerMtpNoteState.isMtpNoteLoading,
    msisdn: state.personalInfo.personalAccountState.personalAccount?.Msisdn
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createCoveragesAndOfficesNote,
      registerMtpNote
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CoveragesAndOffices)
