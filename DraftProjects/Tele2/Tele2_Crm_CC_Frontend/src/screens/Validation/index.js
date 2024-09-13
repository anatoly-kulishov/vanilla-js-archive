import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withLogger } from 'utils/helpers/logger'
import Validation from './Validation'
import { getRecognitionValues, getScanFiles, updateRecognitionValues } from 'reducers/mnp/mnpVerifyReducer'

const mapStateToProps = state => ({
  recognitionValues: state.mnp.mnpVerifyState.recognitionValues,
  mnpScanFiles: state.mnp.mnpVerifyState.mnpScanFiles,
  isMnpScanFilesLoading: state.mnp.mnpVerifyState.isMnpScanFilesLoading,
  isMnpScanFilesError: state.mnp.mnpVerifyState.isMnpScanFilesError,
  isRecognitionValuesLoading: state.mnp.mnpVerifyState.isRecognitionValuesLoading,
  isRecognitionValuesError: state.mnp.mnpVerifyState.isRecognitionValuesError
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecognitionValues, getScanFiles, updateRecognitionValues }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(Validation))
