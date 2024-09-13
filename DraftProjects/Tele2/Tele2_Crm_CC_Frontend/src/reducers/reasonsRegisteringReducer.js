import { createAction, handleActions } from 'redux-actions'
import { setWith, without } from 'lodash'

export const FETCH_REASONS = 'rightModal/reasonsRegistering/FETCH_REASONS'
export const FETCH_REASONS_SUCCESS = 'rightModal/reasonsRegistering/FETCH_REASONS_SUCCESS'
export const FETCH_REASONS_FAILURE = 'rightModal/reasonsRegistering/FETCH_REASONS_FAILURE'

export const FETCH_COMPANY_MARKS = 'rightModal/reasonsRegistering/FETCH_COMPANY_MARKS'
export const FETCH_COMPANY_MARKS_SUCCESS = 'rightModal/reasonsRegistering/FETCH_COMPANY_MARKS_SUCCESS'
export const FETCH_COMPANY_MARKS_FAILURE = 'rightModal/reasonsRegistering/FETCH_COMPANY_MARKS_FAILURE'

export const FETCH_COMPANY_MARKS_FOR_HANDLING = 'rightModal/reasonsRegistering/FETCH_COMPANY_MARKS_FOR_HANDLING'
export const FETCH_COMPANY_MARKS_FOR_HANDLING_SUCCESS =
  'rightModal/reasonsRegistering/FETCH_COMPANY_MARKS_FOR_HANDLING_SUCCESS'
export const FETCH_COMPANY_MARKS_FOR_HANDLING_FAILURE =
  'rightModal/reasonsRegistering/FETCH_COMPANY_MARKS_FOR_HANDLING_FAILURE'

export const CHANGE_COMPANY_MARK = 'rightModal/reasonsRegistering/CHANGE_COMPANY_MARK'
export const SET_COMPANY_MARK = 'rightModal/reasonsRegistering/SET_COMPANY_MARK'
export const SET_COMPANY_MARK_SUCCESS = 'rightModal/reasonsRegistering/SET_COMPANY_MARK_SUCCESS'
export const SET_COMPANY_MARK_FAILURE = 'rightModal/reasonsRegistering/SET_COMPANY_MARK_FAILURE'

export const REMOVE_COMPANY_MARK = 'rightModal/reasonsRegistering/REMOVE_COMPANY_MARK'
export const REMOVE_COMPANY_MARK_SUCCESS = 'rightModal/reasonsRegistering/REMOVE_COMPANY_MARK_SUCCESS'
export const REMOVE_COMPANY_MARK_FAILURE = 'rightModal/reasonsRegistering/REMOVE_COMPANY_MARK_FAILURE'

export const FETCH_INTERACTIONS = 'rightModal/reasonsRegistering/FETCH_INTERACTIONS'
export const FETCH_INTERACTIONS_SUCCESS = 'rightModal/reasonsRegistering/FETCH_INTERACTIONS_SUCCESS'
export const FETCH_INTERACTIONS_FAILURE = 'rightModal/reasonsRegistering/FETCH_INTERACTIONS_FAILURE'

export const CREATE_INTERACTION = 'rightModal/reasonsRegistering/CREATE_INTERACTION'
export const CREATE_INTERACTION_SUCCESS = 'rightModal/reasonsRegistering/CREATE_INTERACTION_SUCCESS'
export const CREATE_INTERACTION_FAILURE = 'rightModal/reasonsRegistering/CREATE_INTERACTION_FAILURE'

export const DELETE_INTERACTION = 'rightModal/reasonsRegistering/DELETE_INTERACTION'
export const DELETE_INTERACTION_SUCCESS = 'rightModal/reasonsRegistering/DELETE_INTERACTION_SUCCESS'
export const DELETE_INTERACTION_FAILURE = 'rightModal/reasonsRegistering/DELETE_INTERACTION_FAILURE'

export const EDIT_INTERACTION_COMMENT = 'rightModal/reasonsRegistering/EDIT_INTERACTION_COMMENT'
export const EDIT_INTERACTION_COMMENT_SUCCESS = 'rightModal/reasonsRegistering/EDIT_INTERACTION_COMMENT_SUCCESS'
export const EDIT_INTERACTION_COMMENT_FAILURE = 'rightModal/reasonsRegistering/EDIT_INTERACTION_COMMENT_FAILURE'

