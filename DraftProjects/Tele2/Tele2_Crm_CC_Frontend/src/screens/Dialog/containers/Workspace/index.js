import { connect } from 'react-redux'
import { fetchMessages } from 'reducers/twinspot/messagesReducer'

import Workspace from './Workspace'

const mapStateToProps = state => ({
  ...state.internal.queryParamsState,
  ...state.twinspot.messages
})

const mapDispatchToProps = {
  fetchMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)
