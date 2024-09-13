import { createAction, handleActions } from 'redux-actions'

export const CHANGE_COMMENTARY_TEMPLATES_FIELDS = 'CHANGE_COMMENTARY_TEMPLATES_FIELDS'

const initialState = {
  commentTemplate: {
    commentTemplateId: null,
    commentName: null,
    commentWeight: null,
    commentText: null,
    isAddComment: null,
    isSystem: false,
    isActive: false,
    isDeleted: null
  }
}

export const changeCommentTemplateFields = createAction(CHANGE_COMMENTARY_TEMPLATES_FIELDS)

export default handleActions({
  [CHANGE_COMMENTARY_TEMPLATES_FIELDS]: (state, { payload: { commentTemplateId, commentName, commentWeight, commentText, isAddComment, isSystem, isActive } }) => ({
    ...state,
    commentTemplate: {
      commentTemplateId: commentTemplateId,
      commentName: commentName,
      commentWeight: commentWeight,
      commentText: commentText,
      isAddComment: isAddComment,
      isSystem: isSystem,
      isActive: isActive,
      isDeleted: null
    }
  })
}, initialState)
