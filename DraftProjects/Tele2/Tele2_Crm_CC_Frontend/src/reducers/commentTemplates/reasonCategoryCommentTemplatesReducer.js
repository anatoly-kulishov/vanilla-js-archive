import { createAction, handleActions } from 'redux-actions'

export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES = 'FETCH_REASON_CATEGORY_COMMENT_TEMPLATES'
export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS = 'FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS'
export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_ERROR = 'FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_ERROR'
export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE = 'FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE'

export const CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH = 'CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH'
export const CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS = 'CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS'
export const CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR = 'CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR'
export const CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE = 'CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE'

export const DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH = 'DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH'
export const DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS = 'DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS'
export const DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR = 'DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR'
export const DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE = 'DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE'

const initialState = {
  reasonCategoryCommentTemplates: null,
  reasonCategoryCommentTemplatesError: null,
  isReasonCategoryCommentTemplatesLoading: false,

  createReasonCategoryCommentTemplate: null,
  createReasonCategoryCommentTemplateError: null,
  isCreateReasonCategoryCommentTemplateLoading: false,

  deleteReasonCategoryCommentTemplate: null,
  deleteReasonCategoryCommentTemplateError: null,
  isDeleteReasonCategoryCommentTemplateLoading: false
}

export const fetchReasonCategoryCommentTemplates = createAction(FETCH_REASON_CATEGORY_COMMENT_TEMPLATES)
export const createReasonCategoryCommentTemplateTemplate = createAction(CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH)
export const deleteReasonCategoryCommentTemplate = createAction(DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH)

export default handleActions({
  [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES]: (state) => ({
    ...state,
    reasonCategoryCommentTemplates: null,
    reasonCategoryCommentTemplatesError: false,
    isReasonCategoryCommentTemplatesLoading: true
  }),

  [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    reasonCategoryCommentTemplates: Data.ResponseModel,
    reasonCategoryCommentTemplatesError: false,
    isReasonCategoryCommentTemplatesLoading: false
  }),

  [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    reasonCategoryCommentTemplates: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    reasonCategoryCommentTemplatesError: true,
    isReasonCategoryCommentTemplatesLoading: false
  }),

  [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE]: (state) => ({
    ...state,
    reasonCategoryCommentTemplates: [],
    reasonCategoryCommentTemplatesError: true,
    isReasonCategoryCommentTemplatesLoading: false
  }),

  [CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH]: (state) => ({
    ...state,
    createReasonCategoryCommentTemplate: null,
    createReasonCategoryCommentTemplateError: false,
    isCreateReasonCategoryCommentTemplateLoading: true
  }),

  [CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    createReasonCategoryCommentTemplate: Data.ResponseModel,
    createReasonCategoryCommentTemplateError: false,
    isCreateReasonCategoryCommentTemplateLoading: false
  }),

  [CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    createReasonCategoryCommentTemplate: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    createReasonCategoryCommentTemplateError: true,
    isCreateReasonCategoryCommentTemplateLoading: false
  }),

  [CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE]: (state) => ({
    ...state,
    createReasonCategoryCommentTemplate: {},
    createReasonCategoryCommentTemplateError: true,
    isCreateReasonCategoryCommentTemplateLoading: false
  }),

  [DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH]: (state) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: null,
    deleteReasonCategoryCommentTemplateError: false,
    isDeleteReasonCategoryCommentTemplateLoading: true
  }),

  [DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS]: (
    state, { payload: {
      Data, isSuccess
    } }) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: Data.ResponseModel,
    deleteReasonCategoryCommentTemplateError: false,
    isDeleteReasonCategoryCommentTemplateLoading: false
  }),

  [DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    deleteReasonCategoryCommentTemplateError: true,
    isDeleteReasonCategoryCommentTemplateLoading: false
  }),

  [DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE]: (state) => ({
    ...state,
    deleteReasonCategoryCommentTemplate: {},
    deleteReasonCategoryCommentTemplateError: true,
    isDeleteReasonCategoryCommentTemplateLoading: false
  })

}, initialState)
