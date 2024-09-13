import { createAction, handleActions, combineActions } from 'redux-actions'
import { findReason } from 'utils/helpers'

export const FETCH_REASONS = 'rightModal/smsSending/FETCH_REASONS'
export const FETCH_REASONS_SUCCESS = 'rightModal/smsSending/FETCH_REASONS_SUCCESS'
export const FETCH_REASONS_FAILURE = 'rightModal/smsSending/FETCH_REASONS_FAILURE'

export const FETCH_TEMPLATES = 'rightModal/smsSending/FETCH_TEMPLATES'
export const FETCH_TEMPLATES_SUCCESS = 'rightModal/smsSending/FETCH_TEMPLATES_SUCCESS'
export const FETCH_TEMPLATES_FAILURE = 'rightModal/smsSending/FETCH_TEMPLATES_FAILURE'

export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES =
  'rightModal/smsSending/FETCH_REASON_CATEGORY_COMMENT_TEMPLATES'
export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS =
  'rightModal/smsSending/FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS'
export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE =
  'rightModal/smsSending/FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE'

export const FETCH_SENDERS = 'rightModal/smsSending/FETCH_SENDERS'
export const FETCH_SENDERS_SUCCESS = 'rightModal/smsSending/FETCH_SENDERS_SUCCESS'
export const FETCH_SENDERS_FAILURE = 'rightModal/smsSending/FETCH_SENDERS_FAILURE'

export const FETCH_PERIOD_OF_SILENCE = 'rightModal/smsSending/FETCH_PERIOD_OF_SILENCE'
export const FETCH_PERIOD_OF_SILENCE_SUCCESS = 'rightModal/smsSending/FETCH_PERIOD_OF_SILENCE_SUCCESS'
export const FETCH_PERIOD_OF_SILENCE_FAILURE = 'rightModal/smsSending/FETCH_PERIOS_OF_SILENCE_FAILURE'

export const FETCH_LTE_NUMBER = 'rightModal/smsSending/FETCH_LTE_NUMBER'
export const FETCH_LTE_NUMBER_SUCCESS = 'rightModal/smsSending/FETCH_LTE_NUMBER_SUCCESS'
export const FETCH_LTE_NUMBER_FAILURE = 'rightModal/smsSending/FETCH_LTE_NUMBER_FAILURE'

export const SEND_SMS = 'rightModal/smsSending/SEND_SMS'
export const RESET_SMS = 'rightModal/smsSending/RESET_SMS'
export const SEND_SMS_SUCCESS = 'rightModal/smsSending/SEND_SMS_SUCCESS'
export const SEND_SMS_FAILURE = 'rightModal/smsSending/SEND_SMS_FAILURE'

export const CANCEL_SMS = 'rightModal/smsSending/CANCEL_SMS'
export const CANCEL_SMS_SUCCESS = 'rightModal/smsSending/CANCEL_SMS_SUCCESS'
export const CANCEL_SMS_FAILURE = 'rightModal/smsSending/CANCEL_SMS_FAILURE'

export const CHANGE_COMMENT_TEMPLATE = 'rightModal/smsSending/CHANGE_COMMENT_TEMPLATE'

export const SELECT_TEMPLATE = 'rightModal/smsSending/SELECT_TEMPLATE'
export const SELECT_REASON_CATEGORY = 'rightModal/smsSending/SELECT_REASON_CATEGORY'

export const FILTER_REASONS = 'rightModal/smsSending/FILTER_REASONS'
export const FILTER_TEMPLATES = 'rightModal/smsSending/FILTER_TEMPLATES'

export const SET_REASONS_INITIAL = 'rightModal/smsSending/SET_REASONS_INITIAL'
export const SET_TEMPLATES_INITIAL = 'rightModal/smsSending/SET_TEMPLATES_INITIAL'

const initialState = {
  initialReasons: [],
  reasons: [],
  parameters: [],
  initialTemplates: [],
  templates: null,
  reasonCategoryCommentTemplates: [],
  categories: [],
  senders: [],
  selectedTemplate: null,
  selectedReason: null,
  selectedCategory: null,
  periodOfSilence: {},
  lteNumber: null,
  smsStatus: { IsError: false },

  firstBoot: false,

  reasonsFilterFields: {
    reasonName: null
  },
  templatesFilterFields: {
    templateName: null
  }
}

export const sendSms = createAction(SEND_SMS)
export const resetSms = createAction(RESET_SMS)
export const cancelSms = createAction(CANCEL_SMS)
export const changeCommentTemplate = createAction(CHANGE_COMMENT_TEMPLATE)

export const selectReasonCategory = createAction(SELECT_REASON_CATEGORY)
export const selectTemplate = createAction(SELECT_TEMPLATE)

export const fetchSenders = createAction(FETCH_SENDERS)
export const fetchPeriodOfSilence = createAction(FETCH_PERIOD_OF_SILENCE)
export const fetchLteNumber = createAction(FETCH_LTE_NUMBER)

export const filterReasons = createAction(FILTER_REASONS)
export const filterTemplates = createAction(FILTER_TEMPLATES)

export const fetchTemplates = createAction(FETCH_TEMPLATES)
export const fetchReasonCategoryCommentTemplates = createAction(FETCH_REASON_CATEGORY_COMMENT_TEMPLATES)
export const fetchReasons = createAction(FETCH_REASONS)

