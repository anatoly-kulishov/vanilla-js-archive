import { createAction, handleActions, combineActions } from 'redux-actions'

export const FETCH_HLR = 'services/FETCH_HLR'
export const FETCH_HLR_SUCCESS = 'services/FETCH_HLR_SUCCESS'
export const FETCH_HLR_ERROR = 'services/FETCH_HLR_ERROR'
export const FETCH_HLR_FAILURE = 'services/FETCH_HLR_FAILURE'

export const RESET_HLR = 'services/RESET_HLR'
export const RESET_HLR_SUCCESS = 'services/RESET_HLR_SUCCESS'
export const RESET_HLR_ERROR = 'services/RESET_HLR_ERROR'
export const RESET_HLR_FAILURE = 'services/RESET_HLR_FAILURE'

export const CHANGE_HLR = 'services/CHANGE_HLR'
export const CHANGE_HLR_SUCCESS = 'services/CHANGE_HLR_SUCCESS'
export const CHANGE_HLR_ERROR = 'services/CHANGE_HLR_ERROR'
export const CHANGE_HLR_FAILURE = 'services/CHANGE_HLR_FAILURE'

export const fetchHlr = createAction(FETCH_HLR)
export const resetHlr = createAction(RESET_HLR)
export const changeHlr = createAction(CHANGE_HLR)

const initialState = {
  hlr: null,
  isHlrLoading: false,
  isHlrError: false
}

export default handleActions({
  [FETCH_HLR]: (state) => ({
    ...state,
    hlr: null,
    isHlrLoading: true,
    isHlrError: false
  }),

  [FETCH_HLR_SUCCESS]: (state, { payload: { hlr } }) => ({
    ...state,
    hlr,
    isHlrLoading: false,
    isHlrError: false
  }),

  [combineActions(FETCH_HLR_ERROR, FETCH_HLR_FAILURE, RESET_HLR_ERROR, RESET_HLR_FAILURE, CHANGE_HLR_ERROR, CHANGE_HLR_FAILURE)]:
  (state) => ({
    ...state,
    isHlrLoading: false,
    isHlrError: true
  }),

  [combineActions(RESET_HLR, CHANGE_HLR)]:
  (state) => ({
    ...state,
    isHlrLoading: true,
    isHlrError: false
  })
}, initialState)
