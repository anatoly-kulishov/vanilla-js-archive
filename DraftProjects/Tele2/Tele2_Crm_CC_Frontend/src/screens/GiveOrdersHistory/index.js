import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import GiveOrdersHistory from './GiveOrdersHistory'
import { withLogger } from 'utils/helpers/logger'
import {
  getOrdersStatistic,
  getOrdersHistory
} from 'reducers/giveOrder/historyReducer'

const mapStateToProps = state => {
  return {
    user: state.internal.userState.user,
    ...state.giveOrder.history
  }
}

const mapDispatchToProps = {
  getOrdersStatistic,
  getOrdersHistory
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withLogger(GiveOrdersHistory))
)
