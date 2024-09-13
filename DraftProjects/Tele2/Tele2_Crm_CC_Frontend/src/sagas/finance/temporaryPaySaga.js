import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import { getPersonalAccountState, getHandlingState } from 'selectors'
import {
  GET_TEMPORARY_PAY_NEW_FETCH_SUCCESS,
  GET_TEMPORARY_PAY_NEW_FETCH_ERROR,
  GET_TEMPORARY_PAY_NEW_FETCH_FAILURE,

  ADD_PAYMENT_FETCH_SUCCESS,
  ADD_PAYMENT_FETCH_ERROR,
  ADD_PAYMENT_FETCH_FAILURE
} from 'reducers/finance/temporaryPayReducer'

export function * fetchTemporaryPayNewSaga () {
  const [ personalAccountState, handlingState ] = yield all([
    select(getPersonalAccountState),
    select(getHandlingState)
  ])

  const { BillingBranchId, SubscriberId, Msisdn, ClientCategory } = personalAccountState
  const { Id } = handlingState

  const payload = {
    systemName: 'MSDCRM',
    branchId: BillingBranchId,
    subscriberId: SubscriberId,
    msisdn: Msisdn,
    clientCategory: ClientCategory,
    handlingId: Id
  }

  try {
    const { fetchAvailabelPayment } = api
    const { data } = yield call(fetchAvailabelPayment, { ...payload })
    if (data.IsSuccess) {
      yield put({ type: GET_TEMPORARY_PAY_NEW_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_TEMPORARY_PAY_NEW_FETCH_ERROR, payload: data })
      notification.error({
        message: `Временный платеж `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: GET_TEMPORARY_PAY_NEW_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: `Временный платеж `,
      description: 'При получении данных о временном платеже произошла ошибка'
    })
  }
}

export function * fetchAddPaymentSaga ({ payload }) {
  const personalAccount = yield select(getPersonalAccountState)
  const handling = yield select(getHandlingState)
  const {
    SubscriberFullInfo: {
      SubscriberInfo: {
        SubscriberTypeId
      }
    },
    SubscriberStatus,
    ClientId,
    BillingBranchId,
    Msisdn,
    Email,
    SubscriberId
  } = personalAccount
  const requestPayload = {
    PaySum: payload.PaySum,
    SystemName: 'MSDCRM',
    Msisdn,
    HandlingId: handling.Id,
    ClientId: ClientId,
    Email: Email,
    SubscriberId: SubscriberId,
    SubscriberBranchId: BillingBranchId,
    SubscriberTypeId: +SubscriberTypeId,
    SubscriberStatusId: SubscriberStatus
  }

  try {
    const { fetchAddPayment } = api
    const { data } = yield call(fetchAddPayment, requestPayload)
    if (data.IsSuccess) {
      yield put({ type: ADD_PAYMENT_FETCH_SUCCESS, payload: data })
      notification.info({
        message: `Временный платеж `,
        description: data.MessageText
      })
    } else {
      yield put({ type: ADD_PAYMENT_FETCH_ERROR, payload: data })
      notification.error({
        message: `Временный платеж `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: ADD_PAYMENT_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: `Временный платеж `,
      description: exception.message
    })
  }
}
