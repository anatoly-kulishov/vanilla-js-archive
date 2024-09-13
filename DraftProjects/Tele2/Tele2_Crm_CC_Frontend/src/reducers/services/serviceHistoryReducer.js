import { createAction, handleActions } from 'redux-actions'

export const GET_SERVICE_HISTORY_FETCH = 'services/GET_SERVICE_HISTORY_FETCH'
export const GET_SERVICE_HISTORY_FETCH_SUCCESS = 'services/GET_SERVICE_HISTORY_FETCH_SUCCESS'
export const GET_SERVICE_HISTORY_FETCH_ERROR = 'services/GET_SERVICE_HISTORY_FETCH_ERROR'
export const GET_SERVICE_HISTORY_FETCH_FAILURE = 'services/GET_SERVICE_HISTORY_FETCH_FAILURE'

const MODAL_VISIBLE = 'serviceHistory/MODAL_VISIBLE'
const MODAL_SERVICE_HISTORY = 'serviceHistory/MODAL_SERVICE_HISTORY'
const MODAL_ALL_SERVICES_HISTORY = 'serviceHistory/MODAL_ALL_SERVICE_HISTORY'

export const getServiceHistory = createAction(GET_SERVICE_HISTORY_FETCH)
export const changeVisibility = createAction(MODAL_VISIBLE)
export const showServiceHistory = createAction(MODAL_SERVICE_HISTORY)
export const showAllServicesHistory = createAction(MODAL_ALL_SERVICES_HISTORY)

export const SERVICE_HISTORY_LIMIT_STATUSES = {
  NONE: 'NONE',
  HAS_LIMIT: 'HAS_LIMIT',
  NO_LIMIT: 'NO_LIMIT'
}

const initialState = {
  serviceHistory: null,
  isServiceHistoryLoading: false,
  serviceHistoryError: null,
  hasServiceHistoryLimit: SERVICE_HISTORY_LIMIT_STATUSES.NONE,
  // history modal
  isVisible: false,
  title: null,
  serviceId: null
}

export default handleActions({
  [GET_SERVICE_HISTORY_FETCH]: (state) => ({
    ...state,
    serviceHistory: null,
    isServiceHistoryLoading: true,
    serviceHistoryError: null,
    hasServiceHistoryLimit: SERVICE_HISTORY_LIMIT_STATUSES.NONE
  }),
  [GET_SERVICE_HISTORY_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    serviceHistory: Data,
    serviceHistoryError: null,
    isServiceHistoryLoading: false,
    hasServiceHistoryLimit: Data?.filter(service => service.ServiceStatus === 'активна').length >= 2
      ? SERVICE_HISTORY_LIMIT_STATUSES.HAS_LIMIT
      : SERVICE_HISTORY_LIMIT_STATUSES.NO_LIMIT
  }),
  [GET_SERVICE_HISTORY_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    serviceHistory: null,
    isServiceHistoryLoading: false,
    serviceHistoryError: MessageText,
    hasServiceHistoryLimit: SERVICE_HISTORY_LIMIT_STATUSES.NO_LIMIT
  }),
  [GET_SERVICE_HISTORY_FETCH_FAILURE]: (state) => ({
    ...state,
    serviceHistory: null,
    isServiceHistoryLoading: false,
    serviceHistoryError: 'При получении истории услуг произошла ошибка',
    hasServiceHistoryLimit: SERVICE_HISTORY_LIMIT_STATUSES.NONE
  }),

  // history modal
  [MODAL_VISIBLE]: (state) => ({
    ...state,
    isVisible: !state.isVisible
  }),
  [MODAL_SERVICE_HISTORY]: (state, { payload: { title, service } }) => ({
    ...state,
    title: title
  }),
  [MODAL_ALL_SERVICES_HISTORY]: (state, { payload: { title } }) => ({
    ...state,
    title: title
  })
}, initialState)
