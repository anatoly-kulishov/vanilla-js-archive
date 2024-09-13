import { connect } from 'react-redux'

import { passQueryParams } from 'reducers/internal/parameters'

import TwinspotLayout from './TwinspotLayout'

const mapStateToProps = state => ({
  userState: state.internal.userState,
  isFeedbackModalVisible: state.feedback.isVisible,
  ...state.internal.queryParamsState
})

const mapDispathToProps = {
  passQueryParams
}

export default connect(mapStateToProps, mapDispathToProps)(TwinspotLayout)
