import { connect } from 'react-redux'
import { withLogger } from 'utils/helpers/logger'

import Coverage from './Coverage'

const mapStateToProps = state => {
  return {
    mtpJournalForPeriod: state.massProblems.massProblemDiagnosticsState.mtpJournalForPeriod,
    isActualMtpJournalForPeriodLoading:
      state.massProblems.massProblemDiagnosticsState.isActualMtpJournalForPeriodLoading,

    coverageInfo: state.diagnostics.diagnosticsState.coverageInfo,
    ...state.diagnostics.diagnosticsState.coveragesAndOffices,
    isCoveragesAndOfficesLoading: state.diagnostics.diagnosticsState.isCoveragesAndOfficesLoading
  }
}

export default connect(mapStateToProps, null)(withLogger(Coverage))
