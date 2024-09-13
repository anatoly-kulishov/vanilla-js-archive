import { connect } from 'react-redux'

import RatePlanModal from './RatePlanModal'

const mapStateToProps = state => ({
  unpaidChargeData: state.finance.remains.unpaidChargeData
})

export default connect(mapStateToProps)(RatePlanModal)
