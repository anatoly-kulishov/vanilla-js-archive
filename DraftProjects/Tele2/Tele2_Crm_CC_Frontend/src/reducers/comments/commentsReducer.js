import { createAction, handleActions, combineActions } from 'redux-actions'

export const SHOW_COMMENT_MODAL_VISIBLE = 'comments/SHOW_COMMENT_MODAL_VISIBLE'

export const GET_COMMENTS_FETCH = 'comments/GET_COMMENTS_FETCH'
export const GET_COMMENTS_FETCH_SUCCESS = 'comments/GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FETCH_ERROR = 'comments/GET_COMMENTS_ERROR'
export const GET_COMMENTS_FETCH_FAILURE = 'comments/GET_COMMENTS_FAILURE'

export const HANDLE_COMMENT_FETCH = 'comments/HANDLE_COMMENT_FETCH'
export const HANDLE_COMMENT_FETCH_SUCCESS = 'comments/HANDLE_COMMENT_FETCH_SUCCESS'
export const HANDLE_COMMENT_FETCH_ERROR = 'comments/HANDLE_COMMENT_FETCH_ERROR'
export const HANDLE_COMMENT_FETCH_FAILURE = 'comments/HANDLE_COMMENT_FETCH_FAILURE'

export const FETCH_POPUP_COMMENT = 'comments/FETCH_POPUP_COMMENT'
export const FETCH_POPUP_COMMENT_SUCCESS = 'comments/FETCH_POPUP_COMMENT_SUCCESS'
export const FETCH_POPUP_COMMENT_ERROR = 'comments/FETCH_POPUP_COMMENT_ERROR'
export const FETCH_POPUP_COMMENT_FAILURE = 'comments/FETCH_POPUP_COMMENT_FAILURE'

const initialState = {
  isVisible: false,

  comments: null,
  isCommentsLoading: false,
  commentsError: null,

  handleComment: null,
  isHandleCommentLoading: false,
  handleCommentError: null,

  isPopupComment: false,
  PopupCommentLoading: false,
  PopupCommentError: null
}

export const changeCommentModalVisibility = createAction(SHOW_COMMENT_MODAL_VISIBLE)
export const getComments = createAction(GET_COMMENTS_FETCH)
export const handleComment = createAction(HANDLE_COMMENT_FETCH)
export const fetchPopupComment = createAction(FETCH_POPUP_COMMENT)

export default handleActions({
  [SHOW_COMMENT_MODAL_VISIBLE]: (state) => ({
    ...state,
    isVisible: !state.isVisible
  }),

  [GET_COMMENTS_FETCH]: (state) => ({
    ...state,
    isCommentsLoading: true
  }),
  [GET_COMMENTS_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    comments: Data,
    isCommentsLoading: false,
    commentsError: null
  }),
  [GET_COMMENTS_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    comments: null,
    isCommentsLoading: false,
    commentsError: MessageText
  }),
  [GET_COMMENTS_FETCH_FAILURE]: (state) => ({
    ...state,
    comments: null,
    isCommentsLoading: false,
    commentsError: 'При получении комментариев произошла ошибка'
  }),

  [HANDLE_COMMENT_FETCH]: (state) => ({
    ...state,
    isHandleCommentLoading: true
  }),
  [HANDLE_COMMENT_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    handleComment: Data,
    isHandleCommentLoading: false,
    handleCommentError: null
  }),
  [HANDLE_COMMENT_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    handleComment: null,
    isHandleCommentLoading: false,
    handleCommentError: MessageText
  }),
  [HANDLE_COMMENT_FETCH_FAILURE]: (state) => ({
    ...state,
    handleComment: null,
    isHandleCommentLoading: false,
    handleCommentError: 'При получении комментариев произошла ошибка'
  }),

  [FETCH_POPUP_COMMENT]: state => ({
    ...state,
    PopupCommentLoading: true
  }),
  [FETCH_POPUP_COMMENT_SUCCESS]: state => ({
    ...state,
    PopupCommentLoading: false,
    isPopupComment: true
  }),
  [combineActions(FETCH_POPUP_COMMENT_ERROR, FETCH_POPUP_COMMENT_FAILURE)]: (state) => ({
    ...state,
    PopupCommentLoading: false,
    PopupCommentError: true
  })
}, initialState)
