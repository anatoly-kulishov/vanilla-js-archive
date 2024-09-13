import { connect } from 'react-redux'

import { feedbackModalOpen } from 'reducers/feedbackReducer'

import EmptyHeader from './EmptyHeader'

const mapDispatchToProps = {
  feedbackModalOpen
}
const mapStateToProps = state => (
  { userState: state.internal.userState }
)

export default connect(mapStateToProps, mapDispatchToProps)(EmptyHeader)
