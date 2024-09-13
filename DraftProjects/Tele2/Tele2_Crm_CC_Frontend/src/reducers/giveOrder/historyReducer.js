import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

export const ORDERS_STATISTIC_FETCH = 'giveOrder/ORDERS_STATISTIC_FETCH'
export const ORDERS_STATISTIC_FETCH_SUCCESS = 'giveOrder/ORDERS_STATISTIC_FETCH_SUCCESS'
export const ORDERS_STATISTIC_FETCH_ERROR = 'giveOrder/ORDERS_STATISTIC_FETCH_ERROR'

export const ORDERS_HISTORY_FETCH = 'giveOrder/ORDERS_HISTORY_FETCH'
export const ORDERS_HISTORY_FETCH_SUCCESS = 'giveOrder/ORDERS_HISTORY_FETCH_SUCCESS'
export const ORDERS_HISTORY_FETCH_ERROR = 'giveOrder/ORDERS_HISTORY_FETCH_ERROR'

export const getOrdersStatistic = createAction(ORDERS_STATISTIC_FETCH)
export const getOrdersStatisticSuccess = createAction(ORDERS_STATISTIC_FETCH_SUCCESS)
export const getOrdersStatisticError = createAction(ORDERS_STATISTIC_FETCH_ERROR)

export const getOrdersHistory = createAction(ORDERS_HISTORY_FETCH)
export const getOrdersHistorySuccess = createAction(ORDERS_HISTORY_FETCH_SUCCESS)
export const getOrdersHistoryError = createAction(ORDERS_HISTORY_FETCH_ERROR)

const initialState = {
  statisticInfo: null,
  isStatisticInfoShow: false,
  isStatisticInfoLoading: false,
  isStatisticInfoError: false,
  historyInfo: null,
  isHistoryInfoShow: false,
  isHistoryInfoLoading: false,
  isHistoryInfoError: false
}

export default handleActions({
  [ORDERS_HISTORY_FETCH]: produce((state) => ({
    ...state,
    isHistoryInfoLoading: true
  })),

  [ORDERS_HISTORY_FETCH_SUCCESS]: produce((state, { payload }) => ({
    ...state,
    historyInfo: payload,
    isHistoryInfoShow: true,
    isHistoryInfoLoading: false,
    isHistoryInfoError: false
  })),

  [ORDERS_HISTORY_FETCH_ERROR]: produce((state) => ({
    ...state,
    historyInfo: null,
    isHistoryInfoShow: false,
    isHistoryInfoLoading: false,
    isHistoryInfoError: true
  })),

  [ORDERS_STATISTIC_FETCH]: produce((state) => ({
    ...state,
    isStatisticInfoLoading: true
  })),

  [ORDERS_STATISTIC_FETCH_SUCCESS]: produce((state, { payload }) => ({
    ...state,
    statisticInfo: payload,
    isStatisticInfoShow: true,
    isStatisticInfoLoading: false,
    isStatisticInfoError: false
  })),

  [ORDERS_STATISTIC_FETCH_ERROR]: produce((state) => ({
    ...state,
    statisticInfo: null,
    isStatisticInfoShow: false,
    isStatisticInfoLoading: false,
    isStatisticInfoError: true
  }))
}, initialState)
