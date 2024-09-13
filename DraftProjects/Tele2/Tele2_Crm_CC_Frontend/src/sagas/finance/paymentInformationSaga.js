import { call, put, select } from 'redux-saga/effects'
import api from 'utils/api'
import { getPersonalAccountState } from 'selectors'
import {
  GET_LAST_PAYMENT_SUCCESS,
  GET_LAST_PAYMENT_ERROR,
  GET_LAST_PAYMENT_FAILURE,

  DELETE_T2PAY_CARD_SUCCESS,
  DELETE_T2PAY_CARD_ERROR,
  DELETE_T2PAY_CARD_FAILURE
} from 'reducers/finance/paymentInformationReducer'
import { notification } from 'antd'

export function * getLastPaymentSaga () {
  const personalAccount = yield select(getPersonalAccountState)
  const { Msisdn } = personalAccount
  try {
    const { getLastPayment } = api
    const { data, status } = yield call(getLastPayment, { Msisdn })
    if (status === 200) {
      yield put({ type: GET_LAST_PAYMENT_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_LAST_PAYMENT_ERROR, payload: status })
    }
  } catch (exception) {
    yield put({ type: GET_LAST_PAYMENT_FAILURE, message: exception.message })
  }
}

export function * deleteT2PayCardSaga ({ payload }) {
  try {
    const { deleteT2PayCard } = api
    const { data, status } = yield call(deleteT2PayCard, payload)
    if (status === 200) {
      yield put({ type: DELETE_T2PAY_CARD_SUCCESS, payload: data })
      notification.success({
        message: `Отвязывание платежной карты выполнено`
      })
    } else if (status === 404) {
      yield put({ type: DELETE_T2PAY_CARD_ERROR, payload: data })
      notification.error({
        message: `Отвязывание платежной карты`,
        description: 'Данная карта уже отвязана или не найдена'
      })
    } else {
      yield put({ type: DELETE_T2PAY_CARD_ERROR, payload: data })
      notification.error({
        message: `Отвязывание платежной карты`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: DELETE_T2PAY_CARD_FAILURE, message: exception.message })
    notification.error({
      message: `Отвязывание платежной карты`,
      description: exception.message
    })
  }
}
