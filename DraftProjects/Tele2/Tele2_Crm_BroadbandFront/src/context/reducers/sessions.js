import {
  CLOSE_SESSION,
  CLOSE_SESSION_ERROR,
  CLOSE_SESSION_FAILURE,
  CLOSE_SESSION_SUCCESS,
  CREATE_AUTO_ORDER_SESSION,
  CREATE_AUTO_ORDER_SESSION_ERROR,
  CREATE_AUTO_ORDER_SESSION_FAILURE,
  CREATE_AUTO_ORDER_SESSION_SUCCESS,
  CREATE_OPERATOR_SHIFTS,
  CREATE_OPERATOR_SHIFTS_ERROR,
  CREATE_OPERATOR_SHIFTS_FAILURE,
  CREATE_OPERATOR_SHIFTS_SUCCESS,
  CREATE_SESSION,
  CREATE_SESSION_ERROR,
  CREATE_SESSION_FAILURE,
  CREATE_SESSION_SUCCESS,
  DELETE_OPERATOR_SHIFTS,
  DELETE_OPERATOR_SHIFTS_ERROR,
  DELETE_OPERATOR_SHIFTS_FAILURE,
  DELETE_OPERATOR_SHIFTS_SUCCESS,
  GET_OPERATOR_SHIFTS,
  GET_OPERATOR_SHIFTS_ERROR,
  GET_OPERATOR_SHIFTS_FAILURE,
  GET_OPERATOR_SHIFTS_SUCCESS,
  GET_SESSIONS_INFO,
  GET_SESSIONS_INFO_ERROR,
  GET_SESSIONS_INFO_FAILURE,
  GET_SESSIONS_INFO_SUCCESS,
  GET_SESSION_CLOSE_REASONS,
  GET_SESSION_CLOSE_REASONS_ERROR,
  GET_SESSION_CLOSE_REASONS_FAILURE,
  GET_SESSION_CLOSE_REASONS_SUCCESS,
  GET_SESSION_TASK_TYPES,
  GET_SESSION_TASK_TYPES_ERROR,
  GET_SESSION_TASK_TYPES_FAILURE,
  GET_SESSION_TASK_TYPES_SUCCESS
} from '../constants/actionTypes'
import { StateStatus } from '../constants/initialState'

export function getSessionsInfoReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_SESSIONS_INFO:
      state.sessionsInfoState.isLoading = true
      break
    case GET_SESSIONS_INFO_SUCCESS:
      state.sessionsInfoState.isLoading = false
      state.sessionsInfoState.data = payload
      state.autoActions.sessionInfo = StateStatus.Done
      break
    case GET_SESSIONS_INFO_ERROR:
    case GET_SESSIONS_INFO_FAILURE:
      state.sessionsInfoState.isLoading = false
      state.autoActions.sessionInfo = StateStatus.Done
      break
    default:
      break
  }
}

export function createSessionReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_SESSION:
      state.createSessionState.isLoading = true
      break
    case CREATE_SESSION_SUCCESS:
      state.createSessionState.isLoading = false
      state.createSessionState.data = payload
      state.autoActions.sessionInfo = StateStatus.NeedAction
      break
    case CREATE_SESSION_ERROR:
    case CREATE_SESSION_FAILURE:
      state.createSessionState.isLoading = false
      state.autoActions.sessionInfo = StateStatus.NeedAction
      break
    default:
      break
  }
}

export function closeSessionReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CLOSE_SESSION:
      state.closeSessionState.isLoading = true
      state.closeSessionState.isSuccess = null
      break
    case CLOSE_SESSION_SUCCESS:
      state.closeSessionState.isLoading = false
      state.closeSessionState.isSuccess = true
      state.closeSessionState.data = payload
      state.autoActions.sessionInfo = StateStatus.NeedAction
      break
    case CLOSE_SESSION_ERROR:
    case CLOSE_SESSION_FAILURE:
      state.closeSessionState.isLoading = false
      state.closeSessionState.isSuccess = false
      state.autoActions.sessionInfo = StateStatus.NeedAction
      break
    default:
      break
  }
}

