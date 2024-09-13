import { connect } from 'react-redux'
import { selectOrderNumber } from 'reducers/giveOrder/giveOrderStepsReducer'
import Order from './Order'

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  selectOrderNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
