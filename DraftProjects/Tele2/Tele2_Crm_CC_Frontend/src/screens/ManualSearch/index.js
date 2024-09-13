import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withLogger } from 'utils/helpers/logger'
import ManualSearch from './ManualSearch'

import { fetchChannels } from 'reducers/reasonsCategories/reasonsListReducer'

const mapStateToProps = state => ({
  ...state.internal.userState
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchChannels
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLogger(ManualSearch)))
