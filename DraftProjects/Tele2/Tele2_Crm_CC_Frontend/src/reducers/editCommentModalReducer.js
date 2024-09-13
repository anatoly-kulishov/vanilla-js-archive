import { createAction, handleActions } from 'redux-actions'

export const EDIT_COMMENT_MODAL_VISIBLE = 'EDIT_COMMENT_MODAL_VISIBLE'

const initialState = {
  isVisible: false
}

export const changeEditCommentModalVisibility = createAction(EDIT_COMMENT_MODAL_VISIBLE)

export default handleActions({
  [EDIT_COMMENT_MODAL_VISIBLE]: (state) => ({
    ...state,
    isVisible: !state.isVisible
  })
}, initialState)
