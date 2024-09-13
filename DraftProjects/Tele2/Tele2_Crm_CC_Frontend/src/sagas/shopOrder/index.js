import { all, takeEvery } from 'redux-saga/effects'
import { CREATE_SHOP_ORDER, GET_SHOP_ACTIONS, GET_SHOP_REGIONS } from 'reducers/shopOrderReducer'
import { createShopOrderSaga, getShopOrderActionsSaga, getShopOrderRegionsSaga } from './shopOrder'

export default function * () {
  yield all([
    takeEvery(GET_SHOP_REGIONS, getShopOrderRegionsSaga),
    takeEvery(CREATE_SHOP_ORDER, createShopOrderSaga),
    takeEvery(GET_SHOP_ACTIONS, getShopOrderActionsSaga)
  ])
}
