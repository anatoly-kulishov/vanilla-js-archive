import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_CUSTOMER_SCENARIO_HISTORY = 'person/GET_CUSTOMER_SCENARIO_HISTORY'
export const GET_CUSTOMER_SCENARIO_HISTORY_SUCCESS = 'person/GET_CUSTOMER_SCENARIO_HISTORY_SUCCESS'
export const GET_CUSTOMER_SCENARIO_HISTORY_ERROR = 'person/GET_CUSTOMER_SCENARIO_HISTORY_ERROR'
export const GET_CUSTOMER_SCENARIO_HISTORY_FAILURE = 'person/GET_CUSTOMER_SCENARIO_HISTORY_FAILURE'

export const getCustomerScenarioHistory = createAction(GET_CUSTOMER_SCENARIO_HISTORY)

const initialState = {
  customerScenarioHistory: null,
  isCustomerScenarioHistoryLoading: false,
  isCustomerScenarioHistoryError: false
}

export default handleActions({
  [GET_CUSTOMER_SCENARIO_HISTORY]: produce((state) => {
    state.customerScenarioHistory = null
    state.isCustomerScenarioHistoryLoading = true
    state.isCustomerScenarioHistoryError = false
  }),
  [GET_CUSTOMER_SCENARIO_HISTORY_SUCCESS]: produce((state, { payload: { data } }) => {
    state.customerScenarioHistory = data
    state.isCustomerScenarioHistoryLoading = false
  }),
  [combineActions(GET_CUSTOMER_SCENARIO_HISTORY_ERROR, GET_CUSTOMER_SCENARIO_HISTORY_FAILURE)]: produce((state) => {
    state.isCustomerScenarioHistoryLoading = false
    state.isCustomerScenarioHistoryError = true
  })
}, initialState)