export default handleActions({
  [FILTER_REASONS]: (state, { payload: { field, value } }) => {
    const isReasonNameFilter = field === 'reasonName' && (value.length >= 3 || value.length === 0)
    const isCategoryIdFilter = field === 'categoryId'

    const reasons = isReasonNameFilter || isCategoryIdFilter
      ? []
      : state.reasons

    const isReasonsLoading = isReasonNameFilter || isCategoryIdFilter

    return {
      ...state,
      reasons,
      isReasonsLoading,
      reasonsFilterFields: {
        ...state.reasonsFilterFields,
        [field]: value
      }
    }
  },

  [FILTER_TEMPLATES]: (state, { payload: { field, value } }) => {
    return {
      ...state,
      templates: (value.length === 0 || value.length > 3) ? null : state.templates,
      templatesFilterFields: {
        ...state.templatesFilterFields,
        [field]: value
      }
    }
  },

  [SELECT_REASON_CATEGORY]: (state, { payload: { reason, category } }) => {
    return {
      ...state,
      selectedReason: reason,
      selectedCategory: category,
      reasonCategoryCommentTemplates: !reason ? [] : state.reasonCategoryCommentTemplates
    }
  },

  [SELECT_TEMPLATE]: (state, { payload: { template } }) => {
    if (!template) {
      return {
        ...state,
        selectedTemplate: null,
        selectedReason: null,
        selectedCategory: null,
        reasonCategoryCommentTemplates: []
      }
    } else {
      const reason = findReason(state.initialReasons, template.ReasonId)

      return {
        ...state,
        selectedTemplate: template,
        selectedReason: reason,
        selectedCategory: reason.Categories.find(item => item.CategoryId === template.CategoryId)
      }
    }
  },

  [SET_REASONS_INITIAL]: state => {
    return {
      ...state,
      reasons: state.initialReasons
    }
  },

  [SET_TEMPLATES_INITIAL]: state => {
    return {
      ...state,
      templates: state.initialTemplates
    }
  },

  [FETCH_REASONS]: state => {
    return {
      ...state,
      reasons: [],
      isReasonsLoading: true
    }
  },

  [FETCH_REASONS_SUCCESS]: (state, { payload: { Reasons, Categories, GlobalParameters } }) => {
    const initialReasons = state.initialReasons.length
      ? state.initialReasons
      : Reasons

    return {
      ...state,
      initialReasons,
      isReasonsLoading: false,
      reasons: Reasons,
      parameters: GlobalParameters,
      categories: Categories
    }
  },

  [FETCH_REASONS_FAILURE]: (state) => {
    return {
      ...state,
      reasons: [],
      isReasonsLoading: false
    }
  },

  [FETCH_TEMPLATES_SUCCESS]: (state, { payload: { templates } }) => {
    const initialTemplates = state.initialTemplates.length
      ? state.initialTemplates
      : templates

    return {
      ...state,
      initialTemplates,
      templates,
      firstBoot: true
    }
  },

  [FETCH_TEMPLATES_FAILURE]: (state) => {
    return {
      ...state,
      templates: []
    }
  },

  [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS]: (state, { payload: { reasonCategoryCommentTemplates } }) => {
    return {
      ...state,
      reasonCategoryCommentTemplates
    }
  },

  [combineActions(FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE, FETCH_SENDERS_FAILURE, FETCH_PERIOD_OF_SILENCE_FAILURE, FETCH_LTE_NUMBER_FAILURE)]:
  (state) => {
    return {
      ...state
    }
  },

  [FETCH_SENDERS_SUCCESS]: (state, { payload: data }) => {
    return {
      ...state,
      senders: data
    }
  },

  [FETCH_PERIOD_OF_SILENCE_SUCCESS]: (state, { payload: data }) => {
    return {
      ...state,
      periodOfSilence: data
    }
  },

  [FETCH_LTE_NUMBER_SUCCESS]: (state, { payload: number }) => {
    return {
      ...state,
      lteNumber: number
    }
  },

  [SEND_SMS]: (state) => {
    return {
      ...state,
      smsStatus: {
        ...state.smsStatus,
        IsError: false,
        IsSuccess: false,
        isLoading: true
      }
    }
  },

  [RESET_SMS]: state => {
    return {
      ...state,
      smsStatus: {
        ...state.smsStatus,
        IsError: false,
        IsSuccess: false,
        isLoading: false
      }
    }
  },

  [SEND_SMS_SUCCESS]: (state, { payload: data }) => {
    return {
      ...state,
      smsStatus: {
        ...data,
        isLoading: false
      }
    }
  },

  [SEND_SMS_FAILURE]: (state) => {
    return {
      ...state,
      smsStatus: {
        ...state.smsStatus,
        IsError: true,
        isLoading: false
      }
    }
  },

  [CANCEL_SMS_SUCCESS]: (state) => {
    return {
      ...state,
      smsStatus: {
        ...state.smsStatus,
        isCancelled: true,
        isLoading: false
      }
    }
  },

  [CANCEL_SMS_FAILURE]: (state, { payload: data }) => {
    return {
      ...state,
      smsStatus: {
        ...state.smsStatus,
        cancelError: data,
        isLoading: false
      }
    }
  },

  [CHANGE_COMMENT_TEMPLATE]: (state, { payload: { CommentText, CommentName, CommentId } }) => {
    const templateState = state.selectedTemplate
    return {
      ...state,
      selectedTemplate: {
        ...templateState,
        CommentText: CommentText,
        CommentName: CommentName,
        CommentId: CommentId
      }
    }
  }
},
initialState
)
