import { combineActions, createAction, handleActions } from 'redux-actions'

export const SUZ_TOKEN_FETCH = 'user/SUZ_TOKEN_FETCH'
export const SUZ_TOKEN_FETCH_SUCCESS = 'user/SUZ_TOKEN_FETCH_SUCCESS'
export const SUZ_TOKEN_FETCH_ERROR = 'user/SUZ_TOKEN_FETCH_ERROR'
export const SUZ_TOKEN_FETCH_FAILURE = 'user/SUZ_TOKEN_FETCH_FAILURE'

const initialState = {
  suzToken: null,
  suzTokenSign: null,
  isSuzTokenOk: false,
  suzTokenError: false,
  isSuzTokenLoading: false
}

export const fetchSuzToken = createAction(SUZ_TOKEN_FETCH)

export default handleActions(
  {
    [SUZ_TOKEN_FETCH]: (state) => ({
      ...state,
      isSuzTokenOk: false,
      suzTokenError: false,
      isSuzTokenLoading: true
    }),
    [SUZ_TOKEN_FETCH_SUCCESS]: (state, { payload: { suzToken, suzTokenSign } }) => ({
      ...state,
      suzToken: suzToken,
      suzTokenSign: suzTokenSign,
      isSuzTokenOk: true,
      suzTokenError: false,
      isSuzTokenLoading: false
    }),
    [combineActions(SUZ_TOKEN_FETCH_ERROR, SUZ_TOKEN_FETCH_FAILURE)]: (state) => ({
      ...state,
      isSuzTokenOk: false,
      suzTokenError: true,
      isSuzTokenLoading: false
    })
  },
  initialState
)
