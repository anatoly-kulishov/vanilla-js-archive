import { createAction, handleActions } from 'redux-actions'

export const COMMENTARY_TEMPLATE_MODAL_VISIBLE = 'COMMENTARY_TEMPLATE_MODAL_VISIBLE'

const initialState = {
  isVisiblecommentTemplate: false,
  reasonIdForTemplateAdminState: null,
  categoryIdForTemplateAdminState: null
}

export const changeCommentTemplateModalVisibility = createAction(COMMENTARY_TEMPLATE_MODAL_VISIBLE)

export default handleActions({
  [COMMENTARY_TEMPLATE_MODAL_VISIBLE]: (state, { payload: { reasonId, categoryId } }) => ({
    ...state,
    isVisiblecommentTemplate: !state.isVisiblecommentTemplate,
    reasonIdForTemplateAdminState: reasonId,
    categoryIdForTemplateAdminState: categoryId
  })
}, initialState)
