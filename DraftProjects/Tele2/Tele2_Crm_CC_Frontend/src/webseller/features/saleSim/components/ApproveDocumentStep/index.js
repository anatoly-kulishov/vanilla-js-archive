import { connect } from 'react-redux'
import { setSallingProcessStep, resetSaleSimProcess, checkSimSaleAvailability } from 'reducers/saleSim/saleSimReducer'
import { getSmevData, resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'
import { selectCheckSmev } from 'reducers/checkSmev/selectors'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import ApproveDocumentStep from './ApproveDocumentStep'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'

const mapStateToProps = state => ({
  documentData: state.saleSim.documentData,
  smevLoading: selectCheckSmev(state).smevLoading,
  smevDataError: selectCheckSmev(state).smevDataError,
  checkSmevPartialSuccess: selectCheckSmev(state).checkSmevPartialSuccess,
  checkSmevError: selectCheckSmev(state).checkSmevError
})

const mapDispatchToProps = dispatch => ({
  onEdit: () => {
    dispatch(resetCheckSmev())
    dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.DOCUMENT_DATA))
  },
  getSmevData: () => dispatch(getSmevData()),
  checkSimSaleAvailability: () => dispatch(checkSimSaleAvailability()),
  resetSaleSimProcess: () => {
    dispatch(resetCheckSmev())
    dispatch(resetSaleSimProcess())
    dispatch(resetAgreements())
    dispatch(resetSigning())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApproveDocumentStep)
