import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withLogger } from 'utils/helpers/logger'
import { getSalesReportFull } from 'reducers/saleSim/saleSimReducer'
import SalesReport from './SalesReport'

const mapStateToProps = state => {
  return {
    ...state.saleSim,
    ...state.internal.userState
  }
}

const mapDispatchToProps = {
  getSalesReportFull
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLogger(SalesReport)))
