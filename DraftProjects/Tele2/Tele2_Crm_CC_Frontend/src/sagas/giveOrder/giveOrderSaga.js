import { call, put } from 'redux-saga/effects'
import api from 'utils/api'
import {
  getOrderListSuccess,
  getOrderListError
} from 'reducers/giveOrder/orderListReducer'
import {
  getOrderInfoSuccess,
  getOrderInfoError
} from 'reducers/giveOrder/orderInfoReducer'
import {
  getOrdersHistorySuccess,
  getOrdersHistoryError,
  getOrdersStatisticSuccess,
  getOrdersStatisticError
} from 'reducers/giveOrder/historyReducer'
import qs from 'query-string'

export function * getOrderListSaga ({ payload }) {
  const { fetchOrderList } = api
  const queryStringParams = qs.stringify(payload, { arrayFormat: 'none' })

  try {
    const { data: orders } = yield call(fetchOrderList, queryStringParams)
    yield put(getOrderListSuccess(orders))
  } catch (exception) {
    yield put(getOrderListError())
  }
}

export function * getOrderSaga ({ payload: eshopOrderId }) {
  const { fetchOrder } = api

  try {
    const { data: order } = yield call(fetchOrder, eshopOrderId)
    yield put(getOrderInfoSuccess(order))
  } catch (exception) {
    yield put(getOrderInfoError())
  }
}

export function * getOrdersHistorySaga ({ payload: userId }) {
  const { fetchOrdersHistory } = api

  try {
    const { data: ordersHistory } = yield call(fetchOrdersHistory, userId)
    yield put(getOrdersHistorySuccess(ordersHistory))
  } catch (exception) {
    yield put(getOrdersHistoryError())
  }
}

export function * getOrdersStatisticSaga ({ payload: userId }) {
  const { fetchOrdersStatistic } = api

  try {
    const { data: ordersStatistic } = yield call(fetchOrdersStatistic, userId)
    yield put(getOrdersStatisticSuccess(ordersStatistic))
  } catch (exception) {
    yield put(getOrdersStatisticError())
  }
}
