import { notification } from 'antd'
import {
  APPROVE_ORDER_ERROR,
  APPROVE_ORDER_FAILURE,
  APPROVE_ORDER_SUCCESS,
  FETCH_MNP_ORDER_ERROR,
  FETCH_MNP_ORDER_FAILURE,
  FETCH_MNP_ORDER_SUCCESS,
  REJECT_ORDER_ERROR,
  REJECT_ORDER_FAILURE,
  REJECT_ORDER_SUCCESS
} from 'reducers/mnpOrder/mnpOrderReducer'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

export function * fetchMnpOrderSaga ({ payload }) {
  const { fetchMnpOrder } = api

  try {
    const result = yield call(fetchMnpOrder, payload)
    const { data, status } = result

    switch (status) {
      case 200:
        yield put({ type: FETCH_MNP_ORDER_SUCCESS, payload: data })
        break
      case 204:
        yield put({ type: FETCH_MNP_ORDER_ERROR, payload: 'Заявка не найдена' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Заявка не найдена'
        })
        break
      default:
        yield put({ type: FETCH_MNP_ORDER_ERROR, payload: 'Ошибка загрузки заявки' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Ошибка загрузки заявки'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: FETCH_MNP_ORDER_FAILURE, payload: message })
    notification.error({
      message: 'Форма ручной сверки MNP. Ошибка загрузки заявки',
      description: message
    })
  }
}

export function * approveOrderSaga ({ payload }) {
  const { approveOrder } = api

  try {
    const result = yield call(approveOrder, payload)
    const { status } = result

    switch (status) {
      case 200:
        yield put({ type: APPROVE_ORDER_SUCCESS })
        notification.success({
          message: 'Форма ручной сверки MNP',
          description: 'Заявка успешно подтвержена'
        })
        break
      default:
        yield put({ type: APPROVE_ORDER_ERROR, payload: 'Ошибка подтверждения заявки' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Ошибка подтверждения заявки'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: APPROVE_ORDER_FAILURE, payload: message })
    notification.error({
      message: 'Форма ручной сверки MNP. Ошибка подтверждения заявки',
      description: message
    })
  }
}

export function * rejectOrderSaga ({ payload }) {
  const { rejectOrder } = api

  try {
    const result = yield call(rejectOrder, payload)
    const { status } = result

    switch (status) {
      case 200:
        yield put({ type: REJECT_ORDER_SUCCESS })
        notification.success({
          message: 'Форма ручной сверки MNP',
          description: 'Заявка успешно отклонена'
        })
        break
      default:
        yield put({ type: REJECT_ORDER_ERROR, payload: 'Ошибка отклонения заявки' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Ошибка отклонения заявки'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: REJECT_ORDER_FAILURE, payload: message })
    notification.error({
      message: 'Форма ручной сверки MNP. Ошибка отклонения заявки',
      description: message
    })
  }
}
