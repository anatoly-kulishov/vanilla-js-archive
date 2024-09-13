import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_CHARGE_COUNTER = 'changeSim/replacementSimCard/GET_CHARGE_COUNTER'
export const GET_CHARGE_COUNTER_SUCCESS = 'changeSim/replacementSimCard/GET_CHARGE_COUNTER_SUCCESS'
export const GET_CHARGE_COUNTER_ERROR = 'changeSim/replacementSimCard/GET_CHARGE_COUNTER_ERROR'
export const GET_CHARGE_COUNTER_FAILURE = 'changeSim/replacementSimCard/GET_CHARGE_COUNTER_FAILURE'

const initialState = {
  chargeCounter: null,
  isLoadingChargeCounter: false,
  isErrorChargeCounter: null
}

export const getChargeCounter = createAction(GET_CHARGE_COUNTER)

export default handleActions({
  [GET_CHARGE_COUNTER]: produce((state) => {
    state.isLoadingChargeCounter = true
  }),
  [GET_CHARGE_COUNTER_SUCCESS]: produce((state, { payload }) => {
    state.chargeCounter = payload
    state.isLoadingChargeCounter = false
  }),
  [combineActions(GET_CHARGE_COUNTER_ERROR, GET_CHARGE_COUNTER_FAILURE)]: produce((state, { payload }) => {
    state.isLoadingChargeCounter = false
    state.isErrorChargeCounter = true
  })
}, initialState)
