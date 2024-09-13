import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const DIAGNOSTIC_SCENARIOS_FETCH = 'diagnosticManager/DIAGNOSTIC_SCENARIOS_FETCH'
export const DIAGNOSTIC_SCENARIOS_FETCH_SUCCESS = 'diagnosticManager/DIAGNOSTIC_SCENARIOS_FETCH_SUCCESS'
export const DIAGNOSTIC_SCENARIOS_FETCH_ERROR = 'diagnosticManager/DIAGNOSTIC_SCENARIOS_FETCH_ERROR'
export const DIAGNOSTIC_SCENARIOS_FETCH_FAILURE = 'diagnosticManager/DIAGNOSTIC_SCENARIOS_FETCH_FAILURE'

const initalState = {
  diagnosticScenarios: [],
  isDiagnosticScenariosError: false,
  isDiagnosticScenariosLoading: false,
  diagnosticScenariosMessage: null
}

export const fetchDiagnosticScenarios = createAction(DIAGNOSTIC_SCENARIOS_FETCH)

export default handleActions({
  [DIAGNOSTIC_SCENARIOS_FETCH]: produce((state, _action) => {
    state.isDiagnosticScenariosLoading = true
  }),

  [DIAGNOSTIC_SCENARIOS_FETCH_SUCCESS]: produce((state, { payload }) => {
    state.diagnosticScenarios = payload
    state.isDiagnosticScenariosLoading = false
  }),

  [combineActions(DIAGNOSTIC_SCENARIOS_FETCH_ERROR, DIAGNOSTIC_SCENARIOS_FETCH_FAILURE)]: produce((state, { payload: { errorMessage } }) => {
    state.diagnosticScenarios = []
    state.isDiagnosticScenariosLoading = false
    state.diagnosticScenariosMessage = errorMessage
    state.isDiagnosticScenariosError = true
  })
}, initalState)
