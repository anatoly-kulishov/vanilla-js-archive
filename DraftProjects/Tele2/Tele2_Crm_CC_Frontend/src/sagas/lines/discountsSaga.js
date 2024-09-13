import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  DISCOUNTS_LIST_FETCH_SUCCESS,
  DISCOUNTS_LIST_FETCH_ERROR,
  DISCOUNTS_LIST_FETCH_FAILURE
} from 'reducers/lines/discountsReducer'

export function * fetchDiscountListSaga ({ payload }) {
  const { fetchDiscountList } = api

  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchDiscountList, payload)

    if (IsSuccess) {
      const { DiscountList: discountList } = Data
      yield put({ type: DISCOUNTS_LIST_FETCH_SUCCESS, payload: discountList })
    } else {
      yield put({ type: DISCOUNTS_LIST_FETCH_ERROR, payload: MessageText })
    }
  } catch ({ message: MessageText }) {
    yield put({ type: DISCOUNTS_LIST_FETCH_FAILURE, payload: MessageText })
  }
}
