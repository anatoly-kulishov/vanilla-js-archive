import { createAction, handleActions } from 'redux-actions'

export const FETCH_COMMENT_TEMPLATES = 'FETCH_COMMENT_TEMPLATES'
export const FETCH_COMMENT_TEMPLATES_SUCCESS = 'FETCH_COMMENT_TEMPLATES_SUCCESS'
export const FETCH_COMMENT_TEMPLATES_ERROR = 'FETCH_COMMENT_TEMPLATES_ERROR'
export const FETCH_COMMENT_TEMPLATES_FAILURE = 'FETCH_COMMENT_TEMPLATES_FAILURE'

export const CREATE_COMMENT_TEMPLATE_FETCH = 'CREATE_COMMENT_TEMPLATE_FETCH'
export const CREATE_COMMENT_TEMPLATE_FETCH_SUCCESS = 'CREATE_COMMENT_TEMPLATE_FETCH_SUCCESS'
export const CREATE_COMMENT_TEMPLATE_FETCH_ERROR = 'CREATE_COMMENT_TEMPLATE_FETCH_ERROR'
export const CREATE_COMMENT_TEMPLATE_FETCH_FAILURE = 'CREATE_COMMENT_TEMPLATE_FETCH_FAILURE'

export const DELETE_COMMENT_TEMPLATE_FETCH = 'DELETE_COMMENT_TEMPLATE_FETCH'
export const DELETE_COMMENT_TEMPLATE_FETCH_SUCCESS = 'DELETE_COMMENT_TEMPLATE_FETCH_SUCCESS'
export const DELETE_COMMENT_TEMPLATE_FETCH_ERROR = 'DELETE_COMMENT_TEMPLATE_FETCH_ERROR'
export const DELETE_COMMENT_TEMPLATE_FETCH_FAILURE = 'DELETE_COMMENT_TEMPLATE_FETCH_FAILURE'

export const MODIFY_COMMENT_TEMPLATE_FETCH = 'MODIFY_COMMENT_TEMPLATE_FETCH'
export const MODIFY_COMMENT_TEMPLATE_FETCH_SUCCESS = 'MODIFY_COMMENT_TEMPLATE_FETCH_SUCCESS'
export const MODIFY_COMMENT_TEMPLATE_FETCH_ERROR = 'MODIFY_COMMENT_TEMPLATE_FETCH_ERROR'
export const MODIFY_COMMENT_TEMPLATE_FETCH_FAILURE = 'MODIFY_COMMENT_TEMPLATE_FETCH_FAILURE'

const initialState = {
  commentTemplates: null,
  commentTemplatesError: null,
  isCommentTemplatesLoading: false,

  createCommentTemplate: null,
  createCommentTemplateError: null,
  isCreateCommentTemplateLoading: false,

  deleteReasonCategoryCommentTemplate: null,
  deleteReasonCategoryCommentTemplateError: null,
  isDeleteReasonCategoryCommentTemplateLoading: false,

  modifyCommentTemplate: null,
  modifyCommentTemplateError: null,
  isModifyCommentTemplateLoading: false
}

export const fetchCommentTemplates = createAction(FETCH_COMMENT_TEMPLATES)
export const createCommentTemplate = createAction(CREATE_COMMENT_TEMPLATE_FETCH)
export const deleteCommentTemplate = createAction(DELETE_COMMENT_TEMPLATE_FETCH)
export const modifyCommentTemplate = createAction(MODIFY_COMMENT_TEMPLATE_FETCH)

export default handleActions({
  [FETCH_COMMENT_TEMPLATES]: (state) => ({
    ...state,
    commentTemplates: null,
    commentTemplatesError: false,
    isCommentTemplatesLoading: true
  }),

  [FETCH_COMMENT_TEMPLATES_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    commentTemplates: Data.ResponseModel,
    commentTemplatesError: false,
    isCommentTemplatesLoading: false
  }),

  [FETCH_COMMENT_TEMPLATES_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    commentTemplates: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    commentTemplatesError: true,
    isCommentTemplatesLoading: false
  }),

  [FETCH_COMMENT_TEMPLATES_FAILURE]: (state) => ({
    ...state,
    commentTemplates: {},
    commentTemplatesError: true,
    isCommentTemplatesLoading: false
  }),

  [CREATE_COMMENT_TEMPLATE_FETCH]: (state) => ({
    ...state,
    createCommentTemplate: null,
    createCommentTemplateError: false,
    isCreateCommentTemplateLoading: true
  }),

  [CREATE_COMMENT_TEMPLATE_FETCH_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    createCommentTemplate: Data.ResponseModel,
    createCommentTemplateError: false,
    isCreateCommentTemplateLoading: false
  }),

  [CREATE_COMMENT_TEMPLATE_FETCH_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    createCommentTemplate: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    createCommentTemplateError: true,
    isCreateCommentTemplateLoading: false
  }),

  [CREATE_COMMENT_TEMPLATE_FETCH_FAILURE]: (state) => ({
    ...state,
    createCommentTemplate: {},
    createCommentTemplateError: true,
    isCreateCommentTemplateLoading: false
  }),

  [DELETE_COMMENT_TEMPLATE_FETCH]: (state) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: null,
    deleteReasonCategoryCommentTemplateError: false,
    isDeleteReasonCategoryCommentTemplateLoading: true
  }),

  [DELETE_COMMENT_TEMPLATE_FETCH_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: Data.ResponseModel,
    deleteReasonCategoryCommentTemplateError: false,
    isDeleteReasonCategoryCommentTemplateLoading: false
  }),

  [DELETE_COMMENT_TEMPLATE_FETCH_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    deleteReasonCategoryCommentTemplateError: true,
    isDeleteReasonCategoryCommentTemplateLoading: false
  }),

  [DELETE_COMMENT_TEMPLATE_FETCH_FAILURE]: (state) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: {},
    deleteReasonCategoryCommentTemplateError: true,
    isDeleteReasonCategoryCommentTemplateLoading: false
  }),

  [MODIFY_COMMENT_TEMPLATE_FETCH]: (state) => ({
    ...state,
    modifyCommentTemplate: null,
    modifyCommentTemplateError: false,
    isModifyCommentTemplateLoading: true
  }),

  [MODIFY_COMMENT_TEMPLATE_FETCH_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    modifyCommentTemplate: Data.ResponseModel,
    modifyCommentTemplateError: false,
    isModifyCommentTemplateLoading: false
  }),

  [MODIFY_COMMENT_TEMPLATE_FETCH_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    modifyCommentTemplate: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    modifyCommentTemplateError: true,
    isModifyCommentTemplateLoading: false
  }),

  [MODIFY_COMMENT_TEMPLATE_FETCH_FAILURE]: (state) => ({
    ...state,
    modifyCommentTemplate: {},
    modifyCommentTemplateError: true,
    isModifyCommentTemplateLoading: false
  })
}, initialState)
