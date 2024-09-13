import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLogger } from 'utils/helpers/logger'
import Comments from './Comments'
import { getComments, handleComment, changeCommentModalVisibility } from 'reducers/comments/commentsReducer'
import { checkRight } from 'utils/helpers'

const mapStateToProps = state => {
  const user = state.internal.userState.user
  const { isASSeller: isWebSellerView } = user
  return {
    queryParamsState: state.internal.queryParamsState,
    personalAccountState: state.personalInfo.personalAccountState,
    commentsState: state.comments.commentsState,
    handlingId: state.internal.handlingState.Id,
    isCommentsPermission: !isWebSellerView && checkRight(user, 'CC:Comments'),
    isWebSellerView
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getComments,
      handleComment,
      changeCommentModalVisibility
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(Comments))
