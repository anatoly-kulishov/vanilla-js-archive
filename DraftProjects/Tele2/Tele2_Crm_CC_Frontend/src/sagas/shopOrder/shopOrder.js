import { notification } from 'antd'
import { call, put } from 'redux-saga/effects'

import api from 'utils/api'
import {
  CREATE_SHOP_ORDER_ERROR,
  CREATE_SHOP_ORDER_FAILURE,
  CREATE_SHOP_ORDER_SUCCESS,
  GET_SHOP_ACTIONS_ERROR,
  GET_SHOP_ACTIONS_FAILURE,
  GET_SHOP_ACTIONS_SUCCESS,
  GET_SHOP_REGIONS_ERROR,
  GET_SHOP_REGIONS_FAILURE,
  GET_SHOP_REGIONS_SUCCESS
} from '../../reducers/shopOrderReducer'

const { getShopOrderRegions, createShopOrder, getShopOrderActions } = api

export function * getShopOrderRegionsSaga ({ payload }) {
  try {
    const { data, status } = yield call(getShopOrderRegions, payload)
    if (status === 200) {
      yield put({ type: GET_SHOP_REGIONS_SUCCESS, payload: data?.data })
    } else {
      yield put({ type: GET_SHOP_REGIONS_ERROR, message: data?.message })
    }
  } catch (exception) {
    yield put({ type: GET_SHOP_REGIONS_FAILURE, message: exception.message })
  }
}

export function * createShopOrderSaga ({ payload }) {
  try {
    const { data, status } = yield call(createShopOrder, payload)
    if (status === 200) {
      yield put({ type: CREATE_SHOP_ORDER_SUCCESS, payload: data })
    } else {
      yield put({ type: CREATE_SHOP_ORDER_ERROR, message: data?.message })
      notification.error({
        message: 'Создание заказа СУЗ',
        description: data.message
      })
    }
  } catch (exception) {
    yield put({ type: CREATE_SHOP_ORDER_FAILURE, message: exception.message })
  }
}

export function * getShopOrderActionsSaga ({ payload }) {
  try {
    let { data, status } = yield call(getShopOrderActions, payload)
    if (status === 200) {
      yield put({ type: GET_SHOP_ACTIONS_SUCCESS, payload: data?.data })
    } else {
      yield put({ type: GET_SHOP_ACTIONS_ERROR, message: data?.message })
      notification.error({
        message: 'Создание заказа СУЗ',
        description: data.message
      })
    }
  } catch (exception) {
    yield put({ type: GET_SHOP_ACTIONS_FAILURE, message: exception.message })
  }
}
