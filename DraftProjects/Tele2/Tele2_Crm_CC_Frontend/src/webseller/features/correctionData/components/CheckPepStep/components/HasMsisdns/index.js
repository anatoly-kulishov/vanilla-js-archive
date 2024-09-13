import { connect } from 'react-redux'
import { CORRECTION_PROCESS_STEPS, CorrectionDataSigningType } from 'webseller/features/correctionData/helpers'
import HasMsisdns from './HasMsisdns'
import {
  selectPepMsisdn,
  setSigningType,
  agreeOnPep,
  disagreeOnPep,
  setCorrectionDataProcessStep
} from 'webseller/features/correctionData/reducer'

const mapStateToProps = state => ({
  msisdns: state.correctionData.pepMsisdns,
  selectedMsisdn: state.correctionData.selectedPepMsisdn,
  isLoadingDisagreeOnPep: state.correctionData.isLoadingDisagreeOnPep
})

const mapDispatchToProps = dispatch => ({
  agreeOnPepCode: () => {
    dispatch(agreeOnPep())
    dispatch(setSigningType(CorrectionDataSigningType.PEP_CODE))
    dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.SIGNING))
  },
  selectPepMsisdn: payload => dispatch(selectPepMsisdn(payload)),
  disagreeOnPep: () => {
    dispatch(disagreeOnPep())
    dispatch(setSigningType(CorrectionDataSigningType.DOCUMENTS))
    dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.SIGNING))
  },
  toPrevStep: () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA))
})

export default connect(mapStateToProps, mapDispatchToProps)(HasMsisdns)
