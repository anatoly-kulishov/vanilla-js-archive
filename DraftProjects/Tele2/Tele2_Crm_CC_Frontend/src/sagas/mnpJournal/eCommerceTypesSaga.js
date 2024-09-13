import { notification } from 'antd'
import {
  FETCH_ECOMMERCE_TYPES_ERROR,
  FETCH_ECOMMERCE_TYPES_FAILURE,
  FETCH_ECOMMERCE_TYPES_SUCCESS
} from 'reducers/mnpJournal/eCommerceTypesReducer'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

export function * fetchECommerceTypesSaga ({ payload }) {
  const { fetchECommerceTypes } = api

  try {
    const result = yield call(fetchECommerceTypes, payload)
    const { data, status } = result
    switch (status) {
      case 200:
        yield put({ type: FETCH_ECOMMERCE_TYPES_SUCCESS, payload: data.EcommerceTypeCodes })
        break
      case 204:
        yield put({ type: FETCH_ECOMMERCE_TYPES_ERROR, payload: 'Типы электронной коммерции не найдены' })
        notification.warning({
          message: 'Журнал заявок MNP',
          description: 'Типы электронной коммерции не найдены'
        })
        break
      default:
        yield put({
          type: FETCH_ECOMMERCE_TYPES_ERROR,
          payload: 'Ошибка загрузки типов электронной коммерции'
        })
        notification.warning({
          message: 'Журнал заявок MNP',
          description: 'Ошибка загрузки типов электронной коммерции'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: FETCH_ECOMMERCE_TYPES_FAILURE, payload: message })
    notification.error({
      message: 'Журнал заявок MNP. Ошибка загрузки типов электронной коммерции',
      description: message
    })
  }
}
