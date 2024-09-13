import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import { getPersonalAccountState } from 'selectors'

import {
  VALIDATE_PAYD_SERVICE_FAILURE,
  VALIDATE_PAYD_SERVICE_ERROR,
  VALIDATE_PAYD_SERVICE_SUCCESS
} from 'reducers/compensation/compensationHisoryModalReducer'

export function * validatePaydServiceSaga () {
  try {
    const { validatePaydService } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText, Warnings, Data }
    } = yield call(
      validatePaydService,
      {
        msisdn: personalAccountState?.Msisdn
      }
    )
    if (IsSuccess) {
      yield put({
        type: VALIDATE_PAYD_SERVICE_SUCCESS,
        payload: {
          data: Data,
          error: {
            data: Warnings?.length ? Warnings : MessageText
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_PAYD_SERVICE_ERROR,
        payload: {
          error: {
            data: MessageText
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: VALIDATE_PAYD_SERVICE_FAILURE,
      payload: {
        error: {
          data: message
        }
      }
    })
    notification.error({
      message: `Валидация сервиса истории платежей`,
      description: message
    })
  }
}
