import { connect } from 'react-redux'
import { requestSmsCode, cancelRecreateClientOnline, verifySmsCode } from 'webseller/features/recreateClient/reducer'
import OnlineAvailabilityStep from './OnlineAvailabilityStep'
import { resetSigning } from 'webseller/common/signing/reducer'

const mapStateToProps = state => ({
  isLoadingOnlineAvailability: state.recreateClient.isLoadingOnlineAvailability,
  isLoadingRequestSmsCode: state.recreateClient.isLoadingRequestSmsCode,
  isLoadingVerifySmsCode: state.recreateClient.isLoadingVerifySmsCode,
  waitingTimeRefreshSmsCode: state.recreateClient.waitingTimeRefreshSmsCode
})

const mapDispatchToProps = dispatch => ({
  verifySmsCode: payload => dispatch(verifySmsCode(payload)),
  requestSmsCode: () => dispatch(requestSmsCode()),
  onCancel: () => {
    dispatch(cancelRecreateClientOnline())
    dispatch(resetSigning())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OnlineAvailabilityStep)
