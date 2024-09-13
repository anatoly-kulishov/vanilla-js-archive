import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_SUBSCRIBER_TARIFF_HISTORY = 'tariffHistory/FETCH_SUBSCRIBER_TARIFF_HISTORY'
export const FETCH_SUBSCRIBER_TARIFF_HISTORY_SUCCESS = 'tariffHistory/FETCH_SUBSCRIBER_TARIFF_HISTORY_SUCCESS'
export const FETCH_SUBSCRIBER_TARIFF_HISTORY_ERROR = 'tariffHistory/FETCH_SUBSCRIBER_TARIFF_HISTORY_ERROR'
export const FETCH_SUBSCRIBER_TARIFF_HISTORY_FAILURE = 'tariffHistory/FETCH_SUBSCRIBER_TARIFF_HISTORY_FAILURE'

const initialState = {
  tariffHistory: [],
  isTariffHistoryLoading: false
}

export const fetchSubscriberTariffHistory = createAction(FETCH_SUBSCRIBER_TARIFF_HISTORY)

export default handleActions({
  [FETCH_SUBSCRIBER_TARIFF_HISTORY]: produce((state, action) => {
    state.isTariffHistoryLoading = true
  }),
  [FETCH_SUBSCRIBER_TARIFF_HISTORY_SUCCESS]: produce((state, { payload }) => {
    state.tariffHistory = payload
    state.isTariffHistoryLoading = false
  }),
  [combineActions(FETCH_SUBSCRIBER_TARIFF_HISTORY_ERROR, FETCH_SUBSCRIBER_TARIFF_HISTORY_FAILURE)]:
    produce((state) => {
      state.isTariffHistoryLoading = false
    })
}, initialState)
