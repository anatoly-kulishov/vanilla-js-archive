import produce from 'immer'
import { createAction, handleActions, combineActions } from 'redux-actions'

export const REMAINS_DETAILS_DATA_FETCH = 'remains/REMAINS_DETAILS_DATA_FETCH'
export const REMAINS_DETAILS_DATA_FETCH_SUCCESS = 'remains/REMAINS_DETAILS_DATA_FETCH_SUCCESS'
export const REMAINS_DETAILS_DATA_FETCH_ERROR = 'remains/REMAINS_DETAILS_DATA_FETCH_ERROR'
export const REMAINS_DETAILS_DATA_FETCH_FAILURE = 'remains/REMAINS_DETAILS_DATA_FETCH_FAILURE'

export const REMAINS_SUBSCRIBER_SERVICES_FETCH = 'remains/REMAINS_SUBSCRIBER_SERVICES_FETCH'
export const REMAINS_SUBSCRIBER_SERVICES_FETCH_SUCCESS = 'remains/REMAINS_SUBSCRIBER_SERVICES_FETCH_SUCCESS'
export const REMAINS_SUBSCRIBER_SERVICES_FETCH_ERROR = 'remains/REMAINS_SUBSCRIBER_SERVICES_FETCH_ERROR'
export const REMAINS_SUBSCRIBER_SERVICES_FETCH_FAILURE = 'remains/REMAINS_SUBSCRIBER_SERVICES_FETCH_FAILURE'

export const REMAINS_QUANTUM_DATA_FETCH = 'remains/REMAINS_QUANTUM_DATA_FETCH'
export const REMAINS_QUANTUM_DATA_FETCH_SUCCESS = 'remains/REMAINS_QUANTUM_DATA_FETCH_SUCCESS'
export const REMAINS_QUANTUM_DATA_FETCH_ERROR = 'remains/REMAINS_QUANTUM_DATA_FETCH_ERROR'
export const REMAINS_QUANTUM_DATA_FETCH_FAILURE = 'remains/REMAINS_QUANTUM_DATA_FETCH_FAILURE'

export const UNPAID_CHARGE_DATA_FETCH = 'remains/UNPAID_CHARGE_DATA_FETCH'
export const UNPAID_CHARGE_DATA_FETCH_SUCCESS = 'remains/UNPAID_CHARGE_DATA_FETCH_SUCCESS'
export const UNPAID_CHARGE_DATA_FETCH_ERROR = 'remains/UNPAID_CHARGE_DATA_FETCH_ERROR'
export const UNPAID_CHARGE_DATA_FETCH_FAILURE = 'remains/UNPAID_CHARGE_DATA_FETCH_FAILURE'

export const UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT = 'remains/UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT'
export const UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_SUCCESS = 'remains/UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_SUCCESS'
export const UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_ERROR = 'remains/UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_ERROR'
export const UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_FAILURE = 'remains/UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_FAILURE'

export const REMAINS_MIXX_BALANCE_FETCH = 'remains/REMAINS_MIXX_BALANCE_FETCH'
export const REMAINS_MIXX_BALANCE_FETCH_SUCCESS = 'remains/REMAINS_MIXX_BALANCE_FETCH_SUCCESS'
export const REMAINS_MIXX_BALANCE_FETCH_ERROR = 'remains/REMAINS_MIXX_BALANCE_FETCH_ERROR'
export const REMAINS_MIXX_BALANCE_FETCH_FAILURE = 'remains/REMAINS_MIXX_BALANCE_FETCH_FAILURE'

const initialState = {
  detailsData: null,
  isDetailsDataLoading: false,
  isDetailsDataSuccess: false,
  detailsDataMessage: '',

  subscriberServices: null,
  isSubscriberServicesLoading: false,
  isSubscriberServicesSuccess: false,
  subscriberServicesMessage: '',

  quantumData: null,
  isQuantumDataLoading: false,
  isQuantumDataSuccess: false,
  quantumDataMessage: '',

  unpaidChargeData: {},
  isUnpaidChargeDataLoading: false,
  isUnpaidChargeDataSuccess: false,
  unpaidChargeDataMessage: '',

  mixxBalance: null,
  isMixxBalanceLoading: false,
  isMixxBalanceSuccess: false,
  mixxBalanceMessage: '',

  isUnpaidChargeDataAndShowAlertLoading: false,
  isUnpaidChargeDataAndShowAlertSuccess: false,
  unpaidChargeDataAndShowAlertMessage: ''
}

export const getRemainsDetailsData = createAction(REMAINS_DETAILS_DATA_FETCH)
export const getQuantumData = createAction(REMAINS_QUANTUM_DATA_FETCH)
export const getUnpaidChargeData = createAction(UNPAID_CHARGE_DATA_FETCH)
export const getUnpaidChargeDataAndShowAlert = createAction(UNPAID_CHARGE_DATA_FETCH)
export const getMixxBalance = createAction(REMAINS_MIXX_BALANCE_FETCH)