export function getSessionTypeTasksReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_SESSION_TASK_TYPES:
      state.sessionTypeTasks = null
      break
    case GET_SESSION_TASK_TYPES_SUCCESS:
      state.sessionTypeTasks = payload
      break
    case GET_SESSION_TASK_TYPES_ERROR:
    case GET_SESSION_TASK_TYPES_FAILURE:
      break
    default:
      break
  }
}

export function getSessionCloseReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_SESSION_CLOSE_REASONS:
      state.sessionCloseReasons = null
      break
    case GET_SESSION_CLOSE_REASONS_SUCCESS:
      state.sessionCloseReasons = payload
      break
    case GET_SESSION_CLOSE_REASONS_ERROR:
    case GET_SESSION_CLOSE_REASONS_FAILURE:
      break
    default:
      break
  }
}

export function getOperatorShiftsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_OPERATOR_SHIFTS:
      state.operatorShifts.get.data = null
      state.operatorShifts.get.isLoading = true
      state.operatorShifts.get.isSuccess = null
      break
    case GET_OPERATOR_SHIFTS_SUCCESS:
      state.operatorShifts.get.data = payload
      state.operatorShifts.get.isLoading = false
      state.operatorShifts.get.isSuccess = true
      break
    case GET_OPERATOR_SHIFTS_ERROR:
    case GET_OPERATOR_SHIFTS_FAILURE:
      state.operatorShifts.get.isSuccess = false
      state.operatorShifts.get.isLoading = false
      break
    default:
      break
  }
}

export function createOperatorShiftsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_OPERATOR_SHIFTS:
      state.operatorShifts.create.isLoading = true
      state.operatorShifts.create.isSuccess = null
      state.operatorShifts.create.data = null
      break
    case CREATE_OPERATOR_SHIFTS_SUCCESS:
      state.operatorShifts.create.isLoading = false
      state.operatorShifts.create.data = payload
      state.operatorShifts.create.isSuccess = true
      break
    case CREATE_OPERATOR_SHIFTS_ERROR:
    case CREATE_OPERATOR_SHIFTS_FAILURE:
      state.operatorShifts.create.isSuccess = false
      state.operatorShifts.create.isLoading = false
      break
    default:
      break
  }
}

export function deleteOperatorShiftsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case DELETE_OPERATOR_SHIFTS:
      state.operatorShifts.delete.isLoading = true
      state.operatorShifts.delete.isSuccess = null
      state.operatorShifts.delete.data = null
      break
    case DELETE_OPERATOR_SHIFTS_SUCCESS:
      state.operatorShifts.delete.isLoading = false
      state.operatorShifts.delete.isSuccess = true
      state.operatorShifts.delete.data = payload
      state.autoActions.refetchOperatorShifts = StateStatus.NeedAction
      break
    case DELETE_OPERATOR_SHIFTS_ERROR:
    case DELETE_OPERATOR_SHIFTS_FAILURE:
      state.operatorShifts.delete.isSuccess = false
      state.operatorShifts.delete.isLoading = false
      state.autoActions.refetchOperatorShifts = StateStatus.NeedAction
      break
    default:
      break
  }
}

export function createAutoOrderSessionReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_AUTO_ORDER_SESSION:
      state.autoOrderSession.isLoading = true
      state.autoOrderSession.isSuccess = null
      state.autoOrderSession.data = null
      state.autoOrderSession.message = ''
      break
    case CREATE_AUTO_ORDER_SESSION_SUCCESS:
      state.autoOrderSession.isLoading = false
      state.autoOrderSession.isSuccess = true
      state.autoOrderSession.data = payload
      break
    case CREATE_AUTO_ORDER_SESSION_ERROR:
    case CREATE_AUTO_ORDER_SESSION_FAILURE:
      state.autoOrderSession.isLoading = false
      state.autoOrderSession.isSuccess = false
      state.autoOrderSession.message = payload.message
      break
    default:
      break
  }
}
