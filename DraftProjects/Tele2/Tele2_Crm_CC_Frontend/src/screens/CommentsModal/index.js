import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommentsModal from './CommentsModal'
import { withLogger } from 'utils/helpers/logger'
import { handleComment, changeCommentModalVisibility } from 'reducers/comments/commentsReducer'

const mapStateToProps = state => ({
  msisdn: state.internal.queryParamsState.queryParams.msisdn,
  personalAccountState: state.personalInfo.personalAccountState,
  commentsState: state.comments.commentsState,
  isVisible: state.comments.commentsState.isVisible,
  handlingId: state.internal.handlingState.Id
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeCommentModalVisibility,
  handleComment
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(CommentsModal))
