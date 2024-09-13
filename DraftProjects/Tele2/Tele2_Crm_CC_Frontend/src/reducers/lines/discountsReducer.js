import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const DISCOUNTS_LIST_FETCH = 'lines/DISCOUNTS_LIST_FETCH'
export const DISCOUNTS_LIST_FETCH_SUCCESS = 'lines/DISCOUNTS_LIST_FETCH_SUCCESS'
export const DISCOUNTS_LIST_FETCH_ERROR = 'lines/DISCOUNTS_LIST_FETCH_ERROR'
export const DISCOUNTS_LIST_FETCH_FAILURE = 'lines/DISCOUNTS_LIST_FETCH_FAILURE'
export const DISCOUNTS_LIST_CLEAR = 'lines/DISCOUNTS_LIST_CLEAR'

const initialState = {
  discountList: null,
  isDiscountListLoading: false,
  discountListError: ''
}

export const fetchDiscountsList = createAction(DISCOUNTS_LIST_FETCH)
export const clearDiscountsList = createAction(DISCOUNTS_LIST_CLEAR)

export default handleActions({
  [DISCOUNTS_LIST_FETCH]: produce((state, action) => {
    state.discountList = null
    state.isDiscountListLoading = true
    state.discountListError = ''
  }),
  [DISCOUNTS_LIST_FETCH_SUCCESS]: produce((state, { payload }) => {
    state.discountList = payload
    state.isDiscountListLoading = false
  }),
  [combineActions(DISCOUNTS_LIST_FETCH_ERROR, DISCOUNTS_LIST_FETCH_FAILURE)]:
    produce((state, { payload }) => {
      state.discountListError = payload
      state.isDiscountListLoading = false
    }),
  [DISCOUNTS_LIST_CLEAR]: produce((state, action) => {
    state.discountList = null
    state.isDiscountListLoading = false
  })
}, initialState)
