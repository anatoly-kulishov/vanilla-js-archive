import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_PSYCHOTYPE = 'personalAccount/FETCH_PSYCHOTYPE'
export const FETCH_PSYCHOTYPE_SUCCESS = 'personalAccount/FETCH_PSYCHOTYPE_SUCCESS'
export const FETCH_PSYCHOTYPE_ERROR = 'personalAccount/FETCH_PSYCHOTYPE_ERROR'
export const FETCH_PSYCHOTYPE_FAILURE = 'personalAccount/FETCH_PSYCHOTYPE_FAILURE'

const initalState = {
  isPsychotypeLoading: false,
  isisPsychotypeError: false
}

export const fetchPsychotype = createAction(FETCH_PSYCHOTYPE)

export default handleActions({
  [FETCH_PSYCHOTYPE]: produce((state) => {
    state.isPsychotypeLoading = true
  }),
  [FETCH_PSYCHOTYPE_SUCCESS]: produce((state, { payload }) => {
    state.isPsychotypeLoading = false
  }),
  [combineActions(FETCH_PSYCHOTYPE_ERROR, FETCH_PSYCHOTYPE_FAILURE)]: produce((state) => {
    state.isPsychotypeLoading = false
    state.isisPsychotypeError = true
  })
}, initalState)
