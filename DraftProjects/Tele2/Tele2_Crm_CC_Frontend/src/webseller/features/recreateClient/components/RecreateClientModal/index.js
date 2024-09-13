import { connect } from 'react-redux'
import { resetProcessRecreateClient } from 'webseller/features/recreateClient/reducer'
import RecreateClientModal from './RecreateClientModal'
import {
  selectRecreateClientCurrentStepType,
  selectRecreateClientType
} from 'webseller/features/recreateClient/selectors'
import { resetSigning } from 'webseller/common/signing/reducer'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'

const mapStateToProps = state => ({
  currStepType: selectRecreateClientCurrentStepType(state),
  recreateClientType: selectRecreateClientType(state)
})

const mapDispatchToProps = dispatch => ({
  resetProcessRecreateClient: () => {
    dispatch(clearFoundAddresses())
    dispatch(resetProcessRecreateClient())
    dispatch(resetSigning())
    dispatch(resetAgreements())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecreateClientModal)