export default handleActions({
  // Details
  [REMAINS_DETAILS_DATA_FETCH]: (state) => ({
    ...state,
    detailsData: null,
    isDetailsDataLoading: true,
    isDetailsDataSuccess: false,
    detailsDataMessage: ''
  }),
  [combineActions(REMAINS_DETAILS_DATA_FETCH_SUCCESS, REMAINS_DETAILS_DATA_FETCH_ERROR)]:
  (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    detailsData: Data,
    isDetailsDataLoading: false,
    isDetailsDataSuccess: IsSuccess,
    detailsDataMessage: MessageText

  }),
  [REMAINS_DETAILS_DATA_FETCH_FAILURE]: state => ({
    ...state,
    detailsData: null,
    isDetailsDataLoading: false,
    isDetailsDataSuccess: true,
    detailsDataMessage: 'При получении основных данных по остаткам произошла ошибка'
  }),
  // Subscriber services
  [REMAINS_SUBSCRIBER_SERVICES_FETCH]: (state) => ({
    ...state,
    subscriberServices: null,
    isSubscriberServicesLoading: true,
    isSubscriberServicesSuccess: false,
    subscriberServicesMessage: ''
  }),
  [combineActions(REMAINS_SUBSCRIBER_SERVICES_FETCH_SUCCESS, REMAINS_SUBSCRIBER_SERVICES_FETCH_ERROR)]:
  (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    subscriberServices: Data,
    isSubscriberServicesLoading: false,
    isSubscriberServicesSuccess: IsSuccess,
    subscriberServicesMessage: MessageText
  }),
  [REMAINS_SUBSCRIBER_SERVICES_FETCH_FAILURE]: state => ({
    ...state,
    subscriberServices: null,
    isSubscriberServicesLoading: false,
    isSubscriberServicesSuccess: true,
    subscriberServicesMessage: 'При получении данных по услугам произошла ошибка'
  }),
  // Quantum
  [REMAINS_QUANTUM_DATA_FETCH]: (state) => ({
    ...state,
    quantumData: null,
    isQuantumDataLoading: true,
    isQuantumDataSuccess: false,
    quantumDataMessage: ''
  }),
  [combineActions(REMAINS_QUANTUM_DATA_FETCH_SUCCESS, REMAINS_QUANTUM_DATA_FETCH_ERROR)]:
  (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    quantumData: Data,
    isQuantumDataLoading: false,
    isQuantumDataSuccess: IsSuccess,
    quantumDataMessage: MessageText
  }),
  [REMAINS_QUANTUM_DATA_FETCH_FAILURE]: state => ({
    ...state,
    quantumData: null,
    isQuantumDataLoading: false,
    isQuantumDataSuccess: false,
    quantumDataMessage: 'При квантов произошла ошибка'
  }),
  // UnpaidChargeData
  [UNPAID_CHARGE_DATA_FETCH]: (state) => ({
    ...state,
    unpaidChargeData: {},
    isUnpaidChargeDataLoading: true,
    isUnpaidChargeDataSuccess: false,
    unpaidChargeDataMessage: ''
  }),
  [combineActions(UNPAID_CHARGE_DATA_FETCH_SUCCESS, UNPAID_CHARGE_DATA_FETCH_ERROR)]:
  (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    unpaidChargeData: Data,
    isUnpaidChargeDataLoading: false,
    isUnpaidChargeDataSuccess: IsSuccess,
    unpaidChargeDataMessage: MessageText
  }),
  [UNPAID_CHARGE_DATA_FETCH_FAILURE]: (state, { payload }) => ({
    ...state,
    unpaidChargeData: {},
    isUnpaidChargeDataLoading: false,
    isUnpaidChargeDataSuccess: false,
    unpaidChargeDataMessage: payload?.MessageText
  }),

  // UnpaidChargeDataAndShowAlert
  [UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT]: (state) => ({
    ...state,
    isUnpaidChargeDataAndShowAlertLoading: true,
    isUnpaidChargeDataAndShowAlertSuccess: false,
    unpaidChargeDataAndShowAlertMessage: ''
  }),
  [combineActions(UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_SUCCESS, UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_ERROR)]:
  (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    isUnpaidChargeDataAndShowAlertLoading: false,
    isUnpaidChargeDataAndShowAlertSuccess: IsSuccess,
    unpaidChargeDataAndShowAlertMessage: MessageText
  }),
  [UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_FAILURE]: (state, { payload: { MessageText } }) => ({
    ...state,
    isUnpaidChargeDataAndShowAlertLoading: false,
    isUnpaidChargeDataAndShowAlertSuccess: false,
    unpaidChargeDataAndShowAlertMessage: MessageText
  }),
  // Mixx balance
  [REMAINS_MIXX_BALANCE_FETCH]: produce((state) => {
    state.mixxBalance = null
    state.isMixxBalanceLoading = true
    state.isMixxBalanceSuccess = false
    state.mixxBalanceMessage = ''
  }),
  [REMAINS_MIXX_BALANCE_FETCH_SUCCESS]: produce((state, { payload }) => {
    state.mixxBalance = payload
    state.isMixxBalanceLoading = false
    state.isMixxBalanceSuccess = true
    state.mixxBalanceMessage = ''
  }),
  [REMAINS_MIXX_BALANCE_FETCH_ERROR]:
  produce((state, { message }) => {
    state.isMixxBalanceLoading = false
    state.isMixxBalanceSuccess = false
    state.mixxBalanceMessage = message
  }),
  [REMAINS_MIXX_BALANCE_FETCH_FAILURE]: produce((state, { message }) => {
    state.mixxBalance = null
    state.isMixxBalanceLoading = false
    state.isMixxBalanceSuccess = false
    state.mixxBalanceMessage = message
  })
}, initialState)
