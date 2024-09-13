import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

export const ORDER_LIST_FETCH = 'giveOrder/ORDER_LIST_FETCH'
export const ORDER_LIST_FETCH_SUCCESS = 'giveOrder/ORDER_LIST_FETCH_SUCCESS'
export const ORDER_LIST_FETCH_ERROR = 'giveOrder/ORDER_LIST_FETCH_ERROR'

export const getOrderList = createAction(ORDER_LIST_FETCH)
export const getOrderListSuccess = createAction(ORDER_LIST_FETCH_SUCCESS)
export const getOrderListError = createAction(ORDER_LIST_FETCH_ERROR)

const initialState = {
  orderList: null,
  isOrderListShow: false,
  isOrderListLoading: false,
  isOrderListError: false
}

export default handleActions({
  [ORDER_LIST_FETCH]: produce((state) => ({
    ...state,
    isOrderListLoading: true
  })),

  [ORDER_LIST_FETCH_SUCCESS]: produce((_state, { payload }) => ({
    orderList: payload,
    isOrderListShow: true,
    isOrderListLoading: false,
    isOrderInfoError: false
  })),

  [ORDER_LIST_FETCH_ERROR]: produce(() => ({
    orderInfo: null,
    isOrderListShow: false,
    isOrderListLoading: false,
    isOrderInfoError: true
  }))
}, initialState)
