import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

export const INIT_GIVE_ORDER = 'giveOrder/INIT_GIVE_ORDER'
export const RESET_GIVE_ORDER_PROCESS = 'giveOrder/RESET_GIVE_ORDER_PROCESS'
export const SELECT_ORDER_NUMBER = 'giveOrder/SELECT_ORDER_NUMBER'
export const SET_GIVE_ORDER_STEP = 'giveOrder/SET_GIVE_ORDER_STEP'

export const GIVING_ORDER_PROCESS_STEPS = {
  NONE: 'NONE',
  SELECT_ORDER: 'SELECT_ORDER',
  GIVE_ORDER: 'GIVE_ORDER'
}

const initialState = {
  isGivingOrder: false,
  giveOrderProcessStep: GIVING_ORDER_PROCESS_STEPS.NONE,
  selectedOrder: null
}

export const initGiveOrder = createAction(INIT_GIVE_ORDER)
export const resetGiveOrderProcess = createAction(RESET_GIVE_ORDER_PROCESS)
export const selectOrderNumber = createAction(SELECT_ORDER_NUMBER)
export const setGiveOrderStep = createAction(SET_GIVE_ORDER_STEP)

export default handleActions({
  [INIT_GIVE_ORDER]: produce((state) => {
    state.isGivingOrder = true
    state.giveOrderProcessStep = GIVING_ORDER_PROCESS_STEPS.SELECT_ORDER
  }),
  [RESET_GIVE_ORDER_PROCESS]: produce((state) => {
    state.isGivingOrder = false
    state.giveOrderProcessStep = GIVING_ORDER_PROCESS_STEPS.NONE
  }),
  [SELECT_ORDER_NUMBER]: produce((state, { payload }) => {
    state.selectedOrder = payload
    state.giveOrderProcessStep = GIVING_ORDER_PROCESS_STEPS.GIVE_ORDER
  }),
  [SET_GIVE_ORDER_STEP]: produce((state, { payload }) => {
    state.giveOrderProcessStep = payload
  })
}, initialState)
