import { produce } from 'immer'
import { createAction, handleActions, combineActions } from 'redux-actions'

export const BALANCE_FETCH = 'balance/BALANCE_FETCH'
export const BALANCE_FETCH_SUCCESS = 'balance/BALANCE_FETCH_SUCCESS'
export const BALANCE_FETCH_ERROR = 'balance/BALANCE_FETCH_ERROR'
export const BALANCE_FETCH_FAILURE = 'balance/BALANCE_FETCH_FAILURE'

export const CLIENT_BALANCE_FETCH = 'balance/CLIENT_BALANCE_FETCH'

export const TRUST_CREDIT_HISTORY_FETCH = 'balance/TRUST_CREDIT_HISTORY_FETCH'
export const TRUST_CREDIT_HISTORY_FETCH_SUCCESS = 'balance/TRUST_CREDIT_HISTORY_FETCH_SUCCESS'
export const TRUST_CREDIT_HISTORY_FETCH_ERROR = 'balance/TRUST_CREDIT_HISTORY_FETCH_ERROR'
export const TRUST_CREDIT_HISTORY_FETCH_FAILURE = 'balance/TRUST_CREDIT_HISTORY_FETCH_FAILURE'

export const TRUST_CREDIT_REASONS_HISTORY_FETCH = 'balance/TRUST_CREDIT_REASONS_HISTORY_FETCH'
export const TRUST_CREDIT_REASONS_HISTORY_FETCH_SUCCESS = 'balance/TRUST_CREDIT_REASONS_HISTORY_FETCH_SUCCESS'
export const TRUST_CREDIT_REASONS_HISTORY_FETCH_ERROR = 'balance/TRUST_CREDIT_REASONS_HISTORY_FETCH_ERROR'
export const TRUST_CREDIT_REASONS_HISTORY_FETCH_FAILURE = 'balance/TRUST_CREDIT_REASONS_HISTORY_FETCH_FAILURE'

export const TRUST_CREDIT_INFO_FETCH = 'balance/TRUST_CREDIT_INFO_FETCH'
export const TRUST_CREDIT_INFO_FETCH_SUCCESS = 'balance/TRUST_CREDIT_INFO_FETCH_SUCCESS'
export const TRUST_CREDIT_INFO_FETCH_ERROR = 'balance/TRUST_CREDIT_INFO_FETCH_ERROR'
export const TRUST_CREDIT_INFO_FETCH_FAILURE = 'balance/TRUST_CREDIT_INFO_FETCH_FAILURE'

export const DEACIVATE_TRUST_CREDIT_FETCH = 'balance/DEACIVATE_TRUST_CREDIT_FETCH'
export const DEACIVATE_TRUST_CREDIT_FETCH_SUCCESS = 'balance/DEACIVATE_TRUST_CREDIT_FETCH_SUCCESS'
export const DEACIVATE_TRUST_CREDIT_FETCH_ERROR = 'balance/DEACIVATE_TRUST_CREDIT_FETCH_ERROR'
export const DEACIVATE_TRUST_CREDIT_FETCH_FAILURE = 'balance/DEACIVATE_TRUST_CREDIT_FETCH_FAILURE'

export const ACIVATE_TRUST_CREDIT_FETCH = 'balance/ACIVATE_TRUST_CREDIT_FETCH'
export const ACIVATE_TRUST_CREDIT_FETCH_SUCCESS = 'balance/ACIVATE_TRUST_CREDIT_FETCH_SUCCESS'
export const ACIVATE_TRUST_CREDIT_FETCH_ERROR = 'balance/ACIVATE_TRUST_CREDIT_FETCH_ERROR'
export const ACIVATE_TRUST_CREDIT_FETCH_FAILURE = 'balance/ACIVATE_TRUST_CREDIT_FETCH_FAILURE'

