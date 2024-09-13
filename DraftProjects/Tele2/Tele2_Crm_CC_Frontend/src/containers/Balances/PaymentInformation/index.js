import { connect } from 'react-redux'
import PaymentInformation from './PaymentInformation'

import {
  getLastPayment,
  deleteT2PayCard
} from 'reducers/finance/paymentInformationReducer'

const mapStateToProps = state => ({
  userState: state.internal.userState,
  lastPayment: state.finance.paymentInformation.lastPayment,
  isLoadingLastPayment: state.finance.paymentInformation.isLoadingLastPayment,
  isErrorLastPayment: state.finance.paymentInformation.isErrorLastPayment,
  cardMode: state.internal.cardMode.cardMode
})

const mapDispatchToProps = {
  getLastPayment,
  deleteT2PayCard
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformation)
