import { connect } from 'react-redux'

// TODO: Phase 2
// import { toggleRap } from 'reducers/internal/rightModalReducer'
import { setDelayStatus, setWorkStatus, setCloseStatus } from 'reducers/twinspot/conversationsReducer'
import { fetchCuvoLink } from 'reducers/twinspot/messagesReducer'
import Toolbar from './Toolbar'

const mapStateToProps = state => ({
  ...state.twinspot.conversations
})

const mapDispatchToProps = {
  // TODO: Phase 2
  // toggleRap,
  setWorkStatus,
  setDelayStatus,
  setCloseStatus,
  fetchCuvoLink
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
