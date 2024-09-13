import { connect } from 'react-redux'
import { toggleRap } from 'reducers/internal/rightModalReducer'
import { fetchConversations } from 'reducers/twinspot/conversationsReducer'

import Dialog from './Dialog'

const mapStateToProps = state => ({
  ...state.internal.queryParamsState
})

const mapDispatchToProps = {
  toggleRap,
  fetchConversations
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