export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS =
  'rightModal/reasonsRegistering/FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS'

export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE =
  'rightModal/reasonsRegistering/FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE'

export const FETCH_REASON_CATEGORY_COMMENT_TEMPLATES =
  'rightModal/reasonsRegistering/FETCH_REASON_CATEGORY_COMMENT_TEMPLATES'

export const FETCH_INTERACTIONS_COMMENT_TEMPLATES_SUCCESS =
  'rightModal/reasonsRegistering/FETCH_INTERACTIONS_COMMENT_TEMPLATES_SUCCESS'

export const FETCH_INTERACTIONS_COMMENT_TEMPLATES_FAILURE =
  'rightModal/reasonsRegistering/FETCH_INTERACTIONS_COMMENT_TEMPLATES_FAILURE'

export const FETCH_INTERACTIONS_COMMENT_TEMPLATES =
  'rightModal/reasonsRegistering/FETCH_INTERACTIONS_COMMENT_TEMPLATES'

export const CLEAR_INTERACTIONS_COMMENT_TEMPLATES =
  'rightModal/reasonsRegistering/CLEAR_INTERACTIONS_COMMENT_TEMPLATES'

export const CHANGE_REASON_CATEGORY = 'rightModal/reasonsRegistering/CHANGE_REASON_CATEGORY'
export const CLEAR_CHANGED_REASONS_CATEGORIES = 'rightModal/reasonsRegistering/CLEAR_CHANGED_REASONS_CATEGORIES'
export const FILTER_REASONS = 'rightModal/reasonsRegistering/FILTER_REASONS'
export const CLEAR_REASON_CATEGORY = 'rightModal/reasonsRegistering/CLEAR_REASON_CATEGORY'
export const SET_REASONS_INITIAL = 'rightModal/reasonsRegistering/SET_REASONS_INITIAL'

const initialState = {
  initialReasons: [],
  reasons: [],
  parameters: [],
  changedReasonsCategories: {},
  interactionsCommentTemplates: {},
  categories: [],
  companyMarks: [],
  interactions: [],
  isLoadingInteractions: false,
  filterFields: {},
  selectedCompanyMarks: [],
  marksToRemove: [],
  marksToAdd: []
}

export const changeReasonCategory = createAction(CHANGE_REASON_CATEGORY)
export const fetchInteractions = createAction(FETCH_INTERACTIONS)
export const fetchCompanyMarks = createAction(FETCH_COMPANY_MARKS)
export const setCompanyMark = createAction(SET_COMPANY_MARK)
export const marksChange = createAction(CHANGE_COMPANY_MARK)
export const removeCompanyMark = createAction(REMOVE_COMPANY_MARK)
export const createInteraction = createAction(CREATE_INTERACTION)
export const deleteInteraction = createAction(DELETE_INTERACTION)
export const filterReasons = createAction(FILTER_REASONS)
export const fetchReasons = createAction(FETCH_REASONS)
export const editInteractionComment = createAction(EDIT_INTERACTION_COMMENT)
export const fetchCompanyMarksForHandling = createAction(FETCH_COMPANY_MARKS_FOR_HANDLING)
export const fetchReasonCategoryCommentTemplates = createAction(FETCH_REASON_CATEGORY_COMMENT_TEMPLATES)
export const fetchInteractionsCommentTemplates = createAction(FETCH_INTERACTIONS_COMMENT_TEMPLATES)
export const clearInteractionsCommentTemplates = createAction(CLEAR_INTERACTIONS_COMMENT_TEMPLATES)
export const clearChangedReasonsCategories = createAction(CLEAR_CHANGED_REASONS_CATEGORIES)

