import { createAction, handleActions } from 'redux-actions'

export const SET_REASONS_CATEGORY = 'reasonCategory/SET_REASONS'

const SELECT_REASON_CATEGORY = 'reasonCategory/SELECT_REASON_CATEGORY'
export const SELECT_REASON = 'reasonCategory/SELECT_REASON'
export const SELECT_CATEGORY = 'reasonCategory/SELECT_CATEGORY'
const REASONS_CHANGE = 'reasonCategory/REASONS_CHANGE'

const initialState = {
  reasons: [],
  availableCategories: [],
  reasonsSearchValue: null,
  selectedReason: null,
  selectedCategory: null
}

export const setReasonsCategory = createAction(SET_REASONS_CATEGORY)
export const selectReason = createAction(SELECT_REASON)
export const selectCategory = createAction(SELECT_CATEGORY)
export const reasonsChange = createAction(REASONS_CHANGE)
export const selectReasonCategory = createAction(SELECT_REASON_CATEGORY)

export default handleActions(
  {
    [SET_REASONS_CATEGORY]: (state, { payload: { reasons, categories, parameters } }) => {
      return {
        ...state,
        reasons,
        reasonsParameters: parameters,
        availableCategories: categories
      }
    },

    [SELECT_REASON]: (state, { payload: { reason } }) => {
      const isReasonsTableCollapsed = !!reason
      return {
        ...state,
        selectedReason: reason,
        // selectedCategory: selectionReason && category,
        isReasonsTableCollapsed: isReasonsTableCollapsed
      }
    },

    [SELECT_CATEGORY]: (state, { payload: { category } }) => {
      if (category) {
        const { active, ...categoryDefault } = category
        return {
          ...state,
          selectedCategory: categoryDefault
        }
      } else {
        return {
          ...state,
          selectedCategory: category
        }
      }
    },

    [SELECT_REASON_CATEGORY]: (state, { payload: { reason, category } }) => {
      reason = reason.reason
      return {
        ...state,
        selectedReason: reason,
        selectedCategory: reason && reason.Categories.find(someCategory => someCategory.active)
      }
    },

    [REASONS_CHANGE]: (state, { payload: { reasons } }) => {
      return {
        ...state,
        reasons
      }
    }
  },
  initialState
)
