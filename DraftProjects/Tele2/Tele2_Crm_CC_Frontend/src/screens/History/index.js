import { connect } from 'react-redux'

import History from './History'
import { withLogger } from 'utils/helpers/logger'

const mapStateToProps = state => {
  return {
    user: state.internal.userState.user,
    cardMode: state.internal.cardMode.cardMode
  }
}

export default connect(mapStateToProps, null)(withLogger(History))
