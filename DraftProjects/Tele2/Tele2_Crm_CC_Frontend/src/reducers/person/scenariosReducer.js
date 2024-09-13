import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_SCENARIOS = 'person/GET_SCENARIOS'
export const GET_SCENARIOS_SUCCESS = 'person/GET_SCENARIOS_SUCCESS'
export const GET_SCENARIOS_ERROR = 'person/GET_SCENARIOS_ERROR'
export const GET_SCENARIOS_FAILURE = 'person/GET_SCENARIOS_FAILURE'

export const MODIFY_SCENARIO = 'person/MODIFY_SCENARIO'
export const MODIFY_SCENARIO_SUCCESS = 'person/MODIFY_SCENARIO_SUCCESS'
export const MODIFY_SCENARIO_ERROR = 'person/MODIFY_SCENARIO_ERROR'
export const MODIFY_SCENARIO_FAILURE = 'person/MODIFY_SCENARIO_FAILURE'

export const CREATE_SCENARIO = 'person/CREATE_SCENARIO'
export const CREATE_SCENARIO_SUCCESS = 'person/CREATE_SCENARIO_SUCCESS'
export const CREATE_SCENARIO_ERROR = 'person/CREATE_SCENARIO_ERROR'
export const CREATE_SCENARIO_FAILURE = 'person/CREATE_SCENARIO_FAILURE'

export const getScenarios = createAction(GET_SCENARIOS)
export const modifyScenario = createAction(MODIFY_SCENARIO)
export const createScenario = createAction(CREATE_SCENARIO)

const initialState = {
  scenarios: null,
  isScenariosLoading: false,
  isScenariosError: false,

  isModifyScenarioLoading: false,
  isModifyScenarioError: false,

  createdScenario: null,
  isCreateScenarioLoading: false,
  isCreateScenarioError: false
}

export default handleActions({
  [GET_SCENARIOS]: produce(state => {
    state.scenarios = null
    state.isScenariosLoading = true
    state.isScenariosError = false
  }),
  [GET_SCENARIOS_SUCCESS]: produce((state, { payload }) => {
    state.scenario = payload
    state.isScenariosLoading = false
  }),
  [combineActions(GET_SCENARIOS_ERROR, GET_SCENARIOS_FAILURE)]: produce(state => {
    state.isScenariosLoading = false
    state.isScenariosError = true
  }),

  [MODIFY_SCENARIO]: produce(state => {
    state.isModifyScenarioLoading = true
    state.isModifyScenarioError = false
  }),
  [MODIFY_SCENARIO_SUCCESS]: produce((state) => {
    state.isModifyScenarioLoading = false
  }),
  [combineActions(MODIFY_SCENARIO_ERROR, MODIFY_SCENARIO_FAILURE)]: produce(state => {
    state.isModifyScenarioLoading = false
    state.isModifyScenarioError = true
  }),

  [CREATE_SCENARIO]: produce(state => {
    state.createdScenario = null
    state.isCreateScenarioLoading = true
    state.isCreateScenarioError = false
  }),
  [CREATE_SCENARIO_SUCCESS]: produce((state, { payload }) => {
    state.createdScenario = payload
    state.isCreateScenarioLoading = false
  }),
  [combineActions(CREATE_SCENARIO_ERROR, CREATE_SCENARIO_FAILURE)]: produce(state => {
    state.isCreateScenarioLoading = false
    state.isCreateScenarioError = true
  })
}, initialState)
