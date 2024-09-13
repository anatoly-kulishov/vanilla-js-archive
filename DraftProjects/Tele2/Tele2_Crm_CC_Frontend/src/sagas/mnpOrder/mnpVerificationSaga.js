import { notification } from 'antd'
import {
  FETCH_MNP_VERIFICATION_ERROR,
  FETCH_MNP_VERIFICATION_FAILURE,
  FETCH_MNP_VERIFICATION_SUCCESS
} from 'reducers/mnpOrder/mnpVerificationReducer'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

export function * fetchMnpVerificationSaga ({ payload }) {
  const { fetchMnpVerification } = api

  try {
    const result = yield call(fetchMnpVerification, payload)
    const { data, status } = result

    switch (status) {
      case 200:
        yield put({ type: FETCH_MNP_VERIFICATION_SUCCESS, payload: data })
        break
      case 204:
        yield put({ type: FETCH_MNP_VERIFICATION_ERROR, payload: 'Данные сверки не найдены' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Данные сверки не найдены'
        })
        break
      default:
        yield put({ type: FETCH_MNP_VERIFICATION_ERROR, payload: 'Ошибка загрузки данных сверки' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Ошибка загрузки данных сверки'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: FETCH_MNP_VERIFICATION_FAILURE, payload: message })
    notification.warning({
      message: 'Форма ручной сверки MNP. Ошибка загрузки данных сверки',
      description: message
    })
  }
}
