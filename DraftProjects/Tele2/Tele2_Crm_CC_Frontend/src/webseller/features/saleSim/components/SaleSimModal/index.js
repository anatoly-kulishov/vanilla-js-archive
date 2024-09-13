import { connect } from 'react-redux'
import {
  cancelGetExistingPersonalData,
  clearFoundAddresses,
  resetSaleSimProcess as resetSaleSimProcessAction
} from 'reducers/saleSim/saleSimReducer'
import { resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import SaleSimModal from './SaleSimModal'

const mapStateToProps = state => ({
  sallingProcessType: state.saleSim.sallingProcessType,
  sallingProcessStep: state.saleSim.sallingProcessStep
})

const mapDispatchToProps = dispatch => ({
  resetSaleSimProcess: () => {
    dispatch(cancelGetExistingPersonalData())
    dispatch(clearFoundAddresses())
    dispatch(resetSaleSimProcessAction())
    dispatch(resetCheckSmev())
    dispatch(resetAgreements())
    dispatch(resetSigning())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleSimModal)
