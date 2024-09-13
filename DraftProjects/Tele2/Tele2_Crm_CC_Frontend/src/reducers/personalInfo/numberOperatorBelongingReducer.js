import { createAction, handleActions, combineActions } from 'redux-actions'

export const FETCH_WHO_IS_IT = 'dataClientSubscriber/FETCH_WHO_IS_IT'
export const FETCH_WHO_IS_IT_SUCCESS = 'dataClientSubscriber/FETCH_WHO_IS_IT_SUCCESS'
export const FETCH_WHO_IS_IT_ERROR = 'dataClientSubscriber/FETCH_WHO_IS_IT_ERROR'
export const FETCH_WHO_IS_IT_FAILURE = 'dataClientSubscriber/FETCH_WHO_IS_IT_FAILURE'

const initalState = {
  whoIsIt: null,
  isWhoIsItLoading: false,
  isWhoIsItError: false,
  whoIsItMessage: null
}

export const fetchWhoIsIt = createAction(FETCH_WHO_IS_IT)

export default handleActions({
  [FETCH_WHO_IS_IT]: (state, payload) => {
    return {
      ...state,
      whoIsIt: null,
      isWhoIsItLoading: true,
      isWhoIsItError: false,
      whoIsItMessage: null
    }
  },

  [FETCH_WHO_IS_IT_SUCCESS]: (state, { payload: { Data, IsSuccess, MessageText } }) => {
    return {
      ...state,
      whoIsIt: Data,
      isWhoIsItLoading: false,
      isWhoIsItError: false,
      whoIsItMessage: null
    }
  },

  [combineActions(FETCH_WHO_IS_IT_ERROR, FETCH_WHO_IS_IT_FAILURE)]:
  (state, { payload: { ErrorCode, IsSuccess, MessageText } }) => {
    return {
      ...state,
      whoIsIt: null,
      isWhoIsItLoading: false,
      isWhoIsItError: true,
      whoIsItMessage: MessageText
    }
  }
}, initalState)
