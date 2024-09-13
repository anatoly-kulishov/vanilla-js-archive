import { connect } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'

import { resetReplaceSimProcess, sendSimChanges, setReplacingProcessStep } from '../../reducer'
import { REPLACE_PROCESS_STEPS } from '../../constants'
import ResultStep from './ResultStep'

const mapStateToProps = state => ({
  documentData: state.replaceSim.documentData,
  isSuccessReplaceSim: state.replaceSim.isSuccessReplaceSim,
  isReplaceSimLoading: state.replaceSim.isReplaceSimLoading,
  isReplaceSimError: state.replaceSim.isReplaceSimError
})

const mapDispatchToProps = dispatch => ({
  onSendSimChanges: payload => dispatch(sendSimChanges(payload)),
  onSubmit: payload => {
    dispatch(resetSigning())
    dispatch(setReplacingProcessStep(REPLACE_PROCESS_STEPS.NONE))
    dispatch(resetReplaceSimProcess(payload))
    window.location.reload()
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultStep)
