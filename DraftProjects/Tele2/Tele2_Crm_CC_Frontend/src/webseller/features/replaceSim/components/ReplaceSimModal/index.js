import { connect } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'

import { resetReplaceSimProcess } from '../../reducer'
import ReplaceSimModal from './ReplaceSimModal'

const mapStateToProps = state => ({
  replacingProcessStep: state.replaceSim.replacingProcessStep,
  replacingProcessType: state.replaceSim.replacingProcessType
})

const mapDispatchToProps = dispatch => ({
  resetReplaceSimProcess: payload => {
    dispatch(resetSigning())
    dispatch(resetReplaceSimProcess(payload))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplaceSimModal)
