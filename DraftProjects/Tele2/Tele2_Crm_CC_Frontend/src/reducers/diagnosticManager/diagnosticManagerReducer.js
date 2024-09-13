import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const START_DIAGNOSTIC = 'diagnosticManager/START_DIAGNOSTIC'
export const ADD_DIAGNOSTIC_MESSAGE = 'diagnosticManager/ADD_DIAGNOSTIC_MESSAGE'
export const STEP_DIAGNOSTIC = 'diagnosticManager/STEP_DIAGNOSTIC'
export const HIDE_SCENARIO_LIST = 'diagnosticManager/HIDE_SCENARIO_LIST'
export const CHANGE_DIAGNOSTIC_SCENARIO = 'diagnosticManager/CHANGE_DIAGNOSTIC_SCENARIO'
export const CREATE_DIAGNOSTIC_CONTEXT = 'diagnosticManager/CREATE_DIAGNOSTIC_CONTEXT'
export const UPDATE_DIAGNOSTIC_CONTEXT = 'diagnosticManager/UPDATE_DIAGNOSTIC_CONTEXT'

export const DIAGNOSTIC_STEP_FETCH = 'diagnosticManager/DIAGNOSTIC_STEP_FETCH'

const initalState = {
  IsScenariosListVisible: true,
  IsDiagnosticLoading: false,
  Messages: [],
  HandlingData: {
    ClientId: null,
    ClientBranchId: null,
    ClientCategory: null,
    ClientCategoryId: null,
    ClientStatusId: null,
    SubscriberId: null,
    SubscriberBranchId: null,
    SubscriberTypeId: null,
    SubscriberStatusId: null,
    HandlingId: null,
    Msisdn: null,
    Email: null,
    ServiceChannelId: null,
    InteractionDirectionId: null,
    HandlingBranchId: null,
    FunctionalRole: []
  },
  ScenarioData: {
    ScenarioId: null,
    ScenarioName: null,
    StepId: null,
    ScenarioSettings: {
      ProblemMsisdn: null,
      GeoPosition: null,
      IsActiveZero: null,
      StepId: null
    },
    Messages: []
  },
  StepData: {}
}

export const startDiagnostic = createAction(START_DIAGNOSTIC)
export const hideScenarioList = createAction(HIDE_SCENARIO_LIST)
export const stepDiagnostic = createAction(STEP_DIAGNOSTIC)
export const changeDiagnosticScenario = createAction(CHANGE_DIAGNOSTIC_SCENARIO)

export default handleActions({
  [HIDE_SCENARIO_LIST]: produce((state, _action) => {
    state.IsScenariosListVisible = false
  }),
  [CHANGE_DIAGNOSTIC_SCENARIO]: produce((state, _action) => {
    state.IsScenariosListVisible = true
  }),
  [CREATE_DIAGNOSTIC_CONTEXT]: produce((state, { payload: { HandlingData, ScenarioData } }) => {
    state.IsDiagnosticLoading = false
    state.HandlingData = HandlingData
    state.ScenarioData = ScenarioData
    state.Messages = []
  }),
  [UPDATE_DIAGNOSTIC_CONTEXT]: produce((state, { payload: { ScenarioData, StepData } }) => {
    state.IsDiagnosticLoading = false
    state.ScenarioData = ScenarioData
    state.StepData = StepData
  }),
  [ADD_DIAGNOSTIC_MESSAGE]: produce((state, { payload }) => {
    state.Messages = [...[payload], ...state.Messages]
  }),
  [combineActions(STEP_DIAGNOSTIC, START_DIAGNOSTIC)]: produce((state, _action) => {
    state.IsDiagnosticLoading = true
    state.IsScenariosListVisible = false
  })
}, initalState)
