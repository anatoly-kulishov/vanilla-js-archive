import { connect } from 'react-redux'
import { CORRECTION_PROCESS_STEPS, CorrectionDataSigningType } from 'webseller/features/correctionData/helpers'
import EmptyMsisdns from './EmptyMsisdns'
import {
  setSigningType,
  agreeOnPep,
  disagreeOnPep,
  setCorrectionDataProcessStep
} from 'webseller/features/correctionData/reducer'

const mapStateToProps = state => ({
  isLoadingAgreeOnPep: state.correctionData.isLoadingAgreeOnPep,
  isLoadingDisagreeOnPep: state.correctionData.isLoadingDisagreeOnPep
})

const mapDispatchToProps = dispatch => ({
  agreeOnPep: () => {
    dispatch(agreeOnPep())
    dispatch(setSigningType(CorrectionDataSigningType.PEP_CODE))
    dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.SIGNING))
  },
  disagreeOnPep: () => {
    dispatch(disagreeOnPep())
    dispatch(setSigningType(CorrectionDataSigningType.DOCUMENTS))
    dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.SIGNING))
  },
  toPrevStep: () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmptyMsisdns)