export const ADD_CONTENT_BALANCE_FETCH = 'balance/ADD_CONTENT_BALANCE_FETCH'
export const ADD_CONTENT_BALANCE_FETCH_SUCCESS = 'balance/ADD_CONTENT_BALANCE_FETCH_SUCCESS'
export const ADD_CONTENT_BALANCE_FETCH_ERROR = 'balance/ADD_CONTENT_BALANCE_FETCH_ERROR'
export const ADD_CONTENT_BALANCE_FETCH_FAILURE = 'balance/ADD_CONTENT_BALANCE_FETCH_FAILURE'

export const CLOSE_CONTENT_BALANCE_FETCH = 'balance/CLOSE_CONTENT_BALANCE_FETCH'
export const CLOSE_CONTENT_BALANCE_FETCH_SUCCESS = 'balance/CLOSE_CONTENT_BALANCE_FETCH_SUCCESS'
export const CLOSE_CONTENT_BALANCE_FETCH_ERROR = 'balance/CLOSE_CONTENT_BALANCE_FETCH_ERROR'
export const CLOSE_CONTENT_BALANCE_FETCH_FAILURE = 'balance/CLOSE_CONTENT_BALANCE_FETCH_FAILURE'

export const CONTENT_BALANCE_HISTORY_FETCH = 'balance/CONTENT_BALANCE_HISTORY_FETCH'
export const CONTENT_BALANCE_HISTORY_FETCH_SUCCESS = 'balance/CONTENT_BALANCE_HISTORY_FETCH_SUCCESS'
export const CONTENT_BALANCE_HISTORY_FETCH_ERROR = 'balance/CONTENT_BALANCE_HISTORY_FETCH_ERROR'
export const CONTENT_BALANCE_HISTORY_FETCH_FAILURE = 'balance/CONTENT_BALANCE_HISTORY_FETCH_FAILURE'

const initalState = {
  balance: null,
  balanceError: null,
  isBalanceLoading: false,

  trustCreditHistory: null,
  isTrustCreditHistoryError: false,
  isTrustCreditHistoryLoading: false,

  trustCreditReasonsHistory: null,
  isTrustCreditReasonsHistoryError: false,
  isTrustCreditReasonsHistoryLoading: false,

  trustCreditInfo: null,
  trustCreditInfoMessage: null,
  isTrustCreditInfoError: false,
  isTrustCreditInfoLoading: false,

  deactivateTrustCredit: null,
  deactivateTrustCreditMessage: null,
  isTrustCreditDeactivateError: false,
  isTrustCreditDeactivateLoading: false,

  activateTrustCredit: null,
  activateTrustCreditMessage: null,
  isTrustCreditActivateError: false,
  isTrustCreditActivateLoading: false,

  addContentBalance: null,
  addContentBalanceMessage: null,
  isAddingContentBalanceError: false,
  isAddingContentBalanceLoading: false,

  closeContentBalance: null,
  closeContentBalanceMessage: null,
  isClosingContentBalanceError: false,
  isClosingContentBalanceLoading: false,

  contentBalanceHistory: [],
  contentBalanceHistoryMessage: null,
  isContentBalanceHistoryError: false,
  isContentBalanceHistoryLoading: false
}

export const getBalance = createAction(BALANCE_FETCH)
export const getClientBalance = createAction(CLIENT_BALANCE_FETCH)
export const getTrustCreditHistory = createAction(TRUST_CREDIT_HISTORY_FETCH)
export const getTrustCreditReasonsHistory = createAction(TRUST_CREDIT_REASONS_HISTORY_FETCH)
export const getTrustCreditInfo = createAction(TRUST_CREDIT_INFO_FETCH)
export const deactivateCreditInfo = createAction(DEACIVATE_TRUST_CREDIT_FETCH)
export const activateCreditInfo = createAction(ACIVATE_TRUST_CREDIT_FETCH)
export const addContentBalance = createAction(ADD_CONTENT_BALANCE_FETCH)
export const closeContentBalance = createAction(CLOSE_CONTENT_BALANCE_FETCH)
export const getContentBalanceHistory = createAction(CONTENT_BALANCE_HISTORY_FETCH)

