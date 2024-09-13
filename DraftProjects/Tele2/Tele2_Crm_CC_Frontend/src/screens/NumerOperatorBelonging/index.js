import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWhoIsIt } from 'reducers/personalInfo/numberOperatorBelongingReducer'

import { withLogger } from 'utils/helpers/logger'

import NumberOperatorBelonging from './NumberOperatorBelonging'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.numberOperatorBelonging,
    ...state.internal.queryParamsState.queryParams
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWhoIsIt
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(NumberOperatorBelonging))
