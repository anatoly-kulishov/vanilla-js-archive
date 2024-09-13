import { connect } from 'react-redux'

import EmptyLayout from './EmptyLayout'

const mapStateToProps = state => ({
  ...state.internal.userState,
  isVisibleTicketInfoModal: state.tickets.historyTickets.isVisibleTicketInfoModal,
  isFeedbackModalVisible: state.feedback.isVisible
})

export default connect(mapStateToProps, null)(EmptyLayout)
