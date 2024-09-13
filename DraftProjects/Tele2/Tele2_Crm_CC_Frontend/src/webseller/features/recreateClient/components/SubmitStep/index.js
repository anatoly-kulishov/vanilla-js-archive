import { connect } from 'react-redux'
import { changeRecreateClientStep } from 'webseller/features/recreateClient/reducer'
import { StepTypeRecreateClient } from 'webseller/features/recreateClient/helpers'
import SubmitStep from './SubmitStep'

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  toNextStep: () => dispatch(changeRecreateClientStep(StepTypeRecreateClient.DOCUMENTS)),
  toPrevStep: () => dispatch(changeRecreateClientStep(StepTypeRecreateClient.ADDITIONAL_AGREEMENTS))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitStep)