export default handleActions(
  {
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
        filterFields: {
          ...state.filterFields,
          [field]: value
        }
      }
    },

    [CLEAR_REASON_CATEGORY]: state => ({
      ...state,
      initialReasons: [],
      reasons: [],
      categories: []
    }),

    [CHANGE_REASON_CATEGORY]: (state, { payload: { reason, category, field, value } }) => {
      const updatedChangedReasonsCategories = {
        ...state.changedReasonsCategories
      }

      setWith(updatedChangedReasonsCategories, [reason.ReasonId, category.CategoryId, field], value, Object)

      return {
        ...state,
        changedReasonsCategories: updatedChangedReasonsCategories
      }
    },

    [CLEAR_CHANGED_REASONS_CATEGORIES]: (state) => ({
      ...state,
      changedReasonsCategories: {}
    }),

    [SET_REASONS_INITIAL]: state => ({
      ...state,
      reasons: state.initialReasons
    }),

    [FETCH_REASONS]: (state) => ({
      ...state,
      isReasonsLoading: true,
      reasons: []
    }),

    [FETCH_REASONS_SUCCESS]: (state, { payload: { Reasons, Categories, GlobalParameters } }) => {
      const initialReasons = state.initialReasons.length
        ? state.initialReasons
        : Reasons

      return {
        ...state,
        isReasonsFirstFetchComplete: true,
        isReasonsLoading: false,
        initialReasons,
        reasons: Reasons,
        parameters: GlobalParameters,
        categories: Categories
      }
    },

    [FETCH_REASONS_FAILURE]: (state) => ({
      ...state,
      isReasonsLoading: false,
      reasons: []
    }),

    [SET_COMPANY_MARK_SUCCESS]: (state, { payload: { markId } }) => ({
      ...state,
      selectedCompanyMarkId: markId
    }),

    [REMOVE_COMPANY_MARK_SUCCESS]: (state) => ({
      ...state,
      selectedCompanyMarkId: null
    }),

    [FETCH_COMPANY_MARKS_SUCCESS]: (state, { payload: { companyMarks } }) => ({
      ...state,
      companyMarks: companyMarks
    }),

    [FETCH_COMPANY_MARKS_FAILURE]: (state) => ({ ...state }),

    [FETCH_INTERACTIONS]: (state) => ({
      ...state,
      isLoadingInteractions: true
    }),

    [FETCH_INTERACTIONS_SUCCESS]: (state, { payload: { interactions } }) => ({
      ...state,
      interactions: interactions,
      isLoadingInteractions: false
    }),

    [FETCH_INTERACTIONS_FAILURE]: (state) => ({
      ...state,
      isLoadingInteractions: false
    }),

    [CREATE_INTERACTION_FAILURE]: (state) => ({ ...state }),

    [DELETE_INTERACTION_FAILURE]: (state) => ({ ...state }),

    [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS]: (state, { payload: {
      reasonId,
      categoryId,
      commentTemplates
    } }) => {
      const updatedChangedReasonsCategories = {
        ...state.changedReasonsCategories
      }

      setWith(updatedChangedReasonsCategories, [reasonId, categoryId, 'commentTemplates'], commentTemplates, Object)

      return {
        ...state,
        changedReasonsCategories: updatedChangedReasonsCategories
      }
    },

    [FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE]: (state) => ({ ...state }),

    [FETCH_INTERACTIONS_COMMENT_TEMPLATES]: (state) => ({
      ...state,
      interactionsCommentTemplates: null
    }),

    [FETCH_INTERACTIONS_COMMENT_TEMPLATES_SUCCESS]: (state, { payload: { reasonId, categoryId, commentTemplates } }) => {
      const updatedinteractionsCommentTemplates = {
        ...state.interactionsCommentTemplates
      }

      setWith(updatedinteractionsCommentTemplates, [reasonId, categoryId, 'commentTemplates'], commentTemplates, Object)

      return {
        ...state,
        interactionsCommentTemplates: updatedinteractionsCommentTemplates
      }
    },

    [FETCH_INTERACTIONS_COMMENT_TEMPLATES_FAILURE]: (state) => ({ ...state }),

    [CLEAR_INTERACTIONS_COMMENT_TEMPLATES]: (state) => ({
      ...state,
      interactionsCommentTemplates: {}
    }),

    [CHANGE_COMPANY_MARK]: (state, { payload: { marksId } }) => ({
      ...state,
      selectedCompanyMarks: marksId,
      marksToRemove: without(state.selectedCompanyMarks, ...marksId),
      marksToAdd: without(marksId, ...state.selectedCompanyMarks)
    }),

    [FETCH_COMPANY_MARKS_FOR_HANDLING_SUCCESS]: (state, { payload: { companyMarksForHandling } }) => ({
      ...state,
      selectedCompanyMarks: companyMarksForHandling && companyMarksForHandling.map((item) => item.MarkId)
    }),

    [FETCH_COMPANY_MARKS_FOR_HANDLING_FAILURE]: (state) => ({ ...state })
  },

  initialState
)
