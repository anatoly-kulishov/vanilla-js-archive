import { createAction, handleActions, combineActions } from 'redux-actions'

export const CATEGORIES_LIST_FETCH = 'categories/CATEGORIES_LIST_FETCH'
export const CATEGORIES_LIST_FETCH_SUCCESS = 'categories/CATEGORIES_LIST_FETCH_SUCCESS'
export const CATEGORIES_LIST_FETCH_ERROR = 'categories/CATEGORIES_LIST_FETCH_ERROR'
export const CATEGORIES_LIST_FETCH_FAILURE = 'categories/CATEGORIES_LIST_FETCH_FAILURE'

const initalState = {
  categories: [],
  categoriesError: null,
  isCategoriesLoading: true
}

export const fetchCategoriesList = createAction(CATEGORIES_LIST_FETCH)

export default handleActions({
  [CATEGORIES_LIST_FETCH]: (state) => ({
    ...state,
    categoriesError: null,
    isCategoriesLoading: true
  }),

  [CATEGORIES_LIST_FETCH_SUCCESS]: (state, { payload: { categories } }) => ({
    ...state,
    categories,
    categoriesError: null,
    isCategoriesLoading: false
  }),

  [combineActions(CATEGORIES_LIST_FETCH_ERROR, CATEGORIES_LIST_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    categories: [],
    categoriesError: error,
    isCategoriesLoading: false
  })
}, initalState)
