import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withLogger } from 'utils/helpers/logger'
import MnpManualVerification from './MnpManualVerification'
import { fetchMnpOrder, approveOrder, rejectOrder } from 'reducers/mnpOrder/mnpOrderReducer'
import { fetchMnpVerification } from 'reducers/mnpOrder/mnpVerificationReducer'
import { fetchRejectionReasons } from 'reducers/mnpOrder/rejectionInfoReducer'
import { getScanFiles } from 'reducers/mnp/mnpVerifyReducer'

const mapStateToProps = state => ({
  // mnpOrderState: state.mnpOrder.mnpOrderState,
  mnpVerificationState: state.mnpOrder.mnpVerificationState,
  rejectionInfoState: state.mnpOrder.rejectionInfoState,
  mnpScanFilesState: state.mnp.mnpVerifyState,
  user: state.internal.userState.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchMnpOrder, approveOrder, rejectOrder, fetchMnpVerification, fetchRejectionReasons, getScanFiles },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(MnpManualVerification))
