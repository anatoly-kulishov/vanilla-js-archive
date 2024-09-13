import { connect } from 'react-redux'
import {
  setSallingProcessStep,
  resetSaleSimProcess,
  checkSimSaleAvailability,
  cancelGetExistingPersonalData
} from 'reducers/saleSim/saleSimReducer'
import { getSmevData, uploadDocument, resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'
import { selectCheckSmev } from 'reducers/checkSmev/selectors'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import SmevPartialSuccess from './SmevPartialSuccess'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { selectIsExistsIdentityDoc, selectIsLoadingCheckSimSaleAvailability } from 'reducers/saleSim/selectors'

const mapStateToProps = state => ({
  permissions: state.internal.userState.user.Permissions,
  isExistsIdentityDoc: selectIsExistsIdentityDoc(state),
  uploadingDocument: selectCheckSmev(state).uploadingDocument,
  isLoadingCheckSimSaleAvailability: selectIsLoadingCheckSimSaleAvailability(state),
  uploadDocumentError: selectCheckSmev(state).uploadDocumentError
})

const mapDispatchToProps = dispatch => ({
  getSmevData: () => dispatch(getSmevData()),
  uploadSmevDocument: payload => dispatch(uploadDocument(payload)),
  checkSimSaleAvailability: () => dispatch(checkSimSaleAvailability()),
  onEdit: () => {
    dispatch(resetCheckSmev())
    dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.DOCUMENT_DATA))
  },
  resetSaleSimProcess: () => {
    dispatch(resetCheckSmev())
    dispatch(resetSaleSimProcess())
    dispatch(resetAgreements())
    dispatch(resetSigning())
  },
  cancelGetExistingPersonalData: () => dispatch(cancelGetExistingPersonalData())
})

export default connect(mapStateToProps, mapDispatchToProps)(SmevPartialSuccess)
