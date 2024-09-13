import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

export const ORDER_INFO_FETCH = 'giveOrder/ORDER_INFO_FETCH'
export const ORDER_INFO_FETCH_SUCCESS = 'giveOrder/ORDER_INFO_FETCH_SUCCESS'
export const ORDER_INFO_FETCH_ERROR = 'giveOrder/ORDER_INFO_FETCH_ERROR'

export const getOrderInfo = createAction(ORDER_INFO_FETCH)
export const getOrderInfoSuccess = createAction(ORDER_INFO_FETCH_SUCCESS)
export const getOrderInfoError = createAction(ORDER_INFO_FETCH_ERROR)

const initialState = {
  orderInfo: null,
  isOrderInfoShow: false,
  isOrderInfoLoading: false,
  isOrderInfoError: false
}

export default handleActions({
  [ORDER_INFO_FETCH]: produce((state) => ({
    ...state,
    isOrderInfoLoading: true
  })),

  [ORDER_INFO_FETCH_SUCCESS]: produce((_state, { payload }) => ({
    orderInfo: payload,
    isOrderInfoShow: true,
    isOrderInfoLoading: false,
    isOrderInfoError: false
  })),

  [ORDER_INFO_FETCH_ERROR]: produce(() => ({
    orderInfo: null,
    isOrderInfoShow: false,
    isOrderInfoLoading: false,
    isOrderInfoError: true
  }))
}, initialState)
