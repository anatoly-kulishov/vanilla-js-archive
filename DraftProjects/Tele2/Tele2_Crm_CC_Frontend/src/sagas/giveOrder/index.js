import { all, takeEvery } from 'redux-saga/effects'
import {
  ORDERS_STATISTIC_FETCH,
  ORDERS_HISTORY_FETCH
} from 'reducers/giveOrder/historyReducer'
import { ORDER_INFO_FETCH } from 'reducers/giveOrder/orderInfoReducer'
import { ORDER_LIST_FETCH } from 'reducers/giveOrder/orderListReducer'
import {
  getOrderListSaga,
  getOrderSaga,
  getOrdersHistorySaga,
  getOrdersStatisticSaga
} from './giveOrderSaga'

export default function * () {
  yield all([
    takeEvery(ORDER_LIST_FETCH, getOrderListSaga),
    takeEvery(ORDER_INFO_FETCH, getOrderSaga),
    takeEvery(ORDERS_HISTORY_FETCH, getOrdersHistorySaga),
    takeEvery(ORDERS_STATISTIC_FETCH, getOrdersStatisticSaga)
  ])
}