export default handleActions({
  // Balance
  [combineActions(BALANCE_FETCH, CLIENT_BALANCE_FETCH)]: (state) => ({
    ...state,
    balance: null,
    balanceError: false,
    isBalanceLoading: true
  }),
  [BALANCE_FETCH_SUCCESS]: (
    state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    balance: data,
    isBalanceLoading: false,
    balanceError: false
  }),
  [BALANCE_FETCH_ERROR]: (state, { payload: { isSuccess, errorStackTrace, messageText } }) => ({
    ...state,
    balance: null,
    isBalanceLoading: false,
    balanceError: messageText + errorStackTrace,
    isBalanceError: true
  }),
  [BALANCE_FETCH_FAILURE]: (state, { payload: { message } }) => ({
    ...state,
    balance: {},
    isBalanceLoading: false,
    balanceError: message,
    isBalanceError: true
  }),
  // Trust credit
  [TRUST_CREDIT_HISTORY_FETCH]: (state) => ({
    ...state,
    trustCreditHistory: null,
    isTrustCreditHistoryError: false,
    isTrustCreditHistoryLoading: true
  }),
  [TRUST_CREDIT_HISTORY_FETCH_SUCCESS]: (
    state, { payload: { isSuccess, data, MessageText } }) => ({
    ...state,
    trustCreditHistory: data,
    isTrustCreditHistoryError: !isSuccess,
    isTrustCreditHistoryLoading: false
  }),
  [TRUST_CREDIT_HISTORY_FETCH_ERROR]: (state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    trustCreditHistory: data,
    isTrustCreditHistoryError: true,
    isTrustCreditHistoryLoading: false
  }),
  [TRUST_CREDIT_HISTORY_FETCH_FAILURE]: (state, message) => ({
    ...state,
    trustCreditHistory: null,
    isTrustCreditHistoryError: false,
    isTrustCreditHistoryLoading: false
  }),
  // Trust reasons history credit
  [TRUST_CREDIT_REASONS_HISTORY_FETCH]: (state) => ({
    ...state,
    trustCreditReasonsHistory: null,
    isTrustCreditReasonsHistoryError: false,
    isTrustCreditReasonsHistoryLoading: true
  }),
  [combineActions(TRUST_CREDIT_REASONS_HISTORY_FETCH_SUCCESS, TRUST_CREDIT_REASONS_HISTORY_FETCH_ERROR)]: (
    state, { payload: { isSuccess, data, MessageText } }) => ({
    ...state,
    trustCreditReasonsHistory: data,
    isTrustCreditReasonsHistoryError: !isSuccess,
    isTrustCreditReasonsHistoryLoading: false
  }),
  [TRUST_CREDIT_REASONS_HISTORY_FETCH_FAILURE]: (state, message) => ({
    ...state,
    trustCreditReasonsHistory: null,
    isTrustCreditReasonsHistoryError: false,
    isTrustCreditReasonsHistoryLoading: false
  }),
  // Trust credit info
  [TRUST_CREDIT_INFO_FETCH]: (state) => ({
    ...state,
    trustCreditInfo: null,
    isTrustCreditInfoError: false,
    isTrustCreditInfoLoading: true
  }),
  [combineActions(TRUST_CREDIT_INFO_FETCH_SUCCESS, TRUST_CREDIT_INFO_FETCH_ERROR)]: (
    state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    trustCreditInfo: data,
    isTrustCreditInfoError: !isSuccess,
    trustCreditInfoMessage: messageText,
    isTrustCreditInfoLoading: false
  }),
  [TRUST_CREDIT_INFO_FETCH_FAILURE]: (state, message) => ({
    ...state,
    trustCreditInfo: null,
    isTrustCreditInfoError: false,
    trustCreditInfoMessage: 'Ошибка получения информации о кредитном лимите',
    isTrustCreditInfoLoading: false
  }),
  // Deactivate trust credit
  [DEACIVATE_TRUST_CREDIT_FETCH]: (state) => ({
    ...state,
    deactivateTrustCredit: null,
    deactivateTrustCreditMessage: null,
    isTrustCreditDeactivateError: false,
    isTrustCreditDeactivateLoading: true
  }),
  [combineActions(DEACIVATE_TRUST_CREDIT_FETCH_SUCCESS, DEACIVATE_TRUST_CREDIT_FETCH_ERROR)]: (
    state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    deactivateTrustCredit: data,
    deactivateTrustCreditMessage: messageText,
    isTrustCreditDeactivateError: !isSuccess,
    isTrustCreditDeactivateLoading: false
  }),
  [DEACIVATE_TRUST_CREDIT_FETCH_FAILURE]: (state, message) => ({
    ...state,
    deactivateTrustCredit: null,
    deactivateTrustCreditMessage: null,
    isTrustCreditDeactivateError: false,
    isTrustCreditDeactivateLoading: false
  }),
  // Activate trust credit
  [ACIVATE_TRUST_CREDIT_FETCH]: (state) => ({
    ...state,
    activateTrustCredit: null,
    activateTrustCreditMessage: null,
    isTrustCreditActivateError: false,
    isTrustCreditActivateLoading: true
  }),
  [combineActions(ACIVATE_TRUST_CREDIT_FETCH_SUCCESS, ACIVATE_TRUST_CREDIT_FETCH_ERROR)]: (
    state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    activateTrustCredit: data,
    activateTrustCreditMessage: messageText,
    isTrustCreditActivateError: !isSuccess,
    isTrustCreditActivateLoading: false
  }),
  [ACIVATE_TRUST_CREDIT_FETCH_FAILURE]: (state, message) => ({
    ...state,
    activateTrustCredit: null,
    activateTrustCreditMessage: null,
    isTrustCreditActivateError: false,
    isTrustCreditActivateLoading: false
  }),
  // Add content balance
  [ADD_CONTENT_BALANCE_FETCH]: produce((state) => {
    state.isAddingContentBalanceLoading = false
  }),
  [ADD_CONTENT_BALANCE_FETCH_SUCCESS]: produce((state, { payload }) => {
    const { data, messageText } = payload
    state.addContentBalance = data
    state.addContentBalanceMessage = messageText
    state.isAddingContentBalanceLoading = false
  }),
  [combineActions(ADD_CONTENT_BALANCE_FETCH_ERROR, ADD_CONTENT_BALANCE_FETCH_FAILURE)]: produce((state, payload) => {
    state.addContentBalance = null
    state.addContentBalanceMessage = payload?.messageText
    state.isAddingContentBalanceLoading = false
    state.isAddingContentBalanceError = true
  }),
  // Close content balance
  [CLOSE_CONTENT_BALANCE_FETCH]: produce((state) => {
    state.isClosingContentBalanceLoading = false
  }),
  [CLOSE_CONTENT_BALANCE_FETCH_SUCCESS]: produce((state, { payload }) => {
    const { data, messageText } = payload
    state.closeContentBalance = data
    state.closeContentBalanceMessage = messageText
    state.isClosingContentBalanceLoading = false
  }),
  [combineActions(CLOSE_CONTENT_BALANCE_FETCH_ERROR, CLOSE_CONTENT_BALANCE_FETCH_FAILURE)]: produce((state, payload) => {
    state.closeContentBalanceMessage = payload?.messageText
    state.isClosingContentBalanceLoading = false
    state.isClosingContentBalanceError = true
  }),
  // Content balance history
  [CONTENT_BALANCE_HISTORY_FETCH]: produce((state) => {
    state.isContentBalanceHistoryLoading = false
  }),
  [CONTENT_BALANCE_HISTORY_FETCH_SUCCESS]: produce((state, { payload }) => {
    const { data, messageText } = payload
    state.contentBalanceHistory = data
    state.contentBalanceHistoryMessage = messageText
    state.isContentBalanceHistoryLoading = false
  }),
  [combineActions(CONTENT_BALANCE_HISTORY_FETCH_ERROR, CONTENT_BALANCE_HISTORY_FETCH_FAILURE)]: produce((state, payload) => {
    state.contentBalanceHistoryMessage = payload?.messageText
    state.isContentBalanceHistoryLoading = false
    state.isContentBalanceHistoryError = true
  })
}, initalState)
