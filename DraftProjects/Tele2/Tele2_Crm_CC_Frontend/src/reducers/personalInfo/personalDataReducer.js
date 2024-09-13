import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const PERSONAL_DATA_FETCH = 'personalAccount/PERSONAL_DATA_FETCH'
export const PERSONAL_DATA_FETCH_SUCCESS = 'personalAccount/PERSONAL_DATA_FETCH_SUCCESS'
export const PERSONAL_DATA_FETCH_ERROR = 'personalAccount/PERSONAL_DATA_FETCH_ERROR'
export const PERSONAL_DATA_FETCH_FAILURE = 'personalAccount/PERSONAL_DATA_FETCH_FAILURE'

export const SET_PERSONAL_DATA = 'personalAccount/SET_PERSONAL_DATA'
export const SET_PERSONAL_DATA_SUCCESS = 'personalAccount/SET_PERSONAL_DATA_SUCCESS'
export const SET_PERSONAL_DATA_ERROR = 'personalAccount/SET_PERSONAL_DATA_ERROR'
export const SET_PERSONAL_DATA_FAILURE = 'personalAccount/SET_PERSONAL_DATA_FAILURE'

const initialState = {
  passport: null,
  isPassportLoading: false,
  isPassportError: false,

  isSetPersonalDataLoading: false,
  isSetPersonalDataError: false
}
export const fetchPersonalData = createAction(PERSONAL_DATA_FETCH)

export default handleActions(
  {
    [PERSONAL_DATA_FETCH]: produce((state) => {
      state.isPassportLoading = true
    }),
    [PERSONAL_DATA_FETCH_SUCCESS]: produce((state, { payload }) => {
      state.passport = payload
      state.isPassportLoading = false
    }),
    [combineActions(PERSONAL_DATA_FETCH_ERROR, PERSONAL_DATA_FETCH_FAILURE)]: produce((state) => {
      state.isPassportError = true
      state.isPassportLoading = false
    }),
    [SET_PERSONAL_DATA]: produce((state) => {
      state.isSetPersonalDataLoading = true
    }),
    [SET_PERSONAL_DATA_SUCCESS]: produce((state) => {
      state.isSetPersonalDataLoading = false
    }),
    [combineActions(SET_PERSONAL_DATA_ERROR, SET_PERSONAL_DATA_FAILURE)]: produce((state) => {
      state.isSetPersonalDataError = true
      state.isSetPersonalDataLoading = false
    })
  },
  initialState
)
