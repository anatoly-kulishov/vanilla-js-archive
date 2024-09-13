import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withLogger } from 'utils/helpers/logger'
import {
  initSellSim,
  initSellESim,
  initTransferToTele2,
  getSalesReportShort,
  setSalesReportShortLoading,
  getSellAvailability,
  getSimCardAvailability,
  setSallingProcessStep,
  addSim,
  setAddSimError,
  clearAddedSims
} from 'reducers/saleSim/saleSimReducer'
import { initGiveOrder } from 'reducers/giveOrder/giveOrderStepsReducer'
import Dashboard from './Dashboard'
import { selectHasAllRequiredDataForSaleUntemplatedSim, selectIsLoadingSellAvailability, selectIsLoadingShopNumbersSaleSim, selectIsLoadingShopTariffsSaleSim } from 'reducers/saleSim/selectors'

const mapStateToProps = state => ({
  ...state.internal.userState,
  ...state.saleSim,
  ...state.replaceSim,
  isLoadingSaleSimRequiredData:
    selectIsLoadingSellAvailability(state) ||
    selectIsLoadingShopNumbersSaleSim(state) ||
    selectIsLoadingShopTariffsSaleSim(state),
  hasAllRequiredData: selectHasAllRequiredDataForSaleUntemplatedSim(state),
  ...state.giveOrder.giveOrderSteps,
  officeId: state.salesOffice.activeSalesOffice?.salesOfficeId
})

const mapDispatchToProps = {
  initSellSim,
  initSellESim,
  initTransferToTele2,
  initGiveOrder,
  getSellAvailability,
  getSalesReportShort,
  setSalesReportShortLoading,
  getSimCardAvailability,
  setSallingProcessStep,
  addSim,
  setAddSimError,
  clearAddedSims
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLogger(Dashboard)))
