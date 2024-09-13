import { connect } from 'react-redux'
import { CORRECTION_PROCESS_STEPS } from 'webseller/features/correctionData/helpers'
import { approvePersonalData, setCorrectionDataProcessStep } from 'webseller/features/correctionData/reducer'
import ApprovePersonalDataCommon from 'webseller/common/personalData/components/ApprovePersonalData'

const mapStateToProps = state => ({
  personalData: state.correctionData.documentData
})

const mapDispatchToProps = dispatch => ({
  approveData: () => dispatch(approvePersonalData()),
  editData: () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.DOCUMENT_DATA))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApprovePersonalDataCommon)
