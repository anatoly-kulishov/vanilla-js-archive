import { all, takeEvery } from 'redux-saga/effects'

import { GET_COMMENTS_FETCH, HANDLE_COMMENT_FETCH, FETCH_POPUP_COMMENT } from 'reducers/comments/commentsReducer'
import { fetchCommentsSaga, fetchHandleCommentSaga, fetchPopupCommentSaga } from './commentsSaga'

export default function * () {
  yield all([
    takeEvery(GET_COMMENTS_FETCH, fetchCommentsSaga),
    takeEvery(HANDLE_COMMENT_FETCH, fetchHandleCommentSaga),
    takeEvery(FETCH_POPUP_COMMENT, fetchPopupCommentSaga)
  ])
}
