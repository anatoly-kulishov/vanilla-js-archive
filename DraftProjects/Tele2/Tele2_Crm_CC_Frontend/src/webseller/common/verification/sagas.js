import { all, takeEvery, call, put, select, take, cancel, fork } from 'redux-saga/effects'
import { notification } from 'antd'

import { getPersonalAccountState } from 'selectors/index'
import api from 'utils/api'
import {
  requestSmsCodeSuccess,
  requestSmsCodeError,
  requestSmsCodeFailure,
  verifySmsCodeSuccess,
  verifySmsCodeError,
  updateWaitingTimeRefreshCode,
  verifySmsCode,
  requestSmsCode,
  cancelUpdateWaitingTimeRefreshCode
} from 'webseller/common/verification/reducer'
import { countdown } from 'utils/helpers/sagaHelper'

function * requestSmsCodeSaga () {
  yield fork(function * () {
    const { fetchRequestSmsCode } = api

    let countdownChannel

    try {
      const { Msisdn: msisdn } = yield select(getPersonalAccountState)

      const { data, status } = yield call(fetchRequestSmsCode, msisdn)
      const { waitingTime } = data || {}

      switch (status) {
        case 200: {
          yield put(requestSmsCodeSuccess(waitingTime))

          countdownChannel = yield call(countdown, waitingTime)
          while (true) {
            const updatedWaitingTime = yield take(countdownChannel)
            yield put(updateWaitingTimeRefreshCode(updatedWaitingTime))
          }
        }
        case 400: {
          yield put(requestSmsCodeError(waitingTime))
          notification.error({ message: 'Исчерпан лимит запросов' })

          countdownChannel = yield call(countdown, waitingTime)
          while (true) {
            const updatedWaitingTime = yield take(countdownChannel)
            yield put(updateWaitingTimeRefreshCode(updatedWaitingTime))
          }
        }
        default: {
          throw new Error()
        }
      }
    } catch {
      yield put(requestSmsCodeFailure())
      notification.error({ message: 'Что-то пошло не так' })
    } finally {
      countdownChannel?.close()
    }
  })

  yield take(cancelUpdateWaitingTimeRefreshCode().type)
  yield cancel()
}

export function * verifySmsCodeSagaDecorator ({ code, handleSuccess }) {
  const { fetchVerifySmsCode } = api

  try {
    yield put(verifySmsCode())

    const { Msisdn: msisdn } = yield select(getPersonalAccountState)

    const { data } = yield call(fetchVerifySmsCode, { msisdn, code })

    const isValidCode = data === true
    if (isValidCode) {
      yield put(verifySmsCodeSuccess())
      yield put(cancelUpdateWaitingTimeRefreshCode())
      yield call(handleSuccess)
    } else {
      yield put(verifySmsCodeError())
      notification.error({ message: 'Неверный код' })
    }
  } catch {
    yield put(verifySmsCodeError())
    notification.error({ message: 'Ошибка при проверке кода' })
  }
}

export default function * () {
  yield all([takeEvery(requestSmsCode().type, requestSmsCodeSaga)])
}
