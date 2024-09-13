import { connect } from 'react-redux'
import SellSimStep from './SellSimStep'
import {
  deleteSim,
  changeSimTariff,
  changeSimNumber,
  getShopNumbers,
  getSearchShopNumbers,
  sellAddedSims,
  setSallingProcessStep,
  resetPersonalAccountNumber,
  resetSaleSimProcess
} from 'reducers/saleSim/saleSimReducer'
import { resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'

const mapStateToProps = state => ({
  sallingProcessType: state.saleSim.sallingProcessType,
  addedSims: state.saleSim.addedSims,
  shopTariffs: state.saleSim.shopTariffs,
  shopNumbers: state.saleSim.shopNumbers,
  shopNumbersIndexSeed: state.saleSim.shopNumbersIndexSeed,
  foundShopNumbers: state.saleSim.foundShopNumbers,
  isSaleAddedSimsLoading: state.saleSim.isSaleAddedSimsLoading,
  isSaleAddedSimsError: state.saleSim.isSaleAddedSimsError,
  mainClientName: state.saleSim.mainClientName
})
const mapDispatchToProps = dispatch => ({
  deleteSim: payload => dispatch(deleteSim(payload)),
  changeSimTariff: payload => dispatch(changeSimTariff(payload)),
  changeSimNumber: payload => dispatch(changeSimNumber(payload)),
  getShopNumbers: payload => dispatch(getShopNumbers(payload)),
  getSearchShopNumbers: payload => dispatch(getSearchShopNumbers(payload)),
  sellAddedSims: payload => dispatch(sellAddedSims(payload)),
  onClickAddNewSim: () => dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.ADD)),
  toStep: payload => dispatch(setSallingProcessStep(payload)),
  toPrevStep: () => {
    dispatch(resetSaleSimProcess())
    dispatch(resetCheckSmev())
    dispatch(resetAgreements())
    dispatch(resetSigning())
    dispatch(resetPersonalAccountNumber())

    dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.ADD))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SellSimStep)
