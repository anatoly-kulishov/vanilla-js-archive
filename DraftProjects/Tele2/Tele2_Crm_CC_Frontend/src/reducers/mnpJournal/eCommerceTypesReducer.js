import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_ECOMMERCE_TYPES = 'eCommerce/FETCH_ECOMMERCE_TYPES'
export const FETCH_ECOMMERCE_TYPES_SUCCESS = 'eCommerce/FETCH_ECOMMERCE_TYPES_SUCCESS'
export const FETCH_ECOMMERCE_TYPES_ERROR = 'eCommerce/FETCH_ECOMMERCE_TYPES_ERROR'
export const FETCH_ECOMMERCE_TYPES_FAILURE = 'eCommerce/FETCH_ECOMMERCE_TYPES_FAILURE'

export const fetchECommerceTypes = createAction(FETCH_ECOMMERCE_TYPES)

const initialState = {
  eCommerceTypes: null,
  isECommerceTypesLoading: false,
  eCommerceTypesError: ''
}

export default handleActions(
  {
    [FETCH_ECOMMERCE_TYPES]: produce((state) => {
      state.isECommerceTypesLoading = true
    }),

    [FETCH_ECOMMERCE_TYPES_SUCCESS]: produce((state, { payload }) => {
      state.eCommerceTypes = payload
      state.isECommerceTypesLoading = false
    }),

    [combineActions(FETCH_ECOMMERCE_TYPES_ERROR, FETCH_ECOMMERCE_TYPES_FAILURE)]: produce((state, { payload }) => {
      state.eCommerceTypesError = payload
      state.isECommerceTypesLoading = false
    })
  },
  initialState
)
