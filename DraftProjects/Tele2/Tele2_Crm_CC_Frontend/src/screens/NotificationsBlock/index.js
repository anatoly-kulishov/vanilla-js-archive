import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NotificationBlock from './NotificationsBlock'

import { toggleNotificationsBlock } from '../../reducers/notificationsBlockReducer'

const mapStateToProps = state => {
  return {
    isToggled: state.notificationsBlock.isToggled,
    reasons: state.notificationsBlock.reasons,
    type: state.notificationsBlock.type
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleNotificationsBlock
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBlock)
